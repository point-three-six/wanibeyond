(() => {
    let debug = true;

    function init() {
        const deps = getDeps();
        injectDeps(deps);
    }

    function getDeps() {
        let loc = window.location.pathname;
        if (loc.charAt(loc.length - 1) == '/') {
            loc = loc.replace(/\/+$/, '')
        }

        let dependencies = [
            'src/utils/context.js',
            'src/utils/interceptor.js',
            'src/utils/notify.js'
        ];

        switch (loc) {
            case '':
            case '/dashboard':
                dependencies.push('src/pages/pg-wk-home.js');
                break
            case '/lesson/session':
                dependencies.push('src/pages/pg-wk-lessons.js')
                break
            case '/review/session':
                dependencies.push('src/pages/pg-wk-reviews.js')
                break
            default:
                break
        }

        return dependencies;
    }

    function injectDeps(deps) {
        if (debug) console.log('Injecting dependency:', deps[0])
        let s = document.createElement('script');
        s.src = chrome.runtime.getURL(deps[0]);
        (document.head || document.documentElement).appendChild(s);
        s.onload = function () {
            if (deps.length > 0) injectDeps(deps);
            s.remove();
        };
        deps.shift();
    }

    init();
})();