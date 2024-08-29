document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'day';

    document.documentElement.setAttribute('data-theme', currentTheme);

    // Set the correct icon based on the current theme
    themeIcon.src = currentTheme === 'night' ? 'night-mode.png' : 'light-mode.png';

    toggleButton.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'night') {
            theme = 'day';
            themeIcon.src = 'light-mode.png';
        } else {
            theme = 'night';
            themeIcon.src = 'night-mode.png';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});