(() => {
    var items = [];

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getLessonData' }, (data) => {
        items = data;
    });

    console.log(JSON.stringify(window.__wp__.Interceptor))

    window.__wp__.Interceptor.hookIncoming('/lesson/queue', (data) => {
        return injectWPData(data);
    });


    window.__wp__.Interceptor.hookOutgoing('/json/lesson/completed', (data) => {
        let params = new URLSearchParams(data);
        let ids = params.getAll('keys[]');
        // let filteredIDs = removeWPData(ids);
        // params.set('keys[]', filteredIDs);
        //return params.toString();

        return [!containsWPItemId(ids), data];
    })

    function injectWPData(response) {
        response = JSON.parse(response);

        for (let i in items) {
            response['queue'].unshift(items[i]);
        }

        return JSON.stringify(response);
    }

    function containsWPItemId(ids) {
        for (let i in ids) {
            let id = ids[i];

            if (typeof id == 'string' && id.indexOf('wp-') != -1) return true;
        }

        return false;
    }

    function removeWPData(ids) {
        let newIDs = [];

        for (let i in ids) {
            let id = ids[i];

            if (typeof id == 'string' && id.indexOf('wp-') != -1) continue;
            if (typeof id == Number && id > 99900) continue;
            newIDs.push(id);
        }

        return newIDs;
    }
})();

