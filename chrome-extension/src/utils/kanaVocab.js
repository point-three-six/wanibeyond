
window.addEventListener('load', async function () {
    const style = document.createElement('style');
    style.textContent = '.kanavocab { background-color:orange; }';
    document.head.append(style);

    $.jStorage.listenKeyChange('l/currentLesson', function (key, action) {
        let item = $.jStorage.get('l/currentLesson');
        if (item.kanavocab) {
            setTimeout(function () {
                document.getElementById('main-info').classList.remove('radical');
                document.getElementById('main-info').classList.add('kanavocab');
            }, 5);
        }
    });
    $.jStorage.listenKeyChange('l/currentQuizItem', function (key, action) {
        let item = $.jStorage.get('l/currentQuizItem');
        if (item.kanavocab) {
            setTimeout(function () {
                document.getElementById('main-info').classList.remove('radical');
                document.getElementById('main-info').classList.add('kanavocab');
            }, 5);
        }
    });
});