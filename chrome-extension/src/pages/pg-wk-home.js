(function () {
    function init() {
        let [span_lessons, span_reviews] = document.querySelectorAll('.lessons-and-reviews span');

        span_lessons.innerText = 300;
        span_reviews.innerText = 3550;

        console.log('inject-wk-home');
    }

    document.addEventListener('readystatechange', () => {
        console.log('lets listen')
        if (document.querySelector('section.lessons-and-reviews')) {
            init();
        }
    });
})();


