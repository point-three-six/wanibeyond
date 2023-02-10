// window.summaryData
// {
//     "stats": [],
//     "queue_count": 118,
//     "last_lesson_date": "2023-02-10T14:32:34.604922Z"
// }

(() => {
    let lessonCount = 0;
    let reviewCount = 0;

    window.addEventListener('load', async function () {
        let parent = document.getElementById('start-session');
        let button = parent.firstElementChild;
        let span = parent.lastElementChild;

        let isLessonsSummary = (button.href.indexOf('lesson') !== -1) ? true : false;

        let nativeCount = parseInt(span.innerText);
        let newCount = nativeCount + ((isLessonsSummary) ? lessonCount : reviewCount);

        if (newCount > 0) {
            button.classList.remove('disabled');
            var newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        }
        span.innerText = newCount;
    });

    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getState' }, (res) => {
        decks = res.decks;

        for (deck of decks) {
            for (let item of deck.items) {
                if (item.unlocked && item.isReady) {
                    if (item.isInLessonQueue) {
                        lessonCount++;
                    } else {
                        reviewCount++;
                    }
                }
            }
        }
    });
})();