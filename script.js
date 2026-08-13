/* ---------------------------------------------------------
   PropEV — script.js
   Plain vanilla JS, no build step, no dependencies.
--------------------------------------------------------- */

// ---------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR THE CONTACT EMAIL.
// Change it here only — every mailto link and visible email
// address on the page is filled in from this one constant.
// (The email also appears once, statically, in the JSON-LD
// block near the top of index.html — update that too if you
// change this.)
// ---------------------------------------------------------------
const CONTACT_EMAIL = 'elliot@propev.co.in';

document.addEventListener('DOMContentLoaded', () => {
  // Fill in every mailto link/text from the single email constant above.
  document.querySelectorAll('.js-email-link').forEach((el) => {
    el.textContent = CONTACT_EMAIL;
    el.setAttribute('href', `mailto:${CONTACT_EMAIL}`);
  });

  // --- Sticky header shadow on scroll ---
  const header = document.querySelector('.site-header');
  const setScrolled = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 4);
  };
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  const closeNav = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after choosing a link, and on Escape.
  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  // --- Gentle scroll-reveal animation ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: no IntersectionObserver support — just show everything.
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
});
