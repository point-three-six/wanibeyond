(() => {
    var items = [];

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getLessonData' }, (data) => {
        items = data;
    });

    window.__wp__.Interceptor.hookIncoming('/lesson/queue', (data) => {
        return injectWPData(data);
    })
    window.__wp__.Interceptor.hookOutgoing('/lesson/queue', (data) => {
        // if (this.hasOwnProperty('__hb_xhr')) {
        //     let req = this.__hb_xhr;
        //     if (req.url == '/json/lesson/completed') {
        //         console.log('hijack')
        //         return;
        //     }
        // }
        return data;
        //return injectWPData(data);
    })

    function injectWPData(response) {
        response = JSON.parse(response);

        console.log('injecting items')
        console.log(items)

        // for (let i in items) {
        //     response['queue'].unshift(items[i]);
        // }

        response['queue'] = items;


        return JSON.stringify(response);
    }
})();

