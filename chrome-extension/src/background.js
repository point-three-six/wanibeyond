const endpoint = 'http://localhost:3000'

let userData = [];

function sync() {
    fetchUserData().then((data) => {
        userData = data;

        setUserData(data).then(() => {
            console.log('User data set!')
        }).catch(e => {
            console.log(e);
        });
    }).catch(e => {
        console.log(e);
    });
}

async function getUserData() {
    return await chrome.storage.local.get(['wp_data']);
}

async function setUserData(data) {
    console.log('Setting user data . . .')
    console.log(data)
    await chrome.storage.local.set({ 'wp_data': data });
}

async function fetchUserData() {
    const res = await fetch(endpoint + '/api/me');
    const data = await res.json();
    return data;
}

async function getLessonData() {
    let data = await getUserData();
    let decks = data.wp_data.data.decks;

    // congregate items from all enabled decks
    let items = [];

    for (let i in decks) {
        let deck = decks[i];
        console.log(deck)
        for (let i in deck.items) {
            console.log(deck.items[i].item)
            items.unshift(deck.items[i].item)
        }
    }

    return items;
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
            default:
        }
    } else {
        sendResponse({ error: 'Access denied.' })
    }
});

sync();