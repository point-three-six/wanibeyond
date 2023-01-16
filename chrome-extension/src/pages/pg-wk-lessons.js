(() => {
    let items = [];
    let loadOrder = 'random';

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getLessonData' }, (res) => {
        items = res.items;
        loadOrder = res.order;
    });

    window.__wp__.Interceptor.hookIncoming('/lesson/queue', (data) => {
        return injectWPData(data);
    });

    window.__wp__.Interceptor.hookOutgoing('/json/lesson/completed', (data) => {
        let params = new URLSearchParams(data);
        let ids = params.getAll('keys[]');

        let extracted = extractIDsByType(ids);

        let filteredIDs = extracted.wk;
        params.set('keys[]', filteredIDs);
        newData = params.toString();

        if (extracted.wp.length > 0) {
            let completions = [];
            extracted.wp.forEach(id => {
                completions.push([id, false]);
            });

            chrome.runtime.sendMessage(window.__wp__.eid, { action: 'itemSRSCompleted', items: completions }, (res) => {
                if (!res) window.__wp__.notify('No connection to WaniPlus. Item progress was not saved.');
            });
        }

        return [(filteredIDs > 0), newData];
    })

    function injectWPData(response) {
        response = JSON.parse(response);

        items.forEach((item, i) => {
            if (loadOrder == 'random') {
                var rand = Math.floor(Math.random() * (response['queue'].length)) + 1;
                response['queue'].splice(rand, 0, item);
            } else if (loadOrder == 'front') {
                response['queue'].unshift(items[i]);
            } else {
                response['queue'].push(items[i]);
            }
        });

        return JSON.stringify(response);
    }

    // thanks
    // https://stackoverflow.com/a/12646864/1748664
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
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
})();

