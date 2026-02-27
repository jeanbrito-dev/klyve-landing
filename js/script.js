/* ============================================
   KLYVE — script.js
   Interações, scroll-reveal, animações
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR: scroll effect ─── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── NAVBAR: mobile menu drawer ─── */
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');
  const overlay     = document.querySelector('.menu-overlay');
  const menuClose   = document.querySelector('.menu-close');

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    overlay.classList.add('visible');
    // micro delay para a transição de opacidade funcionar
    requestAnimationFrame(() => overlay.classList.add('active'));
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    // remove display após a transição
    overlay.addEventListener('transitionend', () => {
      if (!overlay.classList.contains('active')) {
        overlay.classList.remove('visible');
      }
    }, { once: true });
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (overlay)   overlay.addEventListener('click', closeMenu);

    // Fecha ao clicar em qualquer link dentro do menu
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── BARRAS DO GRÁFICO: animar na entrada ─── */
  const bars = document.querySelectorAll('.bar');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.3 });

  bars.forEach((bar, i) => {
    bar.style.animationDelay = `${i * 0.06}s`;
    bar.style.animationPlayState = 'paused';
    barObserver.observe(bar);
  });

  /* ─── PROGRESS BARS: animar na entrada ─── */
  const progressFills = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = fill.dataset.width || '0%';
        setTimeout(() => { fill.style.width = target; }, 200);
        progressObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  progressFills.forEach(fill => {
    fill.style.width = '0%';
    progressObserver.observe(fill);
  });

  /* ─── CONTADORES NUMÉRICOS ─── */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = target * eased;

          el.textContent = prefix + (
            Number.isInteger(target)
              ? Math.floor(current)
              : current.toFixed(1)
          ) + suffix;

          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = prefix + target + suffix;
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ─── SMOOTH SCROLL para links internos ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ─── HOVER nas cards de features ─── */
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s';
    });
  });

  /* ─── Animação de entrada dos TX items ─── */
  const txItems = document.querySelectorAll('.tx-item');
  txItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(10px)';
    item.style.transition = `opacity 0.4s ease ${0.4 + i * 0.1}s, transform 0.4s ease ${0.4 + i * 0.1}s`;
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 300 + i * 100);
  });

  /* ─── WhatsApp link builder ─── */
  const phone = '5512982942731';
  const message = encodeURIComponent('Olá! Tenho interesse no Klyve. Pode me contar mais?');
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  document.querySelectorAll('[data-wa]').forEach(el => {
    el.href = waUrl;
    if (!el.getAttribute('target')) el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  /* ─── Micro-interação: botões de CTA ─── */
  document.querySelectorAll('.btn-primary, .main-cta-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'scale(0.97)';
    });
    btn.addEventListener('mouseup', () => {
      btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ─── Floating chips: pequeno delay para entrada ─── */
  document.querySelectorAll('.floating-chip').forEach((chip, i) => {
    chip.style.opacity = '0';
    chip.style.transition = `opacity 0.5s ease ${0.8 + i * 0.2}s`;
    setTimeout(() => { chip.style.opacity = '1'; }, 100);
  });

});