/* RysHub Theme Sync — shared dark/light theme across all pages */
(function () {
    'use strict';
    if (window.__ryshubThemeSyncLoaded) return;
    window.__ryshubThemeSyncLoaded = true;

    var KEY = 'ryshub-theme';
    var LEGACY_KEY = 'ryshubTheme';

    function getTheme() {
        var t = localStorage.getItem(KEY);
        if (t === 'dark' || t === 'light') return t;
        t = localStorage.getItem(LEGACY_KEY);
        if (t === 'dark' || t === 'light') return t;
        return 'dark';
    }

    function applyTheme(theme) {
        var html = document.documentElement;
        var body = document.body;

        // Primary system (global header / React plan)
        if (theme === 'dark') {
            html.classList.add('dark');
            if (body) body.classList.add('dark-mode');
        } else {
            html.classList.remove('dark');
            if (body) body.classList.remove('dark-mode');
        }

        // Legacy system (pages using body.light-theme)
        if (theme === 'light') {
            if (body) body.classList.add('light-theme');
            html.classList.add('light');
        } else {
            if (body) body.classList.remove('light-theme');
            html.classList.remove('light');
        }

        updateToggleIcons(theme);

        try {
            window.dispatchEvent(new CustomEvent('ryshub-theme-changed', { detail: { theme: theme } }));
        } catch (e) {}
    }

    function updateToggleIcons(theme) {
        // Global header toggle
        var ghBtn = document.getElementById('ryshub-theme-toggle');
        if (ghBtn) {
            ghBtn.innerHTML = theme === 'dark'
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        }

        // Font Awesome toggles (index.html, command-center, etc.)
        var faBtns = document.querySelectorAll('#themeToggleBtn, .theme-toggle-mini, [data-theme-toggle]');
        faBtns.forEach(function (btn) {
            var icon = btn.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
            var span = btn.querySelector('span');
            if (span && span.textContent.match(/dark|light/i)) {
                span.textContent = theme === 'dark' ? 'Dark' : 'Light';
            }
        });
    }

    function setTheme(theme) {
        localStorage.setItem(KEY, theme);
        localStorage.setItem(LEGACY_KEY, theme);
        applyTheme(theme);
    }

    function toggleTheme() {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    }

    // Cross-tab sync
    window.addEventListener('storage', function (e) {
        if (e.key === KEY || e.key === LEGACY_KEY) {
            applyTheme(getTheme());
        }
    });

    // Expose API
    window.RysHubTheme = {
        get: getTheme,
        set: setTheme,
        toggle: toggleTheme,
        apply: applyTheme
    };

    // Apply immediately if body exists, otherwise wait for DOM
    if (document.body) {
        applyTheme(getTheme());
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () { applyTheme(getTheme()); });
        } else {
            applyTheme(getTheme());
        }
    }
})();
