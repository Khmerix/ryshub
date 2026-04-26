/**
 * RysHub Client-Side Authentication Utilities
 *
 * IMPORTANT: Client-side authentication is inherently limited. A determined
 * attacker with browser DevTools can always bypass it. These utilities raise
 * the bar above trivial boolean flags and plaintext passwords, but for
 * production-grade security you MUST implement server-side session validation.
 *
 * Usage:
 *   <script src="../assets/ryshub-auth.js"></script>
 *   if (RysHubAuth.check()) { ... }
 */
(function() {
    'use strict';

    if (window.RysHubAuth) return;

    var AUTH_SALT = 'Ry$Hub_S3cur3_S4lt_v2026';
    var TOKEN_VERSION = 'v1';
    var TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

    /**
     * Simple non-cryptographic hash for client-side obfuscation.
     * Do NOT use this for real security — it only prevents casual bypass.
     */
    function hashString(input) {
        var hash = 5381;
        for (var i = 0; i < input.length; i++) {
            hash = ((hash << 5) + hash) + input.charCodeAt(i);
            hash = hash | 0; // Force 32-bit signed int
        }
        // Convert to unsigned hex, pad to 16 chars
        return ('0000000000000000' + ((hash >>> 0).toString(16))).slice(-16);
    }

    function createToken(username) {
        var t = Date.now();
        var sig = hashString(TOKEN_VERSION + '|' + username + '|' + t + '|' + AUTH_SALT);
        return btoa(TOKEN_VERSION + '|' + username + '|' + t + '|' + sig);
    }

    function validateToken(token) {
        if (!token || typeof token !== 'string') return false;
        try {
            var parts = atob(token).split('|');
            if (parts.length !== 4 || parts[0] !== TOKEN_VERSION) return false;
            var username = parts[1];
            var t = parseInt(parts[2], 10);
            var sig = parts[3];
            if (isNaN(t) || Date.now() - t > TOKEN_MAX_AGE_MS) return false;
            return hashString(TOKEN_VERSION + '|' + username + '|' + t + '|' + AUTH_SALT) === sig;
        } catch (e) {
            return false;
        }
    }

    function checkAuth() {
        return validateToken(localStorage.getItem('ryshub_auth_token')) ||
               validateToken(sessionStorage.getItem('ryshub_auth_token'));
    }

    function setAuthToken(username, persist) {
        var token = createToken(username);
        sessionStorage.setItem('ryshub_auth_token', token);
        if (persist) localStorage.setItem('ryshub_auth_token', token);
    }

    function clearAuth() {
        localStorage.removeItem('ryshub_auth_token');
        sessionStorage.removeItem('ryshub_auth_token');
        // Clean up legacy flags so old code doesn't get confused
        localStorage.removeItem('ryshub_loggedIn');
        sessionStorage.removeItem('ryshub_loggedIn');
        localStorage.removeItem('ryshub_master_access');
        sessionStorage.removeItem('ryshub_master_access');
        localStorage.removeItem('ryshub_role');
        sessionStorage.removeItem('ryshub_role');
        localStorage.removeItem('ryshubTeacherProfile');
        sessionStorage.removeItem('ryshubTeacherProfile');
        localStorage.removeItem('ryshubCurrentTeacherEmail');
        sessionStorage.removeItem('ryshubCurrentTeacherEmail');
        localStorage.removeItem('teacherLoggedIn');
        localStorage.removeItem('teacherUsername');
        localStorage.removeItem('loginTime');
    }

    /**
     * Validate a username/password against a precomputed hash.
     * Expected format: hashString(username + ':' + password + ':' + AUTH_SALT)
     */
    function verifyCredentials(username, password, expectedHash) {
        return hashString(username + ':' + password + ':' + AUTH_SALT) === expectedHash;
    }

    /**
     * Backward-compatible check: also considers legacy boolean flags as a
     * fallback during transition, but prefers the secure token.
     */
    function checkAuthCompat() {
        if (checkAuth()) return true;
        // Legacy fallback — remove this after all pages are migrated
        return localStorage.getItem('ryshub_master_access') === 'true' ||
               sessionStorage.getItem('ryshub_master_access') === 'true' ||
               localStorage.getItem('ryshub_loggedIn') === 'true' ||
               sessionStorage.getItem('ryshub_loggedIn') === 'true' ||
               localStorage.getItem('teacherLoggedIn') === 'true';
    }

    window.RysHubAuth = {
        check: checkAuth,
        checkCompat: checkAuthCompat,
        set: setAuthToken,
        clear: clearAuth,
        validate: validateToken,
        hash: hashString,
        verify: verifyCredentials
    };
})();
