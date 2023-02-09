//const endpoint = 'https://waniplus.com';
const endpoint = 'http://localhost:3000';
const _urls = [
    'http://localhost:3000', 'https://www.wanikani.com',
    'https://wanikani.com', 'https://www.waniplus.com',
    'https://waniplus.com'
];

let myLevel = 0;
let loadOrder = 'front';
let isGuest = true;
let userData = {
    data: {
        decks: [],
        srs: {}
    },
    user: {},
    lastGuestSession: null,
    lastUserSession: null,
    wkofSyncRequiredAsOf: new Date().getTime() // as of this date wkof needs to be re-synced
};

let headers = new Headers();
headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');

// quick load last state
const quickLoadCache = chrome.storage.local.get(['wp_data', 'wp_level', 'wp_order']).then(({ wp_data, wp_level, wp_order }) => {
    if (!wp_data) return;
    myLevel = wp_level || 0;
    loadOrder = wp_order || 'front';
    userData = wp_data;
    isGuest = wp_data.lastGuestSession >= wp_data.lastUserSession;
});

async function sync() {
    await quickLoadCache;

    let installedDecks = await getInstalledDecks();
    let alreadyDownloaded = userData.data.decks.map(deck => deck.id);
    let initialDownloads = installedDecks.filter(id => alreadyDownloaded.indexOf(id) == -1);
    let uninstalledDecks = alreadyDownloaded.filter(id => installedDecks.indexOf(id) == -1);
    let updatedAfter = new Date(userData.lastSync || 0).toISOString();

    let me = await fetchUserData(installedDecks, initialDownloads, updatedAfter);

    if (!me) {
        console.log('Failed to sync.');
        return false;
    }

    isGuest = !('username' in me.user);

    // delete uninstalled decks
    for (let i = userData.data.decks.length - 1; i >= 0; i--) {
        let deck = userData.data.decks[i];

        if (uninstalledDecks.indexOf(deck.id) !== -1) {
            userData.data.decks.splice(i, 1);
        }
    }

    // flag to determine if wkof should be resynced
    let newItemsAddedOrUpdated = false;

    // add new items
    for (let deck of me.data.decks) {
        if (initialDownloads.indexOf(deck.id) !== -1) {
            newItemsAddedOrUpdated = true;
            userData.data.decks.push(deck);
            continue;
        }

        // items to add or update
        let items = deck.items;
        let itemsIDs = deck.items.map(item => item.id);

        if (items.length > 0) newItemsAddedOrUpdated = true;

        // now loop through each cached deck and either
        // insert or update
        for (let cachedDeck of userData.data.decks) {
            if (cachedDeck.id == deck.id) {
                cachedDeck.items = cachedDeck.items.map(item => {
                    let idx = itemsIDs.indexOf(item.id);
                    if (idx !== -1) {
                        // this item needs to be updated.
                        for (let newItem of items) {
                            if (item.id == newItem.id) {
                                itemsIDs.splice(idx, 1);
                                return newItem;
                            }
                        }
                    }

                    return item;
                });

                // the remaining items in itemsIDs are NEW items
                let newItems = items.filter(item => itemsIDs.indexOf(item.id) !== -1);
                if (newItems.length > 0) {
                    cachedDeck.items = cachedDeck.items.concat(newItems);
                }
            }
        }
    }

    // sort by level then id
    for (let deck of userData.data.decks) {
        deck.items.sort((a, b) => a.level - b.level || a.id - b.id);
    }

    //remove cached deleted items
    for (let deleted of me.data.deleted) {
        let id = deleted.id;

        for (let deck of userData.data.decks) {
            deck.items = deck.items.filter(item => id != item.id);
        }
    }

    let dt = new Date().getTime();
    if (isGuest) {
        userData.lastGuestSession = dt;
        insertGuestSRSData(userData.data.decks, userData.data.srs);
    } else {
        userData.lastUserSession = dt;
    }

    userData.user = me.user;
    userData.lastSync = dt;

    if (newItemsAddedOrUpdated) userData.wkofSyncRequiredAsOf = new Date().getTime();

    setUserData(userData);

    return true;
}

async function fetchUserData(deckIDs, initialDownloads, updatedAfter) {
    try {
        const res = await fetch(endpoint + '/api/me', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                decks: (deckIDs) ? deckIDs : [],
                initialDownloads: initialDownloads,
                updatedAfter: updatedAfter || false
            })
        });
        const data = await res.json();
        return data;
    } catch (e) {
        return false;
    }
}

function insertGuestSRSData(decks, srs) {
    decks.map(deck => {
        deck.items.map(item => {
            if (!('assignmentGuest' in item)) item.assignmentsGuest = [];

            if (item.id in srs) {
                item.assignmentsGuest = srs[item.id];
            }

            return item;
        });
    });
}

async function getState() {
    await quickLoadCache;
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

async function setUserData(data) {
    data.updatedAt = new Date().getTime();
    await chrome.storage.local.set({ 'wp_data': data });
}

async function getLoadOrder() {
    return (await chrome.storage.local.get(['wp_order'])).wp_order || 'front';
}

async function setLoadOrder(val) {
    let order = val || 'front';
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

async function setLevel(newLevel) {
    myLevel = newLevel;
    await chrome.storage.local.set({ 'wp_level': newLevel });
}

async function getLessonData() {
    await quickLoadCache;

    let decks = userData.data.decks;

    // congregate items from all enabled decks
    let items = [];

    for (let i in decks) {
        let deck = decks[i];
        let curLevel = (!'levelSystem' in deck || deck.levelSystem == 'wanikani') ? myLevel : calculateDeckLevel(deck);

        deck.level = curLevel;

        for (let i in deck.items) {
            let item = deck.items[i];
            let assignments = (isGuest) ? item.assignmentsGuest : item.assignments;

            // here we need to verify if the item is in the lesson stage.
            // an item is in the lesson stage if it has no generated assignment.
            if (assignments.length == 0 && curLevel >= item.level) {
                //deck.items[i].data.__wp__ = true;
                items.unshift(deck.items[i].data)
            }
        }
    }

    return items;
}

async function getReviewData() {
    await quickLoadCache;

    let decks = userData.data.decks;

    // congregate items from all enabled decks
    let items = [];

    for (let i in decks) {
        let deck = decks[i];
        let curLevel = (!'levelSystem' in deck || deck.levelSystem == 'wanikani') ? myLevel : calculateDeckLevel(deck);

        deck.level = curLevel;

        for (let i in deck.items) {
            let item = deck.items[i];
            let assignments = (isGuest) ? item.assignmentsGuest : item.assignments;

            // here we need to verify if the item is in the lesson stage.
            // an item is in the lesson stage if it has no generated assignment.
            if (assignments.length > 0 && curLevel >= item.level) {
                // inject assignment stage to item data
                item.data.srs = assignments[assignments.length - 1].stage;

                if (calcSrs(assignments[assignments.length - 1]).ready) {
                    //deck.items[i].data.__wp__ = true;
                    items.unshift(item.data)
                }
            }
        }
    }

    return items;
}

async function itemSRSCompleted(completions) {
    await quickLoadCache;

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
            console.log('Failed to submit SRS:', e);
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
                    let assignments = (isGuest) ? item.assignmentsGuest : item.assignments;

                    if (assignments.length == 0) {
                        assignments.push({
                            stage: 1,
                            completedAt: new Date().toISOString()
                        });
                    } else {
                        let curStage = assignments[assignments.length - 1].stage;
                        let newStage = curStage;

                        if (failed && curStage > 1) {
                            newStage--;
                        } else if (!failed && curStage < 8) {
                            newStage++;
                        }

                        assignments.push({
                            stage: newStage,
                            completedAt: new Date().toISOString()
                        });
                    }

                    if (isGuest) {
                        // push the assignment we just created to local guest srs data
                        if (!(item.id in userData.data.srs)) userData.data.srs[item.id] = [];
                        userData.data.srs[item.id].push(assignments[assignments.length - 1]);
                    }
                }
            }
        }
    }

    setUserData(userData);

    return true;
}

function calcSrs(assignment) {
    // in minutes
    const times = {
        1: 4 * 60,
        2: 8 * 60,
        3: 24 * 60,
        4: 2 * 24 * 60,
        5: 7 * 24 * 60,
        6: 30 * 24 * 60,
        7: 30 * 4 * 24 * 60,
        8: 30 * 4 * 24 * 60
    };

    let stage = assignment.stage;
    let now = new Date().getTime();
    let last = new Date(assignment.completedAt).getTime();
    let elapsed = now - last;
    let availableAt = new Date(last + times[stage] * 60000).toISOString();

    return {
        //ready: (elapsed > times[stage] * 60000),
        ready: true,
        availableAt: availableAt
    };
}

function calculateDeckLevel(deck) {
    let curLevel = 0;
    let levels = deck.items.map(item => item.level)
        .filter((e, i, arr) => arr.indexOf(e) === i)
        .sort((a, b) => a - b);

    for (let level of levels) {
        curLevel = level;

        // check all items in this level.
        let items = deck.items.filter(item => item.level == level);

        for (let item of items) {
            let assignments = (isGuest) ? item.assignmentsGuest : item.assignments;
            if (assignments.length == 0 || assignments[assignments.length - 1].stage < 5) {
                return curLevel;
            }
        }
    }

    return curLevel;
}

// when sending to other parts of the ext, like pg-wk-home
// or the popup, we don't need to include ALL the item data. That's a lot
function prepareDeckData(decks, keepItemData) {
    let newDecks = JSON.parse(JSON.stringify(decks));
    for (let deck of newDecks) {
        let curLevel = (!'levelSystem' in deck || deck.levelSystem == 'wanikani') ? myLevel : calculateDeckLevel(deck);

        deck.level = curLevel;

        for (let item of deck.items) {
            let assignments = (isGuest) ? item.assignmentsGuest : item.assignments;
            let srs = assignments.length == 0 ? null : calcSrs(assignments[assignments.length - 1]);

            // to simplify outside of background.js, just rewrite to current assignments value
            item.assignments = assignments;
            item.unlocked = curLevel >= item.level;
            item.kanavocab = item.data.kanavocab;
            item.category = item.data.category.toLowerCase();
            item.isInLessonQueue = srs ? false : true;
            item.isReady = item.isInLessonQueue ? true : srs.ready;
            item.wpSrs = srs ? assignments[assignments.length - 1].stage : 0;
            item.availableAt = srs.availableAt;
            if (!keepItemData) delete item.data;
        }
    }

    return newDecks;
}

chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
    if (_urls.indexOf(sender.origin) != -1) {
        const action = msg.action;

        switch (action) {
            case 'sync':
                sync();
                sendResponse({});
                break;
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
                sendResponse({});
                break;
            case 'getState':
                getState().then(() => {
                    sendResponse({
                        session: userData.user,
                        decks: prepareDeckData(userData.data.decks),
                        loadOrder: loadOrder,
                        level: myLevel
                    });
                });
                break;
            case 'getDataForWkof':
                getState().then(() => {
                    sendResponse({
                        decks: prepareDeckData(userData.data.decks, true),
                        syncRequiredAsOf: userData.wkofSyncRequiredAsOf
                    });
                });
                break;
            default:
                sendResponse({ msg: 'No action for event.' })
        }
    } else {
        sendResponse({ error: 'Access denied.' })
    }

    return true;
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const action = msg.action;

    switch (action) {
        case 'getState':
            sync();
            getState().then(() => {
                sendResponse({
                    session: userData.user,
                    decks: prepareDeckData(userData.data.decks),
                    loadOrder: loadOrder,
                    level: myLevel
                });
            });
            break;
        case 'setLoadOrder':
            setLoadOrder(msg.order);
            sendResponse({});
            break;
        default:
            sendResponse({ msg: 'No action for event.' })
    }

    return true;
});

chrome.runtime.onInstalled.addListener(async () => {
    const scripts = [{
        id: 'waniplus',
        js: ['src/utils/context.js', 'src/utils/interceptor.js', 'src/utils/notify.js', 'src/utils/updateLevel.js', 'src/utils/idb.js', 'src/utils/wkofSync.js'],
        //js: ['src/utils/context.js', 'src/utils/interceptor.js', 'src/utils/notify.js', 'src/utils/updateLevel.js'],
        matches: ['https://www.wanikani.com/*'],
        runAt: 'document_start',
        world: 'MAIN',
    },
    {
        id: 'waniplus-home',
        js: ['src/pages/pg-wk-home.js', 'src/utils/fittext.js'],
        matches: ['https://www.wanikani.com/', 'https://www.wanikani.com/dashboard'],
        runAt: 'document_start',
        world: 'MAIN',
    },
    {
        id: 'waniplus-summary',
        js: ['src/pages/pg-wk-summary.js'],
        matches: ['https://www.wanikani.com/review', 'https://www.wanikani.com/lesson'],
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

    // initial sync on install
    sync();
});