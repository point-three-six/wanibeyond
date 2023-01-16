chrome.runtime.onInstalled.addListener(async () => {
    const scripts = [{
        id: 'waniplus',
        js: ['src/utils/context.js', 'src/utils/interceptor.js', 'src/utils/notify.js', 'src/utils/updateLevel.js'],
        matches: ['https://www.wanikani.com/*'],
        runAt: 'document_start',
        world: 'MAIN',
    },
    {
        id: 'waniplus-home',
        js: ['src/pages/pg-wk-home.js'],
        matches: ['https://www.wanikani.com/'],
        runAt: 'document_start',
        world: 'MAIN',
    },
    {
        id: 'waniplus-lessons',
        js: ['src/utils/kanaVocab.js', 'src/pages/pg-wk-lessons.js'],
        matches: ['https://www.wanikani.com/lesson/session'],
        runAt: 'document_start',
        world: 'MAIN',
    },
    {
        id: 'waniplus-reviews',
        js: ['src/utils/kanaVocab.js', 'src/pages/pg-wk-reviews.js'],
        matches: ['https://www.wanikani.com/review/session'],
        runAt: 'document_start',
        world: 'MAIN',
    }];

    const ids = scripts.map(s => s.id);
    await chrome.scripting.unregisterContentScripts({ ids }).catch(() => { });
    await chrome.scripting.registerContentScripts(scripts).catch(() => { });
    //chrome.scripting.getRegisteredContentScripts((r) => console.log(r));

    sync();
});


const endpoint = 'https://waniplus.com'

// use data returned from /api/me
let isGuest = true;
let session = {};
let userData = {};
let level = 0;
let loadOrder = 'random';

let headers = new Headers();
headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');

async function sync() {
    let installedDecks = await getInstalledDecks();

    let me = await fetchUserData(installedDecks);

    if (!me) {
        console.log('Failed to sync, no connection to WaniPlus endpoint.');
        return false;
    }

    session = me.user;

    if (Object.keys(session).length > 0) {
        isGuest = false;
        userData = {
            data: me.data
        };
        setUserData(userData);
    } else {
        isGuest = true;

        let guestData = await getGuestData();

        if (Object.keys(guestData).length == 0) {
            await chrome.storage.local.set({
                'wp_guest': {
                    data: {
                        decks: [],
                        srs: {}
                    }
                }
            })
        }

        guestData.data.decks = insertGuestSRSData(me.data.decks, guestData.data.srs);

        userData = guestData;
        setGuestData(userData);
    }

    return true;
}

function insertGuestSRSData(decks, srs) {
    decks.map(deck => {
        deck.items.map(item => {
            if (item.id in srs) {
                item.assignment = [{
                    stage: srs[item.id].stage,
                    lastAdvance: srs[item.id].lastAdvance
                }];
            }

            return item;
        });
    });

    return decks;
}

async function getSession() {
    try {
        const res = await fetch(endpoint + '/api/session', { method: 'GET', headers: headers });
        const data = await res.json();
        return data;
    } catch (e) {
        return false;
    }
}

async function getGuestData() {
    return (await chrome.storage.local.get(['wp_guest'])).wp_guest || {};
}

async function setGuestData(data) {
    data.updatedAt = new Date().getTime();
    await chrome.storage.local.set({ 'wp_guest': data });
}

async function getUserData() {
    return (await chrome.storage.local.get(['wp_data'])).wp_data;
}

async function setUserData(data) {
    data.updatedAt = new Date().getTime();
    await chrome.storage.local.set({ 'wp_data': data });
}

async function getLoadOrder() {
    return (await chrome.storage.local.get(['wp_order'])).wp_order || 'random';
}

async function setLoadOrder(val) {
    let order = val || 'random';
    loadOrder = val;
    await chrome.storage.local.set({ 'wp_order': order });
}

async function getInstalledDecks() {
    return (await chrome.storage.local.get(['wp_installed'])).wp_installed || [];
}

async function installDeck(deckId) {
    let decks = await getInstalledDecks();
    if (decks.indexOf(deckId) === -1) {
        decks.push(deckId);
        await chrome.storage.local.set({ 'wp_installed': decks });
        await sync();
        return true;
    }
    return false;
}

async function uninstallDeck(deckId) {
    let decks = await getInstalledDecks();
    if (decks.indexOf(deckId) !== -1) {
        await chrome.storage.local.set({ 'wp_installed': decks.filter(id => id != deckId) });
        await sync();
        return true;
    }
    return false;
}

async function isDeckInstalled(id) {
    let decks = await getInstalledDecks();
    return decks.indexOf(id) != -1;
}

async function setLevel(level) {
    await chrome.storage.local.set({ 'wp_level': level });
}


async function fetchUserData(deckIDs) {
    try {
        const res = await fetch(endpoint + '/api/me', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                decks: (deckIDs) ? deckIDs : []
            })
        });
        const data = await res.json();
        return data;
    } catch (e) {
        return false;
    }
}

async function getLessonData() {
    let decks = userData.data.decks;

    // congregate items from all enabled decks
    let items = [];

    for (let i in decks) {
        let deck = decks[i];
        for (let i in deck.items) {
            let item = deck.items[i];

            // here we need to verify if the item is in the lesson stage.
            // an item is in the lesson stage if it has no generated assignment.
            if (item.assignment.length == 0 && level >= item.level) {
                //deck.items[i].data.__wp__ = true;
                items.unshift(deck.items[i].data)
            }
        }
    }

    return items;
}

async function getReviewData() {
    let decks = userData.data.decks;

    // congregate items from all enabled decks
    let items = [];

    for (let i in decks) {
        let deck = decks[i];
        for (let i in deck.items) {
            let item = deck.items[i];

            // here we need to verify if the item is in the lesson stage.
            // an item is in the lesson stage if it has no generated assignment.
            if (item.assignment.length > 0 && level >= item.level) {
                // inject assignment stage to item data
                item.data.srs = item.assignment[0].stage;

                if (calcIfSrsReady(item.assignment)) {
                    //deck.items[i].data.__wp__ = true;
                    items.unshift(item.data)
                }
            }
        }
    }

    return items;
}

async function itemSRSCompleted(completions) {
    //note: itemIDs are strings in the format wk-###
    if (!isGuest) {
        try {
            const res = await fetch(endpoint + '/api/items/completed', {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(completions),
            });
            if (res.status != 200) return false;
        } catch (e) {
            // failed to fetch. we need to preserve SRS.
            return false;
        }
    }

    // update SRS stage values locally
    let decks = userData.data.decks;

    for (let completion of completions) {
        let id = completion[0];
        let failed = completion[1];
        let numId = parseInt(id.substring(3, id.length));

        for (let x in decks) {
            let deck = decks[x];

            for (let i in deck.items) {
                let item = deck.items[i];

                if (item.id == numId) {
                    if (item.assignment.length == 0) {
                        deck.items[i].assignment[0] = {
                            stage: 0,
                            lastAdvance: new Date().toISOString()
                        };
                    } else {
                        let curStage = deck.items[i].assignment[0].stage;

                        // do we need to increment or decrement?
                        if (failed && curStage > 0) {
                            userData.data.decks[x].items[i].assignment[0].stage--;
                        } else if (!failed && curStage < 8) {
                            userData.data.decks[x].items[i].assignment[0].stage++;
                        }
                    }

                    if (isGuest) {
                        userData.data.srs[item.id] = userData.data.decks[x].items[i].assignment[0];
                    }
                }
            }
        }
    }

    // update local userData
    if (isGuest) {
        setGuestData(userData);
    } else {
        setUserData(userData);
    }

    return true;
}

function calcIfSrsReady(assignment) {
    let stage = assignment[0].stage;

    let now = Date.now();
    let last = new Date(assignment[0].lastAdvance).getTime();
    let elapsed = now - last;

    // in minutes
    const times = {
        0: 4 * 60,
        1: 8 * 60,
        2: 24 * 60,
        3: 2 * 24 * 60,
        4: 7 * 24 * 60,
        5: 30 * 24 * 60,
        6: 30 * 4 * 24 * 60,
        7: 30 * 4 * 24 * 60,
        8: 30 * 4 * 24 * 60
    };

    return (elapsed > times[stage] * 60000);
}

chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
    if (['http://localhost:3000', 'https://www.wanikani.com', 'https://wanikani.com', 'https://www.waniplus.com', 'https://waniplus.com'].indexOf(sender.origin) != -1) {
        const action = msg.action;

        switch (action) {
            case 'hasDeck':
                isDeckInstalled(msg.data).then((isInstalled) => {
                    sendResponse(isInstalled);
                });
                break;
            case 'install':
                installDeck(msg.data).then((wasInstalled) => {
                    sendResponse(wasInstalled);
                });
                break;
            case 'uninstall':
                uninstallDeck(msg.data).then((wasUninstalled) => {
                    sendResponse(wasUninstalled);
                });
                break;
            case 'getLessonData':
                getLessonData().then((data) => {
                    sendResponse({
                        items: data,
                        order: loadOrder
                    });
                });
                break;
            case 'getReviewData':
                getReviewData().then((data) => {
                    sendResponse({
                        items: data,
                        order: loadOrder
                    });
                });
                break;
            case 'itemSRSCompleted':
                itemSRSCompleted(msg.items).then((data) => {
                    sendResponse(data);
                });
                break;
            case 'setLevel':
                setLevel(msg.level);
                sendResponse(true);
                break;
            case 'getState':
                sendResponse({
                    session: session,
                    decks: userData.data.decks,
                    loadOrder: loadOrder
                })
                break;
            default:
        }
    } else {
        sendResponse({ error: 'Access denied.' })
    }
});

chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        const action = msg.action;

        switch (action) {
            case 'getState':
                sendResponse({
                    session: session,
                    decks: userData.data.decks,
                    loadOrder: loadOrder
                })
                break;
            case 'setLoadOrder':
                setLoadOrder(msg.order);
                break;
            default:
        }
    }
);

// quick load state until there is a sync
chrome.storage.local.get(['wp_data', 'wp_guest', 'wp_level', 'wp_order'], ({ wp_data, wp_guest, wp_level, wp_order }) => {
    isGuest = false;
    level = wp_level;
    loadOrder = wp_order || 'random';

    if (wp_data && wp_guest) {
        if (wp_data.updatedAt > wp_guest.updatedAt) {
            userData = wp_data;
        } else {
            userData = wp_guest;
            isGuest = true;
        }
    } else {
        userData = wp_data;
    }
});

chrome.alarms.create({ delayInMinutes: 5, periodInMinutes: 5 });
chrome.alarms.onAlarm.addListener(() => {
    sync();
});

sync();