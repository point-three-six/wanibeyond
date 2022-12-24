(() => {
    function API() {
        this.endpoint = 'http://localhost:3000'
    }

    API.prototype.getItems = async function () {
        const res = await fetch(this.endpoint + '/api/test');
        const data = await res.json();
        return data;
    }

    window.__wp__.API = new API();
})();