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
            // Primary strategy: derive repo root from current URL path.
            // Example: /ryshub/apps/books/library.html -> /ryshub/
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

            // Fallback: locate the injected script tag directly.
            var scriptEl = document.querySelector('script[src*="ryshub-global-header.js"]');
            if (scriptEl && scriptEl.src) {
                var su = new URL(scriptEl.src, window.location.href);
                var sidx = su.pathname.lastIndexOf('/assets/');
                if (sidx >= 0) {
                    return su.origin + su.pathname.slice(0, sidx + 1);
                }
                return su.origin + rootFromPathname(su.pathname);
            }

            // Final fallback: derive repo root from current page path.
            return window.location.origin + rootFromPathname(window.location.pathname);
        } catch (e) {
            // Fallback below
        }
        return window.location.origin + rootFromPathname(window.location.pathname);
    }

    function injectStyles() {
        if (document.getElementById('ryshub-global-header-style')) return;
        var style = document.createElement('style');
        style.id = 'ryshub-global-header-style';
        style.textContent = [
            '.ryshub-global-header {',
            '  position: fixed;',
            '  top: 0;',
            '  left: 0;',
            '  right: 0;',
            '  z-index: 12000;',
            '  height: 50px;',
            '  display: flex;',
            '  align-items: center;',
            '  justify-content: space-between;',
            '  gap: 10px;',
            '  padding: 8px 14px;',
            '  background: linear-gradient(90deg, rgba(2,6,23,0.96), rgba(15,23,42,0.96));',
            '  border-bottom: 1px solid rgba(148,163,184,0.28);',
            '  box-shadow: 0 8px 22px rgba(2,6,23,0.35);',
            '  backdrop-filter: blur(8px);',
            '  -webkit-backdrop-filter: blur(8px);',
            '}',
            '.ryshub-global-header a {',
            '  text-decoration: none;',
            '}',
            '.ryshub-gh-left {',
            '  display: flex;',
            '  align-items: center;',
            '  gap: 9px;',
            '  min-width: 0;',
            '}',
            '.ryshub-gh-badge {',
            '  width: 30px;',
            '  height: 30px;',
            '  border-radius: 8px;',
            '  display: inline-flex;',
            '  align-items: center;',
            '  justify-content: center;',
            '  background: linear-gradient(135deg, #2563eb, #1d4ed8);',
            '  color: #ffffff;',
            '  font-size: 15px;',
            '  font-weight: 800;',
            '  flex: 0 0 auto;',
            '}',
            '.ryshub-gh-title {',
            '  color: #e2e8f0;',
            '  font-size: 0.86rem;',
            '  font-weight: 800;',
            '  letter-spacing: 0.2px;',
            '  white-space: nowrap;',
            '  overflow: hidden;',
            '  text-overflow: ellipsis;',
            '}',
            '.ryshub-gh-actions {',
            '  display: inline-flex;',
            '  align-items: center;',
            '  gap: 7px;',
            '  flex: 0 0 auto;',
            '}',
            '.ryshub-gh-btn {',
            '  border: 1px solid rgba(148,163,184,0.35);',
            '  border-radius: 8px;',
            '  padding: 6px 10px;',
            '  color: #e2e8f0;',
            '  background: rgba(30,41,59,0.7);',
            '  font-size: 0.76rem;',
            '  font-weight: 700;',
            '  line-height: 1;',
            '  display: inline-flex;',
            '  align-items: center;',
            '}',
            '.ryshub-gh-btn:hover {',
            '  border-color: rgba(96,165,250,0.7);',
            '  color: #dbeafe;',
            '}',
            '@media (max-width: 520px) {',
            '  .ryshub-global-header { padding: 8px 10px; }',
            '  .ryshub-gh-title { font-size: 0.78rem; max-width: 130px; }',
            '  .ryshub-gh-btn { padding: 6px 8px; font-size: 0.72rem; }',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    }

    function insertHeader() {
        if (!document.body) return;
        if (document.querySelector('.ryshub-global-header')) return;

        var rootUrl = resolveRootUrl();
        var homeUrl = new URL('index.html', rootUrl).toString();
        var libraryUrl = new URL('apps/books/library.html', rootUrl).toString();

        var header = document.createElement('div');
        header.className = 'ryshub-global-header';
        header.innerHTML = '' +
            '<a class="ryshub-gh-left" href="' + homeUrl + '" aria-label="Go to RysHub Home">' +
                '<span class="ryshub-gh-badge">R</span>' +
                '<span class="ryshub-gh-title">RysHub Studio</span>' +
            '</a>' +
            '<div class="ryshub-gh-actions">' +
                '<a class="ryshub-gh-btn" href="' + homeUrl + '">Home</a>' +
                '<a class="ryshub-gh-btn" href="' + libraryUrl + '">Library</a>' +
            '</div>';

        document.body.insertBefore(header, document.body.firstChild);

        var currentPaddingTop = parseFloat(window.getComputedStyle(document.body).paddingTop || '0') || 0;
        document.body.style.paddingTop = (currentPaddingTop + 50) + 'px';
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
