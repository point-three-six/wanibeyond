window.addEventListener('load', async function () {
    let lvl = options['Current Level'];
    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'setLevel', level: lvl });
});