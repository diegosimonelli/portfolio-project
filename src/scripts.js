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
    let scrollAmount = 0;

    function autoScroll() {
        scrollAmount += 1; // Adjust this value to control the scroll speed
        container.scrollLeft = scrollAmount;
        
        // Reset scroll position if reached the end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            scrollAmount = 0;
        }
    }

    let autoScrollInterval = setInterval(autoScroll, 20); // Adjust interval to control the speed

    // Pause auto-scroll on user interaction
    container.addEventListener('mouseover', () => {
        clearInterval(autoScrollInterval);
    });

    // Resume auto-scroll when the user stops interacting
    container.addEventListener('mouseout', () => {
        autoScrollInterval = setInterval(autoScroll, 20); // Restart scrolling with the same interval
    });

    console.log('Current Scroll Position:', container.scrollLeft);
    console.log('Scroll Width:', container.scrollWidth);
    console.log('Client Width:', container.clientWidth);
});