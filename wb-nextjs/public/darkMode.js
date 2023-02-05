(() => {
    let userTheme = localStorage.getItem('theme') || 'light';

    if (userTheme == 'dark') {
        document.documentElement.classList.add('dark');
    }
})();