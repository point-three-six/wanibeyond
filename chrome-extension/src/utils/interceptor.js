(() => {
    function Interceptor() {
        console.log('init interceptor')
    }

    Interceptor.prototype.hookIncoming = function () {
        console.log('hook incoming ...')
    }

    Interceptor.prototype.hookOutgoing = function () {
        console.log('hook outgoing ...')
    }

    // XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;
    // XMLHttpRequest.prototype.send = function (data) {
    //     this._send.call(this, data);
    // };

    // XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
    // XMLHttpRequest.prototype.open = function (m, u) {
    //     this._open.apply(this, arguments);
    // }

    window.__wp__.Interceptor = new Interceptor();
})();