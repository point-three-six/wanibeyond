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
    if (decks.length > 0) {
        for (deck of decks) {
            html += `<div class="deck"><a href="https://waniplus.com/decks/${deck.id}" target="_blank">${esc(deck.name)}</a></div>`;
        }
    } else {
        html = `No decks installed.<br/><br/><a href="https://waniplus.com/decks" target="_blank">Click here to browse decks!</a>
        <br/><br/>
        Or <a href="https://waniplus.com/decks/create" target="_blank">create a new deck!</a>`;
    }

    document.getElementById('decks').innerHTML = html;
}

function loadOrder(order) {
    let html = '';
    let values = ['front', 'back', 'random'];

    values.forEach(val => {
        html += `<option value="${val}" ${val == order ? 'selected' : ''}>${val.toUpperCase()}</option>`;
    });

    document.getElementById('load-order').innerHTML = html;
}

function esc(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.addEventListener('load', () => {
    document.getElementById('version').innerText = manifest.version;

    chrome.runtime.sendMessage({ action: 'getState' }, (state) => {
        if (typeof state != 'undefined') {
            let session = state.session;
            let decks = state.decks || [];
            let order = state.loadOrder;

            if ('username' in session) {
                document.getElementById('username').innerText = session.username;
            }

            buildDecksEl(decks);
            loadOrder(order);
            document.getElementById('waniplus-only').checked = state.wpOnlyMode;
            hideLoading();
            showUser();
        }
    });

    document.getElementById('load-order').addEventListener('change', (e) => {
        let order = e.target.value;

        chrome.runtime.sendMessage({ action: 'setLoadOrder', order: order });
    });
    document.getElementById('waniplus-only').addEventListener('change', (e) => {
        chrome.runtime.sendMessage({ action: 'setWPOnlyMode', enabled: e.target.checked });
    })
})