(function () {
    const manifest = chrome.runtime.getManifest();
    const version = manifest.version;
    console.info('WaniPlus: ', version);

    let debug = true;

    function init() {
        const dependencies = getDependencies();
        injectDependencies(dependencies);
    }

    function getDependencies() {
        let loc = window.location.pathname;
        if (loc.charAt(loc.length - 1) == '/') {
            loc = loc.replace(/\/+$/, '')
        }

        let dependencies = ['src/utils/interceptor.js'];

        switch (loc) {
            case '':
            case '/dashboard':
                dependencies.push('src/pages/pg-wk-home.js');
                break
            case '/lesson/session':
                dependencies.push('src/pages/pg-wk-lessons.js')
            default:
                break
        }

        return dependencies;
    }

    function injectDependencies(dependencies) {
        for (let i = 0; i < dependencies.length; i++) {
            if (debug) console.log('Injecting dependency:', dependencies[i])

            var s = document.createElement('script');
            s.src = chrome.runtime.getURL(dependencies[i]);
            (document.head || document.documentElement).appendChild(s);
            s.onload = function () {
                //s.remove();
            };
        }
    }

    init();
})();