let manifest = chrome.runtime.getManifest();

function showUser() {
    let el = document.getElementById('user');
    el.classList.toggle('hidden');
}

function hideLoading() {
    let el = document.getElementById('loading');
    el.classList.add('hidden');
}

function buildDecksEl(decks) {
    let html = '';
    for (deck of decks) {
        html += `<div class="deck"><a href="https://www.waniplus.com/decks/${deck.id}" target="_blank">${esc(deck.name)}</a></div>`;
    }

    document.getElementById('decks').innerHTML = html;
}

function esc(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.addEventListener('load', () => {
    document.getElementById('version').innerText = manifest.version;

    chrome.runtime.sendMessage({ action: 'getState' }, (state) => {
        let session = state.session;

        if ('user' in session) {
            document.getElementById('username').innerText = session.user.username;
        }

        buildDecksEl(state.decks);
        hideLoading();
        showUser();
    });
})