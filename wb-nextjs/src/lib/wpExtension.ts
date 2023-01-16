export default async function sendExtMsg(action, msg, callback) {
    if (typeof window !== 'undefined') {
        if (typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined') {
            chrome.runtime.sendMessage('kjchkccopfleoicagpoopmkodahnfaom', { action: action, data: msg }, (res) => {
                if (callback) {
                    callback(res);
                }
            });
        }
    }
}