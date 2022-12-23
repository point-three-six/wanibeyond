var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject-bridge.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.remove();
};