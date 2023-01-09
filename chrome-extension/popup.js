let manifest = chrome.runtime.getManifest();

chrome.runtime.sendMessage({ action: 'getState' }, (state) => {
    console.log(state)
});

window.addEventListener('load', () => {
    document.getElementById('version').innerText = manifest.version;
})