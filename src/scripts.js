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

    const projectPreview = document.querySelector('[data-project-preview]');
    if (projectPreview) {
        syncProjectPreview(projectPreview);
    }

    async function syncProjectPreview(projectPreview) {
        try {
            const response = await fetch('projects.html');
            if (!response.ok) return;

            const html = await response.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const projects = Array.from(doc.querySelectorAll('.projects-grid .project-card[id]'));

            if (!projects.length) return;

            projectPreview.replaceChildren(...projects.map((project, index) => {
                const card = document.createElement('article');
                card.className = 'project-card';

                const body = document.createElement('div');
                body.className = 'project-card-body';

                const topline = project.querySelector('.project-card-topline')?.cloneNode(true) || document.createElement('div');
                topline.className = 'project-card-topline';

                if (!topline.children.length) {
                    const number = document.createElement('span');
                    number.textContent = String(index + 1).padStart(2, '0');

                    const category = document.createElement('span');
                    category.textContent = 'Project';

                    topline.append(number, category);
                }

                const sourceTitle = project.querySelector('h3, h4');
                const title = document.createElement('h4');
                title.textContent = sourceTitle ? sourceTitle.textContent : 'Project';

                const sourceDescription = project.querySelector('p');
                const description = document.createElement('p');
                description.textContent = sourceDescription ? sourceDescription.textContent : '';

                const tags = project.querySelector('.tech-tags')?.cloneNode(true);
                const link = document.createElement('a');
                link.className = 'text-link';
                link.href = `projects.html#${project.id}`;
                link.textContent = 'View details';

                body.append(topline, title, description);
                if (tags) body.append(tags);
                body.append(link);
                card.append(body);

                return card;
            }));
        } catch {
            return;
        }
    }

});
