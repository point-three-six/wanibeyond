(function () {
    window.__wp__.API.getItems().then((items) => {
        console.log(items)
    });

    function init() {
        let [span_lessons, span_reviews] = document.querySelectorAll('.lessons-and-reviews span');

        span_lessons.innerText = 300;
        span_reviews.innerText = 3550;

        console.log('inject-wk-home');
    }

    function isReady(e) {
        if (document.querySelector('section.lessons-and-reviews')) {
            document.removeEventListener('readystatechange', isReady);
            init();
        }
    }

    document.addEventListener('readystatechange', isReady);
})();


