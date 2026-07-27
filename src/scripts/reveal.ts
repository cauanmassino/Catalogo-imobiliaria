// Sistema de scroll-reveal usado em todas as páginas — evita duplicar a
// mesma lógica em cada arquivo .astro. Respeita "reduzir movimento".

function initReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll<HTMLElement>('.reveal');

  if (prefersReducedMotion) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.revealDelay ?? '0';
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
}

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  function onScroll() {
    header?.classList.toggle('is-scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMagneticButtons() {
  document.querySelectorAll<HTMLElement>('.magnetic-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

function initParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const els = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (els.length === 0) return;

  let ticking = false;
  function update() {
    const scrollY = window.scrollY;
    els.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.15');
      const offset = Math.min(scrollY * speed, 120);
      el.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

function init() {
  initReveal();
  initHeaderScroll();
  initMagneticButtons();
  initParallax();
}

// Roda no primeiro carregamento E depois de cada navegação via View Transitions
// (sem isso, os scripts só funcionariam na primeira página visitada)
document.addEventListener('astro:page-load', init);
