//window.addEventListener("beforeunload", function () { debugger; }, false);

(() => {
    let itemsIds = [];
    let items = [];

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getReviewData' }, (data) => {
        items = data;
        for (let item of data) {
            itemsIds.push(item.id);
        }
    });

    window.__wp__.Interceptor.hookIncoming('/review/queue', (data) => {
        return injectWPIds(data);
    });

    window.__wp__.Interceptor.hookIncomingFetch('/review/items', (data) => {
        return injectWPItems(data);
    });

    /* TODO: DO NOT LET CALL HAPPEN? */
    window.__wp__.Interceptor.hookOutgoingFetch('/review/items', (...args) => {
        return args;
    });

    window.__wp__.Interceptor.hookIncomingFetch('/json/progress', (data, args) => {
        // list of ids that will need to be sent to WP
        // for SRS upgrade
        let wpIds = [];

        // ideas in the original fetch request
        let requestIDs = Object.keys(JSON.parse(args[1].body));

        requestIDs.forEach(id => {
            // the WaniKani endpoint will automatically drop
            // our fake WP ids, so we will inject them back
            // into the response
            if (!(id in data)) {
                data[id] = [0, ''];
            }

            // handle srs for WP items
            let wpId = 'wp-' + (Number.MAX_SAFE_INTEGER - parseInt(id));
            if (itemsIds.indexOf(wpId) != -1) {
                wpIds.push(wpId);
            }
        });

        // tell extension to upgrade SRS
        if (wpIds.length > 0) {
            chrome.runtime.sendMessage(window.__wp__.eid, { action: 'itemSRSCompleted', items: wpIds });
        }

        return data;
    });

    // window.__wp__.Interceptor.hookOutgoingFetch('/json/progress', (...args) => {
    //     return args;
    // });

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

        for (let i in items) {
            let id = items[i].id;

            items[i].id = (typeof id == 'string') ? convertID(id) : id; // convert potential WP ids
            items[i].syn = [];
            data.unshift(items[i]);
        }

        return data;
    }

    function convertID(id) {
        let newId = parseInt(id.substring(3, id.length));
        return Number.MAX_SAFE_INTEGER - newId;
    }

})();

