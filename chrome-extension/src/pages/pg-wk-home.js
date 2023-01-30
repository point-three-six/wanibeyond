(function () {
    let decks = [];
    let lessonCount = 0;
    let reviewCount = 0;


    function init() {
        /* lesson & reviews button */
        let [span_lessons, span_reviews] = document.querySelectorAll('.lessons-and-reviews span');

        let finalNumLessons = parseInt(span_lessons.innerText) + lessonCount;
        let finalNumReviews = parseInt(span_reviews.innerText) + reviewCount;

        span_lessons.innerText = finalNumLessons;
        span_reviews.innerText = finalNumReviews;

        let [a_lessons, a_reviews] = document.getElementsByClassName('lessons-and-reviews__button');

        updateLRButtonClass(a_lessons, finalNumLessons);
        updateLRButtonClass(a_reviews, finalNumReviews);

        /* deck progress panel */
        let wpProgress = document.createElement('section');
        wpProgress.setAttribute('id', 'waniplus-decks');
        wpProgress.innerHTML = getWaniPlusProgressHTML();
        document.getElementsByClassName('progress-and-forecast')[0].after(wpProgress)

        document.getElementsByClassName('fittext').forEach(el => {
            let len = el.innerText.length;
            let compressorMap = {
                0: 0,
                1: 0,
                2: .3,
                3: .4,
                4: .5,
                5: .6,
                6: .7
            };
            if (len > 1) {
                window.fitText(el, compressorMap[len] || .9);
            }
        });
    }

    function updateLRButtonClass(el, newCount) {
        el.classList.forEach(cls => {
            if (/lessons-and-reviews__(lessons|reviews)-button--\d+/.test(cls)) {
                let newCls = cls.replace(/(lessons-and-reviews__(lessons|reviews)-button--)(\d+)/, '$1' + newCount);
                el.classList.remove(cls);
                el.classList.add(newCls);
            }
        });
    }

    function getWaniPlusProgressHTML() {
        let deckHtml = '';

        if (decks.length == 0) deckHtml = '<div class="rounded bg-white p-3 -mx-3 mt-3">No decks installed. <a href="https://waniplus.com/decks" target="_blank" style="color:#dd0093;text-decoration:none;">Get started with a custom deck!</a></div>';
        for (deck of decks) {
            let itemHtml = '';

            for (item of deck.items) {
                let type = (item.kanavocab) ? 'kanavocab' : item.category;
                let srsLevel = item.assignment.length > 0 ? item.assignment[0].stage : 0;
                let itemClass = (type == 'kanji') ? 'kanji' : 'radical';
                let itemColor1 = (type == 'kanavocab') ? 'orange' : '#a0f';
                let itemColor2 = (type == 'kanavocab') ? 'rgb(233, 151, 0)' : 'rgb(146, 0, 219)';
                let itemStyle =
                    (['kanavocab', 'vocabulary'].indexOf(type) != -1) ?
                        `background-color:${itemColor1};background-image: linear-gradient(to bottom, ${itemColor1}, ${itemColor2});background-repeat: repeat-x;`
                        : '';
                let itemTitle = 'Unlocked!' + (item.isReady ? ' Waiting for you!' : '');

                // item is locked.
                // overwrite icon bg to be gray.
                if (!item.unlocked) {
                    itemStyle = 'background-image:#ccc;linear-gradient(180deg, #ccc 0%, #BFBFBF 100%);background-repeat: repeat-x;';
                    itemTitle = 'Locked! Your DECK LEVEL must be level ' + item.level + ' to unlock this item. Your deck level is currently ' + deck.level + '.';
                }

                itemHtml += `<div class="progress-entry relative rounded-tr rounded-tl" title="${itemTitle}">
                        <a href="https://waniplus.com/decks/${deck.id}/item/${item.id}" target="_blank" class="${itemClass}-icon ${!item.unlocked ? itemClass + '-icon--locked' : ''}" lang="ja" style="${itemStyle}">
                            <div class="fittext">${item.characters}</div>
                        </a>
                        <div class="progress-entry__pips w-full flex flex-row">
                            <div class="h-1 w-1/5 rounded-l ${srsLevel >= 5 ? '' : 'mr-px'} ${srsLevel >= 1 ? 'bg-green' : 'bg-gray-300'}"></div>
                            <div class="h-1 w-1/5 ${srsLevel >= 5 ? '' : 'mr-px'} ${srsLevel >= 2 ? 'bg-green' : 'bg-gray-300'}"></div>
                            <div class="h-1 w-1/5 ${srsLevel >= 5 ? '' : 'mr-px'} ${srsLevel >= 3 ? 'bg-green' : 'bg-gray-300'}"></div>
                            <div class="h-1 w-1/5 ${srsLevel >= 5 ? '' : 'mr-px'} ${srsLevel >= 4 ? 'bg-green' : 'bg-gray-300'}"></div>
                            <div class="h-1 w-1/5 rounded-r ${srsLevel >= 5 ? 'bg-green' : 'bg-gray-300'}"></div>
                        </div>
                    </div>`;
            }

            deckHtml += `<div class="rounded bg-white p-3 -mx-3 mt-3">
                            <h2
                                class="border-gray-100 border-solid border-0 border-b text-sm text-black text-left leading-none tracking-normal font-bold mt-0 pb-2 mb-2">
                                ${deck.name}
                            </h2>
                            <div class="progress-entries" style="grid-template-columns:repeat(auto-fill, minmax(45px, auto));">
                                ${itemHtml}
                            </div>
                        </div>`;
        }

        let parentHtml = `
        <div style="box-shadow: 0 1px 0 #fff; background-color: #f4f4f4; padding: 16px 24px 12px; border-radius:5px;">
            <div class="progress-component">
                <h1 class="text-xl leading-normal font-medium text-dark-gray m-0">
                My Decks
                </h1>
                ${deckHtml}
            </div>
        </div>`;
        return parentHtml;
    }

    function isReady(e) {
        if (document.querySelector('section.lessons-and-reviews')) {
            document.removeEventListener('readystatechange', isReady);
            init();
        }
    }

    document.addEventListener('readystatechange', isReady);

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


