(() => {
    function Interceptor() {
        this.hooksIn = {};
        this.hooksOut = {};
        this.hooksInFetch = {};
        this.hooksOutFetch = {};
    }

    Interceptor.prototype.hookIncoming = function (url, callback) {
        this.hooksIn[url] = callback;
    }

    Interceptor.prototype.hookOutgoing = function (url, callback) {
        this.hooksOut[url] = callback;
    }

    Interceptor.prototype.hookIncomingFetch = function (url, callback) {
        this.hooksInFetch[url] = callback;
    }

    Interceptor.prototype.hookOutgoingFetch = function (url, callback) {
        this.hooksOutFetch[url] = callback;
    }

    Interceptor.prototype.intercept = function intercept(xhr, interceptHandler) {
        function getter() {
            // delete getter
            delete xhr.responseText;

            // hijack response
            let response = interceptHandler(xhr.responseText);

            // restore getter
            hook();

            return response;
        }

        function hook() {
            Object.defineProperty(xhr, 'responseText', {
                get: getter,
                configurable: true
            });
        }

        hook();
    }

    XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        let shortUrl = url.replace(/\?.*/, '');

        this.__wp__ = {
            method: method,
            url: shortUrl,
        };

        if (shortUrl in window.__wp__.Interceptor.hooksIn) {
            window.__wp__.Interceptor.intercept(
                this,
                window.__wp__.Interceptor.hooksIn[shortUrl].bind(this)
            );
        }

        this._open.apply(this, arguments);
    }


    XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (data) {
        let call = this._send.bind(this, data);

        if (this.hasOwnProperty('__wp__')) {
            const url = this.__wp__.url;

            if (url in window.__wp__.Interceptor.hooksOut) {
                let ret = window.__wp__.Interceptor.hooksOut[url](data);

                let proceed = ret[0]; // should continue with call?
                let newData = ret[1]; // new data

                data = newData;

                if (proceed) {
                    call();
                }
            } else {
                call();
            }
        } else {
            call();
        }
    };

    /* thanks to https://stackoverflow.com/a/64961272/1748664 */
    const { fetch: origFetch } = window;
    window.fetch = async (...args) => {
        let url = args[0];
        let shortUrl = url.replace(/\?.*/, '');

        // idk why fontawesome causes issues??
        // needs further investigating
        if (url.indexOf('fontawesome') != -1) {
            let response = await origFetch(...args);
            return response;
        }

        // modify arguments before request
        let response;
        if (shortUrl in window.__wp__.Interceptor.hooksOutFetch) {
            let newArgs = window.__wp__.Interceptor.hooksOutFetch[shortUrl](...args);
            response = await origFetch(...newArgs);
        } else {
            response = await origFetch(...args);
        }

        // carry out fetch
        let contentType = response.headers.get('content-type');

        if (contentType.indexOf('application/json') != -1) {
            let body = await response.clone().json();

            if (shortUrl in window.__wp__.Interceptor.hooksInFetch) {
                let modifiedBody = window.__wp__.Interceptor.hooksInFetch[shortUrl](body, args);
                return {
                    type: 'basic',
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    url: response.url,
                    redirected: false,
                    bodyUsed: false,
                    headers: response.headers,
                    json: async () => (modifiedBody)
                };
            }
        }

        return response;
    };

    window.__wp__.Interceptor = new Interceptor();
})();