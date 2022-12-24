(() => {
    function Interceptor() {
        this.hooksIn = {};
        this.hooksOut = {};
    }

    Interceptor.prototype.hookIncoming = function (url, callback) {
        this.hooksIn[url] = callback;
    }

    Interceptor.prototype.hookOutgoing = function () {
        this.hooksOut[url] = callback;
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
        if (url in window.__wp__.Interceptor.hooksIn) {
            window.__wp__.Interceptor.intercept(
                this, window.__wp__.Interceptor.hooksIn[url].bind(this)
            );
        }

        this._open.apply(this, arguments);
    }


    // XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;
    // XMLHttpRequest.prototype.send = function (data) {
    //     this._send.call(this, data);
    // };

    window.__wp__.Interceptor = new Interceptor();
})();