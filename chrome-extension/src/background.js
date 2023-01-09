const endpoint = 'http://localhost:3000'

// use data returned from /api/me
let isGuest = true;
let session = {};
let userData = {};

let headers = new Headers();
headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');

async function sync() {

    // first check to see if our user is logged in.
    session = await getSession();

    if (Object.keys(session) > 0) {
        isGuest = false;

        userData = await fetchUserData();
        setUserData(userData);
    } else {
        isGuest = true;

        let guestData = (await chrome.storage.local.get(['wp_guest'])).wp_guest;

        if (Object.keys(guestData).length == 0) {
            await chrome.storage.local.set({
                'wp_guest': {
                    data: {
                        decks: [{ "id": 1, "userId": 1, "name": "WaniPlus", "description": "My WP deck.", "dateCreated": "2023-01-08T04:41:20.467Z", "dateUpdated": "2023-01-08T04:41:20.467Z", "allowForks": true, "isPrivate": false, "threadUrl": null, "items": [{ "id": 1, "type": "kanji", "en": "Task", "characters": "用", "data": { "en": ["Task"], "id": "wp-1", "on": ["よう"], "kan": "用", "kun": [], "emph": "onyomi", "mhnt": "hint", "mmne": "task", "rhnt": "hint", "rmne": "task", "type": "Kanji", "nanori": [], "category": "Kanji", "radicals": [], "characters": "用", "vocabulary": [], "relationships": { "study_material": null } }, "deckId": 1, "level": 0 }, { "id": 2, "type": "vocab", "en": "Big Task", "characters": "大用", "data": { "en": ["Big Task"], "id": "wp-2", "aud": "", "voc": "大用", "kana": ["だいよう"], "mhnt": "no hint 4 u", "mmne": "A really big task, like a big chongus-sized task.", "rhnt": "no hint 4 u", "rmne": "Learn to read man . . .", "type": "Vocabulary", "kanji": [{ "en": "Task", "ja": "用", "slug": "task", "type": "Kanji", "characters": "", "characters_img_url": "", "kan": "用" }], "category": "Vocabulary", "sentences": [], "characters": "大用", "collocations": [], "relationships": { "study_material": null }, "parts_of_speech": ["noun"] }, "deckId": 1, "level": 0 }] }],
                    },
                    srs: {
                        1: {
                            stage: 6,
                            lastAdvance: new Date().toISOString()
                        }
                    }
                }
            })
        }

        // check if the guest has decks installed
        if (guestData.data.decks.length > 0) {
            let deckIDs = [];
            guestData.data.decks.forEach(deck => {
                deckIDs.push(deck.id);
            });

            let decks = await fetchUserData(deckIDs);
            guestData.data.decks = insertGuestSRSData(decks, guestData.srs);
        }

        userData = guestData;
        setGuestData(userData);
    }
}

function insertGuestSRSData(decks, srs) {
    decks.map(deck => {
        deck.items.map(item => {
            item.assignment = [];

            if (item.id in srs) {
                item.assignment = [{
                    stage: srs[item.id].stage,
                    lastAdvance: srs[item.id].lastAdvance
                }];
            }

            return item;
        });

        return deck;
    });

    return decks;
}

async function getSession() {
    const res = await fetch(endpoint + '/api/session', { method: 'GET', headers: headers });
    const data = await res.json();
    return data;
}

async function getGuestData() {
    return (await chrome.storage.local.get(['wp_guest'])).wp_data;
}

async function setGuestData(data) {
    await chrome.storage.local.set({ 'wp_guest': data });
}

async function getUserData() {
    return (await chrome.storage.local.get(['wp_data'])).wp_data;
}

async function setUserData(data) {
    await chrome.storage.local.set({ 'wp_data': data });
}

async function fetchUserData(deckIDs) {
    const res = await fetch(endpoint + '/api/me', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            decks: (deckIDs) ? deckIDs : []
        })
    });
    const data = await res.json();
    return data;
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
            if (item.assignment.length == 0) {
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
            if (item.assignment.length > 0) {
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
        const res = await fetch(endpoint + '/api/items/completed', {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(completions),
        });
    }

    // update SRS stage values locally
    if (isGuest || res.status == 200) {
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
                                lastAdvance: new Date().toString()
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

    return true;
    return (elapsed > times[stage] * 60000);
}

chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
    if (sender.origin === 'https://www.wanikani.com') {
        const action = msg.action;

        switch (action) {
            case 'getLessonData':
                getLessonData().then((data) => {
                    sendResponse(data);
                });
                break;
            case 'getReviewData':
                getReviewData().then((data) => {
                    sendResponse(data);
                });
                break;
            case 'itemSRSCompleted':
                itemSRSCompleted(msg.items).then((data) => {
                    sendResponse(data);
                });
                break;
            case 'getState':
                sendResponse({
                    loggedIn: false
                })
                break;
            default:
        }
    } else {
        sendResponse({ error: 'Access denied.' })
    }
});


sync();