window.addEventListener("beforeunload", function () { debugger; }, false);

(() => {
    var items = [];

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getReviewData' }, (data) => {
        items = data;
    });

    window.__wp__.Interceptor.hookIncoming('/review/queue', (data) => {
        return injectWPIds(data);
    });

    window.__wp__.Interceptor.hookIncomingFetch('/review/items', (data) => {
        console.log('[INCOMING] HOOKED FETCH reviewItems request')
        return injectWPItems(data);
    });

    window.__wp__.Interceptor.hookOutgoingFetch('/review/items', (...args) => {
        console.log('[OUTGOING] HOOKED FETCH reviewItems request')
        console.log(args)
        return args;
    });

    // window.__wp__.Interceptor.hookOutgoing('/json/progress', (data) => {
    //     console.log('HOOKED PROGRESS, heres the preview')
    //     console.log(data);
    //     return [true, data];
    // })

    function injectWPIds(response) {
        response = JSON.parse(response);

        for (let i in items) {
            let id = items[i].id;
            id = parseInt(id.substring(3, id.length))
            response.unshift(Number.MAX_SAFE_INTEGER - id);
        }

        return JSON.stringify(response);
    }

    function injectWPItems(data) {
        for (let i in items) {
            data.unshift(items[i]);
        }

        return data;
    }

})();

