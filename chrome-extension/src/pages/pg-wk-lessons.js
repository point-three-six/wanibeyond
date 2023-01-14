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

    window.addEventListener('ready', function () {
        let r = 0;
        let k = 0;
        let v = 0;
        items.forEach(item => {
            console.log(item.type)
            if (item.type.toLowerCase() == 'radical') r++;
            if (item.type.toLowerCase() == 'kanji') k++;
            if (item.type.toLowerCase() == 'vocabulary') v++;
        });

        let rEl = document.querySelector('#radical-count span');
        let kEl = document.querySelector('#kanji-count span');
        let vEl = document.querySelector('#vocabulary-count span');

        rEl.innerHTML = (parseInt(rEl.innerText) + r);
        kEl.innerHTML = (parseInt(kEl.innerText) + k);
        vEl.innerHTML = (parseInt(vEl.innerText) + v);
    });
})();

