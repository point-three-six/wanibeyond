(() => {
    let items = [];
    let loadOrder = 'front';
    let wpOnlyMode = false;

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getLessonData' }, (res) => {
        items = res.items;
        loadOrder = res.order;
        wpOnlyMode = res.wpOnlyMode;
    });

    window.__wp__.Interceptor.hookIncoming('/lesson/queue', (data) => {
        return JSON.stringify(injectWPItems(JSON.parse(data)));
    });

    // additional FETCH hook because of reorder omega
    window.__wp__.Interceptor.hookIncomingFetch('/lesson/queue', (data) => {
        return injectWPItems(data);
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
            let jstoreCompleted = $.jStorage.get('wpLessonsComplete') || [];

            extracted.wp.forEach(id => {
                jstoreCompleted.push(Number.MAX_SAFE_INTEGER - parseInt(id));
                completions.push([id, false]);
            });

            chrome.runtime.sendMessage(window.__wp__.eid, { action: 'itemSRSCompleted', items: completions }, (res) => {
                if (!res) window.__wp__.notify('No connection to WaniPlus. Item progress was not saved.');
            });
        }

        return [(filteredIDs > 0), newData];
    });

    // this is for reorder omega
    window.__wp__.Interceptor.hookIncomingFetch('/extra_study/items', (data) => {
        return injectWPItems(data);
    });

    window.__wp__.Interceptor.hookOutgoingFetch('/extra_study/items', (...args) => {
        return args;
    });

    function injectWPItems(data) {
        if (wpOnlyMode) data['queue'] = [];

        items.forEach((item, i) => {
            let id = items[i].id;

            items[i].id = (typeof id == 'string') ? convertID(id) : id; // convert potential WP ids
            items[i].syn = [];

            if (loadOrder == 'random') {
                var rand = Math.floor(Math.random() * (data['queue'].length)) + 1;
                data['queue'].splice(rand, 0, item);
            } else if (loadOrder == 'front') {
                data['queue'].unshift(items[i]);
            } else {
                data['queue'].push(items[i]);
            }
        });

        return data;
    }

    function extractIDsByType(ids) {
        let wpIds = [];
        let wkIds = [];

        for (let i in ids) {
            let id = ids[i];

            if (typeof id == 'string' && id.indexOf('wp-') != -1 || id >= 1000000000000000) {
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

    function convertID(id) {
        let newId = parseInt(id.substring(3, id.length));
        return Number.MAX_SAFE_INTEGER - newId;
    }

    function updateItemCounts() {
        let numrad = $.jStorage.get("l/count/rad");
        let numkan = $.jStorage.get("l/count/kan");
        let numvoc = $.jStorage.get("l/count/voc");

        let numwpRad = items.filter(item => item.type.toLowerCase() == 'radical' && !('kanavocab' in item)).length;
        let numwpKan = items.filter(item => item.type.toLowerCase() == 'kanji').length;
        let numwpVoc = items.filter(item => item.type.toLowerCase() == 'vocabulary' || 'kanavocab' in item).length;

        $.jStorage.set("l/count/rad", numrad + numwpRad);
        $.jStorage.set("l/count/kan", numkan + numwpKan);
        $.jStorage.set("l/count/voc", numvoc + numwpVoc);
    }

    window.addEventListener('load', () => {
        $.jStorage.set('wpLessonsComplete', []);
        updateItemCounts();
        // handle a slower page load . . .
        let obsv = new MutationObserver(updateItemCounts);
        let target = document.getElementById('stats');
        obsv.observe(target, { attributes: true, childList: true, subtree: true });
        setTimeout(() => obsv.disconnect(), 250);
    });
})();

