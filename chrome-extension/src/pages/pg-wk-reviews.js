window.addEventListener("beforeunload", function () { debugger; }, false);

(() => {
    let items = [];

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getReviewData' }, (data) => {
        items = data;
    });

    window.__wp__.Interceptor.hookIncoming('/review/queue', (data) => {
        return injectWPIds(data);
    });

    window.__wp__.Interceptor.hookIncomingFetch('/review/items', (data) => {
        return injectWPItems(data);
    });

    window.__wp__.Interceptor.hookOutgoingFetch('/review/items', (...args) => {
        console.log('HOOKED OUTGOING /review/items')
        return args;
    });

    window.__wp__.Interceptor.hookIncomingFetch('/json/progress', (data, args) => {
        console.log('HOOKED INCOMING /json/progress')

        // if we sent a request containing a WP id
        // it will not be in the returned data.
        let requestIDs = Object.keys(JSON.parse(args[1].body));

        for (let id of requestIDs) {
            if (!(id in data)) {
                data[id] = [0, ''];
            }
        }

        return data;
    });

    window.__wp__.Interceptor.hookOutgoingFetch('/json/progress', (...args) => {
        console.log('HOOKED OUTGOING /json/progress')
        return args;
    });

    // window.__wp__.Interceptor.hookOutgoingFetch('/json/progress', (data) => {
    //     console.log('HOOKED OUTGOING /json/progress')
    //     console.log(data);
    //     return data;
    // });

    // window.__wp__.Interceptor.hookOutgoingFetch('/json/progress', (...args) => {

    //     return [false, args];
    // })

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

            console.log(items[i])

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

