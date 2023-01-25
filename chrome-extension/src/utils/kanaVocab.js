
window.addEventListener('load', async function () {
    // create custom orange style for kanavocab
    const style = document.createElement('style');
    style.textContent = '.kanavocab { background-color:orange; }';
    document.head.append(style);

    let item;
    let obsv = new MutationObserver(changeLessonHTML);

    $.jStorage.listenKeyChange('l/currentLesson', function (key, action) {
        item = $.jStorage.get('l/currentLesson');
        if (item.kanavocab) {
            setTimeout(function () {
                changeBackground();
                updateItemCountColors(true);
                updateLessonNav();
                changeLessonHTML();
                let target = document.getElementById('supplement-rad');
                obsv.observe(target, { attributes: true, childList: true, subtree: false });
            }, 15);
        } else if (obsv) {
            updateItemCountColors(false);
            obsv.disconnect();
        }

        changeButtonListBackgrounds();
    });

    $.jStorage.listenKeyChange('l/currentQuizItem', function (key, action) {
        item = $.jStorage.get('l/currentQuizItem');
        if (item.kanavocab) {
            setTimeout(function () {
                changeBackground();
                updateItemCountColors(true);
                changeQuizHTML();
            }, 15);
        } else {
            updateItemCountColors(false);
        }

        changeButtonListBackgrounds();
    });

    async function updateLessonNav() {
        let el = document.getElementById('supplement-nav').getElementsByTagName('ul')[0];
        el.appendChild(el.firstElementChild);

        let liList = el.getElementsByTagName('li');
        liList.forEach(li => {
            li.classList.remove('active');
            if (li.innerText.toLowerCase() == 'examples') {
                li.innerText = 'Kanji Composition';
                li.classList.add('active');
                li.click();
            } else if (li.innerText.toLowerCase() == 'name') {
                li.innerText = 'Meaning';
            }
        });

        return true;
    }

    function getLessonActiveTab() {
        try {
            let li = document.getElementById('supplement-nav').children[0].getElementsByClassName('active')[0];
            return li.innerText.toLowerCase();
        } catch (e) {
            return false;
        }
    }

    function changeLessonHTML() {
        let curTab = getLessonActiveTab();
        if (!curTab) return;

        if (curTab == 'name' || curTab == 'meaning') {
            let children = document.getElementById('supplement-rad-name').getElementsByTagName('h2');
            children[0].innerText = 'Meaning Explanation';
            children[1].innerText = 'Meaning Notes';
        } else if (curTab == 'examples' || curTab == 'kanji composition') {
            let numKanji = item.kanji.length;
            let el = document.getElementById('supplement-rad-related-kanji');
            el.getElementsByTagName('h2')[0].innerText = 'Kanji Composition';
            el.getElementsByTagName('p')[0].innerText = `The vocabulary is composed of ${mapNumbersToText(numKanji)} kanji.`;

            if (numKanji > 0) {
                el.getElementsByClassName('col1')[0].innerHTML += `<p>Does the combination of the kanji meanings somewhat relate to the vocabulary meaning?</p>
                <p>Based on the kanji composition, can you guess the reading of the vocabulary?</p>`;
            }
        }
    }

    function changeQuizHTML() {
        document.getElementById('question-type').innerText = 'Vocabulary <strong>Meaning</strong>';
    }

    function changeBackground() {
        document.getElementById('main-info').classList.remove('radical');
        document.getElementById('main-info').classList.add('kanavocab');
    }

    function updateItemCountColors(isKanaVocab) {
        let spans = document.getElementById('stats').getElementsByTagName('span');
        spans.forEach(span => {
            if (isKanaVocab) {
                span.style.color = 'orange';
            } else {
                span.removeAttribute('style');
            }
        });
    }

    function changeButtonListBackgrounds() {
        let el = document.getElementById('lesson').lastElementChild;
        let bttns = el.getElementsByTagName('button');
        let items = $.jStorage.get('l/activeQueue');
        let map = {};
        items.forEach(item => map[item.characters.toLowerCase()] = item.kanavocab);

        bttns.forEach(btn => {
            let chars = btn.innerText.toLowerCase();
            // is kanavocab?
            if (map[chars]) {
                btn.classList.remove('radical');
                btn.classList.add('kanavocab');
            }
        });
    }

    function mapNumbersToText(num) {
        return {
            0: 'zero',
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven',
            8: 'eight',
            9: 'nine',
            10: 'ten'
        }[num] || num;
    }
});