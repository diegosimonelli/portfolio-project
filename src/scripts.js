document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'day';

    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleButton.textContent = currentTheme === 'night' ? '🌜' : '🌞';

    toggleButton.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'night') {
            theme = 'day';
            toggleButton.textContent = '🌞';
        } else {
            theme = 'night';
            toggleButton.textContent = '🌜';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});
