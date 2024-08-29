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


    const container = document.getElementById('auto-scroll-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        e.preventDefault(); // Prevent default behavior to avoid text selection
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust the scroll speed for smoothness
        container.scrollLeft = scrollLeft - walk;
    });
});