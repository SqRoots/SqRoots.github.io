// Display-only access gate for a static site. Assets remain publicly accessible.
(() => {
  'use strict';
  const base = new URL('../', document.currentScript.src);
  const loginUrl = new URL('login.html', base);
  const storageKey = 'operations-access:' + base.pathname;
  const isLogin = document.documentElement.dataset.page === 'login';
  function day() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return values.year + values.month + values.day;
  }
  function hasAccess() {
    try { return sessionStorage.getItem(storageKey) === day(); }
    catch (_) { return false; }
  }
  function clearAccess() {
    try { sessionStorage.removeItem(storageKey); } catch (_) {}
  }
  function redirectToLogin() {
    document.documentElement.style.visibility = 'hidden';
    const target = new URL(loginUrl);
    target.searchParams.set('next', location.pathname + location.search + location.hash);
    location.replace(target.href);
  }
  function guard() {
    if (!isLogin && !hasAccess()) {
      clearAccess();
      redirectToLogin();
      return false;
    }
    return true;
  }
  function destination() {
    const next = new URL(location.href).searchParams.get('next');
    if (next) {
      try {
        const target = new URL(next, base);
        const relative = target.pathname.slice(base.pathname.length);
        // Restrict redirects to pages inside this site, excluding the login page.
        if (target.origin === base.origin && target.pathname.startsWith(base.pathname)
            && !/^(login(?:\.html)?\/?|assets\/)/.test(relative)
            && (target.pathname.endsWith('/') || target.pathname.endsWith('.html'))) {
          return target.href;
        }
      } catch (_) {}
    }
    return base.href;
  }
  guard();
  document.addEventListener('DOMContentLoaded', () => {
    if (isLogin) {
      const form = document.getElementById('login-form');
      const password = document.getElementById('password');
      const error = document.getElementById('login-error');
      function showError(message) {
        error.textContent = message;
        error.hidden = false;
        password.setAttribute('aria-invalid', 'true');
        password.focus();
      }
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (password.value !== 'lx' + day()) {
          showError('密码不正确或已过期，请重新输入。');
          return;
        }
        try { sessionStorage.setItem(storageKey, day()); }
        catch (_) {
          showError('请允许浏览器使用会话存储后重试。');
          return;
        }
        password.value = '';
        location.replace(destination());
      });
      password.addEventListener('input', () => {
        error.hidden = true;
        password.removeAttribute('aria-invalid');
      });
    }
    document.querySelectorAll('[data-logout]').forEach(button => {
      button.addEventListener('click', () => {
        clearAccess();
        location.replace(loginUrl.href);
      });
    });
  });
  addEventListener('pageshow', guard);
  addEventListener('focus', guard);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) guard();
  });
  setInterval(guard, 30000);
})();
