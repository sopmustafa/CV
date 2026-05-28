/* ============================================================
   SOP MUSTAFA — CV WEBSITE
   main.js — Shared interactions across CV & Cover Letter
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. LUCIDE ICONS — initialise after DOM ready
  ---------------------------------------------------------- */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ----------------------------------------------------------
     2. SCROLL-TRIGGERED FADE-IN
     Any element with class "fade-in" animates when it enters
     the viewport.
  ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach((el, i) => {
      // Stagger delay based on position in DOM
      el.style.transitionDelay = `${i * 0.07}s`;
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------
     3. LANGUAGE BAR ANIMATION
     Animate bars from 0 → target width when visible.
  ---------------------------------------------------------- */
  const langFills = document.querySelectorAll('.lang-fill');

  if (langFills.length > 0) {
    const langObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const width = target.getAttribute('data-width') || target.style.width;
            target.style.width = '0%';
            // small delay so CSS transition runs visibly
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                target.style.width = width;
              });
            });
            langObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.5 }
    );

    langFills.forEach((bar) => {
      const originalWidth = bar.style.width;
      bar.setAttribute('data-width', originalWidth);
      bar.style.width = '0%';
      langObserver.observe(bar);
    });
  }

  /* ----------------------------------------------------------
     4. ACTIVE NAV LINK HIGHLIGHT
     Marks the correct nav link as active based on current page.
  ---------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ----------------------------------------------------------
     5. HOVER TILT on project & achievement cards
     Subtle 3D tilt effect on desktop hover.
  ---------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.proj-card, .ach-grid-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ----------------------------------------------------------
     6. SMOOTH SCROLL for any in-page anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
