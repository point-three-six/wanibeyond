export default async function sendExtMsg(action, msg, callback) {
    if (typeof window !== 'undefined') {
        if (typeof chrome !== 'undefined') {
            chrome.runtime.sendMessage('kjchkccopfleoicagpoopmkodahnfaom', { action: action, message: msg }, (res) => {
                if (callback) {
                    callback(res);
                }
            });
        }
    }
}