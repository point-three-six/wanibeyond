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
        const style = document.createElement('style');
        style.textContent = '.kanavocab { background-color:orange; } .onhover { display:none; } .onhovertrigger:hover .onhover {display:block;}';
        document.head.append(style);

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

        if (isLessonsSummary) {
            updateLessonsSummary();
        } else {
            updateReviewsSummary();
        }
    });

    function updateLessonsSummary() {
        let completed = $.jStorage.get('wpLessonsComplete') || [];
        if (completed.length == 0) return;

        let radCountEl = document.getElementById('radicals').getElementsByClassName('summary-statistics__count')[0];
        let kanCountEl = document.getElementById('kanji').getElementsByClassName('summary-statistics__count')[0];
        let vocCountEl = document.getElementById('vocabulary').getElementsByClassName('summary-statistics__count')[0];

        let radCount = parseInt(radCountEl.innerText);
        let kanCount = parseInt(kanCountEl.innerText);
        let vocCount = parseInt(vocCountEl.innerText);

        let items = [];

        decks.forEach(deck => {
            deck.items.forEach(item => {
                if (completed.indexOf(item.id) !== -1) {
                    items.push(item);
                }
            });
        });

        // items completed in last session
        items.forEach(item => {
            let type = item.category.toLowerCase();
            if (type == 'radical' && item.kanavocab) type = 'vocabulary';

            document.getElementById((type == 'radical') ? 'radicals' : type)
                .getElementsByTagName('ul')[0]
                .insertAdjacentHTML('beforeend', buildItemHTML(item));

            if (type == 'radical' && !item.kanavocab) radCount++;
            if (type == 'kanji') kanCount++;
            if (type == 'vocabulary' || (type == 'radical' && item.kanavocab)) vocCount++;
        });

        radCountEl.innerText = radCount;
        kanCountEl.innerText = kanCount;
        vocCountEl.innerText = vocCount;

        if (radCount > 0)
            document.getElementById('radicals').getElementsByClassName('summary-statistics__items-container')[0].style.display = 'block';
        if (kanCount > 0)
            document.getElementById('kanji').getElementsByClassName('summary-statistics__items-container')[0].style.display = 'block';
        if (vocCount > 0)
            document.getElementById('vocabulary').getElementsByClassName('summary-statistics__items-container')[0].style.display = 'block';
    }

    function updateReviewsSummary() {
        let completed = $.jStorage.get('wpReviewsComplete') || [];
        if (completed.length == 0) return;

        let percentCorrectEl = document.getElementById('review-stats-answered-correctly').firstElementChild;

        let radCorrectEl = document.getElementById('review-stats-radicals').firstElementChild;
        let kanCorrectEl = document.getElementById('review-stats-kanji').firstElementChild;
        let vocCorrectEl = document.getElementById('review-stats-vocabulary').firstElementChild;

        let radTotalEl = document.getElementById('review-stats-radicals').getElementsByClassName('review-stats-total')[0].getElementsByTagName('span')[0];
        let kanTotalEl = document.getElementById('review-stats-kanji').getElementsByClassName('review-stats-total')[0].getElementsByTagName('span')[0];
        let vocTotalEl = document.getElementById('review-stats-vocabulary').getElementsByClassName('review-stats-total')[0].getElementsByTagName('span')[0];

        let incorrectEl = document.getElementById('incorrect').getElementsByTagName('strong')[0];
        let correctEl = document.getElementById('correct').getElementsByTagName('strong')[0];

        let radCorrect = parseInt(radCorrectEl.innerText);
        let kanCorrect = parseInt(kanCorrectEl.innerText);
        let vocCorrect = parseInt(vocCorrectEl.innerText);

        let radTotal = parseInt(radTotalEl.innerText);
        let kanTotal = parseInt(kanTotalEl.innerText);
        let vocTotal = parseInt(vocTotalEl.innerText);

        let numIncorrect = parseInt(incorrectEl.innerText);
        let numCorrect = parseInt(correctEl.innerText);

        let wpRadTotal = 0;
        let wpKanTotal = 0;
        let wpVocTotal = 0;
        let wpRadCorrect = 0;
        let wpKanCorrect = 0;
        let wpVocCorrect = 0;
        let wpRadIncorrect = 0;
        let wpKanIncorrect = 0;
        let wpVocIncorrect = 0;

        let correct = {
            'apprentice': [],
            'guru': [],
            'master': [],
            'enlightened': [],
            'burned': []
        };
        let incorrect = {
            'apprentice': [],
            'guru': [],
            'master': []
        };

        completed.forEach(complete => {
            let id = complete[0];
            let failed = complete[1];

            decks.forEach(deck => {
                deck.items.forEach(item => {
                    if (id == item.id) {
                        let type = item.category.toLowerCase();
                        let stage = getStageAsStr(item.wpSrs);

                        console.log(stage)

                        if (failed) {
                            incorrect[stage].push(item);
                        } else {
                            correct[stage].push(item);
                        }

                        if (type == 'radical' && !item.kanavocab) {
                            wpRadTotal++;
                            (failed) ? wpRadIncorrect++ : wpRadCorrect++;
                        }
                        if (type == 'kanji') {
                            wpKanTotal++;
                            (failed) ? wpKanIncorrect++ : wpKanCorrect++;
                        }
                        if (type == 'vocabulary' || (type == 'radical' && item.kanavocab)) {
                            wpVocTotal++;
                            (failed) ? wpVocIncorrect++ : wpVocCorrect++;
                        }
                    }
                });
            });
        });

        for (let stage in correct) {
            let items = correct[stage];
            let num = items.length;

            // make sure this level isn't hidden
            if (num > 0) {
                let el = document.getElementById('correct').getElementsByClassName(stage)[0];
                let ul = el.lastElementChild;
                let countEl = el.firstElementChild.getElementsByTagName('strong')[0];
                countEl.innerText = parseInt(countEl.innerText) + num;

                for (let item of items) {
                    ul.insertAdjacentHTML('beforeend', buildItemHTML(item));
                }

                if (Array.from(el.classList).indexOf('active') === -1) {
                    el.classList.add('active');
                }
            }
        }

        correctEl.innerText = numCorrect + wpRadCorrect + wpKanCorrect + wpVocCorrect;

        for (let stage in incorrect) {
            let items = incorrect[stage];
            let num = items.length;

            // make sure this level isn't hidden
            if (num > 0) {
                let el = document.getElementById('incorrect').getElementsByClassName(stage)[0];
                let ul = el.lastElementChild;
                let countEl = el.firstElementChild.getElementsByTagName('strong')[0];
                countEl.innerText = parseInt(countEl.innerText) + num;

                for (let item of items) {
                    ul.insertAdjacentHTML('beforeend', buildItemHTML(item));
                }

                if (Array.from(el.classList).indexOf('active') === -1) {
                    el.classList.add('active');
                }
            }
        }

        incorrectEl.innerText = numIncorrect + wpRadIncorrect + wpKanIncorrect + wpVocIncorrect;

        if (wpRadCorrect > 0 || wpKanCorrect > 0 || wpVocCorrect > 0) {
            document.getElementById('correct').parentElement.style.display = 'block';
            document.getElementById('correct').style.display = 'block';
        }

        if (wpRadIncorrect > 0 || wpKanIncorrect > 0 || wpVocIncorrect > 0) {
            document.getElementById('incorrect').parentElement.style.display = 'block';
            document.getElementById('incorrect').style.display = 'block';
        }

        // finally update numbers
        let newRadTotal = wpRadTotal + radTotal;
        let newKanTotal = wpKanTotal + kanTotal;
        let newVocTotal = wpVocTotal + vocTotal;
        radTotalEl.innerText = newRadTotal;
        kanTotalEl.innerText = newKanTotal;
        vocTotalEl.innerText = newVocTotal;

        let newRadCorrect = wpRadCorrect + radCorrect;
        let newKanCorrect = wpKanCorrect + kanCorrect;
        let newVocCorrect = wpVocCorrect + vocCorrect;
        radCorrectEl.innerText = newRadCorrect;
        kanCorrectEl.innerText = newKanCorrect;
        vocCorrectEl.innerText = newVocCorrect;

        let newNumCorrect = numCorrect + wpRadCorrect + wpKanCorrect + wpVocCorrect;
        let newNumIncorrect = numIncorrect + wpRadIncorrect + wpKanIncorrect + wpVocIncorrect;
        percentCorrectEl.innerText = Math.round(newNumCorrect / (newNumCorrect + newNumIncorrect) * 100);
    }

    function buildItemHTML(item) {
        let type = ('kanavocab' in item) ? 'kanavocab' : item.category.toLowerCase();

        let html = `<li class="summary-statistics__item ${type == 'radical' ? 'radicals' : type} onhovertrigger" data-en="${item.en}" data-ja="${item.characters}">
            <a class="summary-statistics__item-link" lang="ja" href="https://waniplus.com/decks/${item.deckId}/item/${item.id}" target="_blank">${item.characters}</a>
            <div class="onhover hover down-arrow left-side" style="top: -50.5px; right: auto;"><ul><li>${item.en}</li><li>${item.characters}</li><li></li><li></li></ul></div>
            </li>`;
        return html;
    }

    function getStageAsStr(stage) {
        return {
            0: '',
            1: 'apprentice',
            2: 'apprentice',
            3: 'apprentice',
            4: 'apprentice',
            5: 'guru',
            6: 'guru',
            7: 'master',
            8: 'enlightened',
            9: 'burned'
        }[stage];
    }

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