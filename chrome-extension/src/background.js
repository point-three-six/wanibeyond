const endpoint = 'http://localhost:3000'

let userData = [];

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

    }, { method: 'GET', headers: headers });
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
    const res = await fetch(endpoint + '/api/me');
    const data = await res.json();
    return data;
}

async function getLessonData() {
    let data = await getUserDataStore();
    let decks = data.wp_data.data.decks;

    // congregate items from all enabled decks
    let items = [];

    for (let i in decks) {
        let deck = decks[i];
        for (let i in deck.items) {
            deck.items[i].data.__wp__ = true;
            items.unshift(deck.items[i].data)
        }
    }

    return items;
}

async function itemSRSCompleted(data) {
    console.log('bg received itemSRSCompleted action')
    console.log(data)
    return true;
}

chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
    if (sender.origin === 'https://www.wanikani.com') {
        const action = msg.action;

        switch (action) {
            case 'getLessonData':
                console.log('Action getLessonData . . .')
                getLessonData().then((data) => {
                    console.log(data)
                    sendResponse(data);
                });
                break;
            case 'itemSRSCompleted':
                itemSRSCompleted().then((data) => {
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