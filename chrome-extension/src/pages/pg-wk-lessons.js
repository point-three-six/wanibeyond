(() => {
    var items = [];

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getLessonData' }, (data) => {
        items = data;
    });

    window.__wp__.Interceptor.hookIncoming('/lesson/queue', (data) => {
        return injectWPData(data);
    });

    window.__wp__.Interceptor.hookOutgoing('/json/lesson/completed', (data) => {
        let params = new URLSearchParams(data);
        let ids = params.getAll('keys[]');

        let extracted = extractIDsByType(ids);

        console.log(extracted)

        let filteredIDs = extracted.wk;
        params.set('keys[]', filteredIDs);
        newData = params.toString();

        if (extracted.wp.length > 0) {
            chrome.runtime.sendMessage(window.__wp__.eid, { action: 'itemSRSCompleted' });
        }

        console.log('newData')
        console.log(newData)

        return [(filteredIDs > 0), newData];
    })

    function injectWPData(response) {
        response = JSON.parse(response);

        for (let i in items) {
            response['queue'].unshift(items[i]);
        }

        return JSON.stringify(response);
    }

    function extractIDsByType(ids) {
        let wpIds = [];
        let wkIds = [];

        for (let i in ids) {
            let id = ids[i];

            if (typeof id == 'string' && id.indexOf('wp-') != -1) {
                wpIds.push(id);
            } else {
                wkIds.push(id);
            }
        }

        return {
            'wk': wkIds,
            'wp': wpIds
        }
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

