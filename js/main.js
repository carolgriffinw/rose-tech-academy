/* ============================================================
   ROSE TECH ACADEMY — Main JavaScript
   ============================================================ */

// ---- Dark/Light Mode Toggle ----
(function () {
  const html = document.documentElement;
  const stored = null; // no localStorage in sandboxed iframes
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = prefersDark ? 'dark' : 'light';
  html.setAttribute('data-theme', currentTheme);

  function updateToggle() {
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(t => {
      t.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
      t.innerHTML = currentTheme === 'dark'
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateToggle();
    document.querySelectorAll('[data-theme-toggle]').forEach(t => {
      t.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', currentTheme);
        updateToggle();
      });
    });
  });
})();

// ---- Sticky Nav Scroll Behavior ----
(function () {
  let lastScroll = 0;
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > 80) {
      nav.classList.add('site-nav--scrolled');
    } else {
      nav.classList.remove('site-nav--scrolled');
    }
    if (curr > lastScroll && curr > 200) {
      nav.classList.add('site-nav--hidden');
    } else {
      nav.classList.remove('site-nav--hidden');
    }
    lastScroll = curr;
  }, { passive: true });
})();

// ---- Mobile Menu Toggle ----
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('is-open');
    document.body.classList.toggle('menu-open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });

  // Close on nav link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });
});

// ---- Scroll Reveal Animations ----
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.documentElement.classList.add('js-reveal-ready');
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
});

// ---- Newsletter Form ----
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('[data-newsletter-form]');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      if (!input || !input.value) return;

      const originalText = btn.textContent;
      btn.textContent = 'Subscribing…';
      btn.disabled = true;

      try {
        if (form.action.startsWith('mailto:')) {
          const recipient = form.action.replace('mailto:', '');
          const subject = encodeURIComponent('Newsletter Subscription');
          const body = encodeURIComponent(`Please subscribe this email address: ${input.value.trim()}`);
          window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
          btn.textContent = 'Open email app';
          btn.style.background = 'var(--color-success)';
          btn.style.color = '#fff';
        } else {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
          });

          if (response.ok) {
            btn.textContent = 'Subscribed!';
            btn.style.background = 'var(--color-success)';
            btn.style.color = '#fff';
            input.value = '';
          } else {
            btn.textContent = 'Try again';
            btn.disabled = false;
          }
        }
      } catch (err) {
        console.error('Newsletter form submission failed:', err);
        btn.textContent = 'Try again';
        btn.disabled = false;
      }

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
      }, 4000);
    });
  });
});

// ---- Active Nav Link ----
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && href === './') || href === './' + path) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});
