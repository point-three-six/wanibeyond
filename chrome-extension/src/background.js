const endpoint = 'http://localhost:3000'

// use data returned from /api/me
let userData = {};

// store locally completed items until they can
// be sent to the server to be processed.
let completed = [];

// headers that enforce no caching for a fetch request
var headers = new Headers();
headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');

function init() {
    fetchUserData().then((data) => {
        userData = data;

        setUserData(data).then(() => {
            console.log('User data set!')
        });

    });
}

async function sync() {

}

async function getUserDataStore() {
    return await chrome.storage.local.get(['wp_data']);
}

async function setUserData(data) {
    await chrome.storage.local.set({ 'wp_data': data });
}

async function fetchUserData() {
    const res = await fetch(endpoint + '/api/me', { method: 'GET', headers: headers });
    const data = await res.json();
    return data;
}

async function getLessonData() {
    let decks;

    if (Object.keys(userData).length == 0) {
        let data = await getUserDataStore();
        decks = data.wp_data.data.decks;
    } else {
        decks = userData.data.decks;
    }

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
    let decks;

    if (!userData) {
        let data = await getUserDataStore();
        decks = data.wp_data.data.decks;
    } else {
        decks = userData.data.decks;
    }

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

                //deck.items[i].data.__wp__ = true;
                items.unshift(item.data)
            }
        }
    }

    return items;
}


async function itemSRSCompleted(items) {
    const res = await fetch(endpoint + '/api/items/completed', {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(items),
    });
    const data = await res.json();

    // update locally
    if (res.status() == 200) {

    }

    return true;
}

chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
    if (sender.origin === 'https://www.wanikani.com') {
        const action = msg.action;

        switch (action) {
            case 'getLessonData':
                console.log('Action getLessonData . . .')
                getLessonData().then((data) => {
                    sendResponse(data);
                });
                break;
            case 'getReviewData':
                console.log('Action getReviewData . . .')
                getReviewData().then((data) => {
                    sendResponse(data);
                });
                break;
            case 'itemSRSCompleted':
                itemSRSCompleted(msg.items).then((data) => {
                    sendResponse(data);
                });
                break;
            default:
        }
    } else {
        sendResponse({ error: 'Access denied.' })
    }
});

init();