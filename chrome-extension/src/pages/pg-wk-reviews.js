(() => {
    let itemsIds = [];
    let items = [];
    let loadOrder = 'front';
    let wpOnlyMode = false;

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getReviewData' }, (res) => {
        items = res.items;
        items.forEach(item => itemsIds.push(convertID(item.id)));
        loadOrder = res.order;
        wpOnlyMode = res.wpOnlyMode;
    });

    window.__wp__.Interceptor.hookIncoming('/review/queue', (data) => {
        return injectWPIds(data);
    });

    window.__wp__.Interceptor.hookIncomingFetch('/review/items', (data) => {
        return injectWPItems(data);
    });

    window.__wp__.Interceptor.hookOutgoingFetch('/review/items', (...args) => {
        return args;
    });

    // this is for reorder omega
    window.__wp__.Interceptor.hookIncomingFetch('/extra_study/items', (data) => {
        return injectWPItems(data);
    });

    window.__wp__.Interceptor.hookOutgoingFetch('/extra_study/items', (...args) => {
        return args;
    });

    window.__wp__.Interceptor.hookIncomingFetch('/json/progress', (data, args) => {
        // list of ids that will need to be sent to WP
        // for SRS upgrade
        let completions = [];

        // ideas in the original fetch request
        let body = JSON.parse(args[1].body);
        let requestIDs = Object.keys(body);

        requestIDs.forEach(id => {
            let p1 = body[id][0];
            let p2 = body[id][1];

            let failed = false;

            if (p1 == 0 && typeof p2 == 'number' && p2 > 0) failed = true;
            if (p1 > 0) failed = true;

            // the WaniKani endpoint will automatically drop
            // our fake WP ids, so we will inject them back
            // into the response
            if (!(id in data)) {
                data[id] = [0, ''];
            }

            // handle srs for WP items only
            let idNum = parseInt(id);
            if (itemsIds.indexOf(idNum) !== -1) {
                completions.push([idNum, failed]);
            }
        });

        // tell extension to upgrade SRS
        if (completions.length > 0) {
            chrome.runtime.sendMessage(window.__wp__.eid, { action: 'itemSRSCompleted', items: completions }, (res) => {
                if (!res) window.__wp__.notify('No connection to WaniPlus. Item progress was not saved.');
            });
        }

        return data;
    });

    function injectWPIds(response) {
        response = JSON.parse(response);

        for (let i in items) {
            let id = convertID(items[i].id);
            response.unshift(id);
        }

        return JSON.stringify(response);
    }

    function injectWPItems(data) {
        //data = [];

        if (wpOnlyMode) data = [];

        items.forEach((item, i) => {
            let id = items[i].id;

            items[i].id = (typeof id == 'string') ? convertID(id) : id; // convert potential WP ids
            items[i].syn = [];

            if (loadOrder == 'random') {
                var rand = Math.floor(Math.random() * (data.length)) + 1;
                data.splice(rand, 0, item);
            } else if (loadOrder == 'front') {
                data.unshift(items[i]);
            } else {
                data.push(items[i]);
            }
        });

        return data;
    }

    function convertID(id) {
        let newId = parseInt(id.substring(3, id.length));
        return Number.MAX_SAFE_INTEGER - newId;
    }
})();