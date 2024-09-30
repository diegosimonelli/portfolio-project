document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Function to apply the theme
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        themeIcon.src = theme === 'night' ? 'night-mode.png' : 'light-mode.png';
        localStorage.setItem('theme', theme);
    }

    // Detect stored theme or system preference
    const storedTheme = localStorage.getItem('theme');
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set theme based on stored preference or system preference
    if (storedTheme) {
        applyTheme(storedTheme);
    } else if (userPrefersDark) {
        applyTheme('night');
    } else {
        applyTheme('day');
    }

    // Add event listener for the toggle button
    toggleButton.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'night') {
            applyTheme('day');
        } else {
            applyTheme('night');
        }
    });

    // Listen for system theme changes and adjust accordingly
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const newColorScheme = e.matches ? 'night' : 'day';
        const storedTheme = localStorage.getItem('theme');

        // Only change the theme automatically if the user hasn't manually set it
        if (!storedTheme) {
            applyTheme(newColorScheme);
        }
    });

    // Auto-scroll container functionality (unchanged)
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
        const walk = (x - startX) * 4.5; // Adjust the scroll speed for smoothness
        container.scrollLeft = scrollLeft - walk;
    });
});
