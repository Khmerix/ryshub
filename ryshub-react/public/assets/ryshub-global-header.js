(function () {
    if (window.__ryshubGlobalHeaderLoaded) return;
    window.__ryshubGlobalHeaderLoaded = true;

    function isEmbeddedView() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    function resolveRootUrl() {
        function rootFromPathname(pathname) {
            if (!pathname) return '/';
            var marker = '/apps/';
            var i = pathname.indexOf(marker);
            if (i >= 0) return pathname.slice(0, i + 1);
            var lastSlash = pathname.lastIndexOf('/');
            return lastSlash >= 0 ? pathname.slice(0, lastSlash + 1) : '/';
        }

        try {
            var byLocation = rootFromPathname(window.location.pathname);
            if (byLocation && byLocation !== '/') {
                return window.location.origin + byLocation;
            }

            var script = document.currentScript;
            if (script && script.src) {
                var u = new URL(script.src, window.location.href);
                var marker = '/assets/';
                var idx = u.pathname.lastIndexOf(marker);
                if (idx >= 0) {
                    return u.origin + u.pathname.slice(0, idx + 1);
                }
            }

            var scriptEl = document.querySelector('script[src*="ryshub-global-header.js"]');
            if (scriptEl && scriptEl.src) {
                var su = new URL(scriptEl.src, window.location.href);
                var sidx = su.pathname.lastIndexOf('/assets/');
                if (sidx >= 0) {
                    return su.origin + su.pathname.slice(0, sidx + 1);
                }
                return su.origin + rootFromPathname(su.pathname);
            }

            return window.location.origin + rootFromPathname(window.location.pathname);
        } catch (e) {
            return window.location.origin + rootFromPathname(window.location.pathname);
        }
    }

    var rootUrl = resolveRootUrl();

    /* ─── Theme handling (syncs with React ThemeContext) ─── */
    function applyTheme(theme) {
        var html = document.documentElement;
        var body = document.body;
        if (theme === 'dark') {
            html.classList.add('dark');
            if (body) body.classList.add('dark-mode');
        } else {
            html.classList.remove('dark');
            if (body) body.classList.remove('dark-mode');
        }
    }

    function getSavedTheme() {
        return localStorage.getItem('ryshub-theme') || 'light';
    }

    function toggleTheme() {
        var next = getSavedTheme() === 'dark' ? 'light' : 'dark';
        localStorage.setItem('ryshub-theme', next);
        applyTheme(next);
        updateToggleIcon(next);
    }

    function updateToggleIcon(theme) {
        var btn = document.getElementById('ryshub-theme-toggle');
        if (!btn) return;
        btn.innerHTML = theme === 'dark'
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }

    // Apply theme immediately (before DOM is ready)
    applyTheme(getSavedTheme());

    // Listen for changes from other tabs / React app
    window.addEventListener('storage', function (e) {
        if (e.key === 'ryshub-theme') {
            applyTheme(e.newValue || 'light');
            updateToggleIcon(e.newValue || 'light');
        }
    });

    /* ─── Styles ─── */
    function injectStyles() {
        if (document.getElementById('ryshub-global-header-style')) return;

        // Inject theme CSS
        if (!document.getElementById('ryshub-theme-css')) {
            var themeLink = document.createElement('link');
            themeLink.id = 'ryshub-theme-css';
            themeLink.rel = 'stylesheet';
            themeLink.href = rootUrl + 'assets/ryshub-theme.css';
            document.head.appendChild(themeLink);
        }

        document.body.classList.add('ryshub-themed');

        var style = document.createElement('style');
        style.id = 'ryshub-global-header-style';
        style.textContent = [
            '.ryshub-global-header {',
            '  position: fixed;',
            '  top: 0; left: 0; right: 0;',
            '  z-index: 12000;',
            '  height: 56px;',
            '  display: flex;',
            '  align-items: center;',
            '  justify-content: space-between;',
            '  gap: 10px;',
            '  padding: 0 16px;',
            '  background: linear-gradient(90deg, rgba(2,6,23,0.96), rgba(15,23,42,0.96));',
            '  border-bottom: 1px solid rgba(148,163,184,0.28);',
            '  box-shadow: 0 8px 22px rgba(2,6,23,0.35);',
            '  backdrop-filter: blur(12px);',
            '  -webkit-backdrop-filter: blur(12px);',
            '}',
            '.ryshub-global-header a { text-decoration: none; }',
            '.ryshub-gh-left {',
            '  display: flex; align-items: center; gap: 10px;',
            '  min-width: 0; flex-shrink: 0;',
            '}',
            '.ryshub-gh-badge {',
            '  width: 32px; height: 32px; border-radius: 9px;',
            '  display: inline-flex; align-items: center; justify-content: center;',
            '  background: linear-gradient(135deg, #2563eb, #1d4ed8);',
            '  color: #fff; font-size: 15px; font-weight: 800;',
            '  flex: 0 0 auto;',
            '}',
            '.ryshub-gh-title {',
            '  color: #e2e8f0; font-size: 0.92rem; font-weight: 800;',
            '  letter-spacing: 0.2px; white-space: nowrap;',
            '  overflow: hidden; text-overflow: ellipsis;',
            '}',
            '.ryshub-gh-nav {',
            '  display: flex; align-items: center; gap: 6px;',
            '  overflow-x: auto; scrollbar-width: none;',
            '  -ms-overflow-style: none;',
            '  mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);',
            '  -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);',
            '  padding: 2px 4px;',
            '}',
            '.ryshub-gh-nav::-webkit-scrollbar { display: none; }',
            '.ryshub-gh-btn {',
            '  border: 1px solid rgba(148,163,184,0.35);',
            '  border-radius: 999px;',
            '  padding: 6px 12px;',
            '  color: #e2e8f0;',
            '  background: rgba(30,41,59,0.7);',
            '  font-size: 0.78rem; font-weight: 600;',
            '  line-height: 1;',
            '  display: inline-flex; align-items: center; gap: 5px;',
            '  white-space: nowrap;',
            '  flex-shrink: 0;',
            '  transition: all 0.2s ease;',
            '}',
            '.ryshub-gh-btn:hover {',
            '  border-color: rgba(96,165,250,0.7);',
            '  color: #dbeafe;',
            '  background: rgba(30,41,59,0.9);',
            '}',
            '.ryshub-gh-btn.active {',
            '  background: rgba(37,99,235,0.25);',
            '  border-color: rgba(96,165,250,0.5);',
            '  color: #93c5fd;',
            '}',
            '.ryshub-gh-toggle {',
            '  width: 32px; height: 32px; border-radius: 999px;',
            '  display: inline-flex; align-items: center; justify-content: center;',
            '  border: 1px solid rgba(148,163,184,0.35);',
            '  background: rgba(30,41,59,0.7);',
            '  color: #e2e8f0;',
            '  cursor: pointer;',
            '  flex-shrink: 0;',
            '  transition: all 0.2s ease;',
            '}',
            '.ryshub-gh-toggle:hover {',
            '  border-color: rgba(96,165,250,0.7);',
            '  color: #dbeafe;',
            '}',
            '@media (max-width: 520px) {',
            '  .ryshub-global-header { padding: 0 10px; }',
            '  .ryshub-gh-title { font-size: 0.8rem; max-width: 100px; }',
            '  .ryshub-gh-btn { padding: 5px 8px; font-size: 0.7rem; }',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    }

    /* ─── Header DOM ─── */
    function insertHeader() {
        if (!document.body) return;
        if (document.querySelector('.ryshub-global-header')) return;

        var navItems = [
            { label: 'Home', href: rootUrl + '#/' },
            { label: 'TOEFL', href: rootUrl + '#/toefl' },
            { label: 'Books', href: rootUrl + '#/books' },
            { label: 'Games', href: rootUrl + '#/games' },
            { label: 'Timer', href: rootUrl + '#/timer' },
        ];

        // Determine which nav item is "active" based on current page
        var currentPath = window.location.pathname;
        var currentHash = window.location.hash;

        var header = document.createElement('div');
        header.className = 'ryshub-global-header';

        var navHtml = navItems.map(function (item) {
            var isActive = false;
            if (item.href.indexOf('#/') > -1) {
                var route = item.href.split('#/')[1];
                isActive = currentHash === '#/' + route;
            }
            var cls = isActive ? 'ryshub-gh-btn active' : 'ryshub-gh-btn';
            return '<a class="' + cls + '" href="' + item.href + '">' + item.label + '</a>';
        }).join('');

        header.innerHTML = '' +
            '<a class="ryshub-gh-left" href="' + rootUrl + '#/" aria-label="Go to RysHub Home">' +
                '<span class="ryshub-gh-badge">R</span>' +
                '<span class="ryshub-gh-title">RysHub</span>' +
            '</a>' +
            '<nav class="ryshub-gh-nav">' + navHtml + '</nav>' +
            '<button id="ryshub-theme-toggle" class="ryshub-gh-toggle" title="Toggle theme" aria-label="Toggle dark mode">' +
            '</button>';

        document.body.insertBefore(header, document.body.firstChild);

        // Theme toggle handler
        document.getElementById('ryshub-theme-toggle').addEventListener('click', toggleTheme);
        updateToggleIcon(getSavedTheme());

        // Push body content down
        var currentPaddingTop = parseFloat(window.getComputedStyle(document.body).paddingTop || '0') || 0;
        document.body.style.paddingTop = (currentPaddingTop + 56) + 'px';
        document.body.classList.add('ryshub-has-global-header');
    }

    if (isEmbeddedView()) return;

    injectStyles();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertHeader);
    } else {
        insertHeader();
    }
})();
