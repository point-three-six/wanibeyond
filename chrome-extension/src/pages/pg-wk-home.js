(function () {
    let lessonCount = 0;
    let reviewCount = 0;

    function init() {
        let [span_lessons, span_reviews] = document.querySelectorAll('.lessons-and-reviews span');

        span_lessons.innerText = parseInt(span_lessons.innerText) + lessonCount;
        span_reviews.innerText = parseInt(span_reviews.innerText) + reviewCount;
    }

    function isReady(e) {
        if (document.querySelector('section.lessons-and-reviews')) {
            document.removeEventListener('readystatechange', isReady);
            init();
        }
    }

    document.addEventListener('readystatechange', isReady);

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getLessonData' }, (res) => {
        lessonCount += res.items.length;
    });
    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getReviewData' }, (res) => {
        reviewCount += res.items.length;
    });
})();


