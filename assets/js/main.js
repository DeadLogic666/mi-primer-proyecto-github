// ======================================
// ANIMACIONES AL CARGAR LA PÁGINA
// ======================================

document.addEventListener('DOMContentLoaded', () => {
  animatePageLoad();
  setupIntersectionObserver();
  setupScrollEffects();
  setupInteractiveEffects();
  animateTextLetters();
});

// ======================================
// ANIMACIÓN DE TÍTULOS SIMPLIFICADA
// ======================================

function animateTextLetters() {
  // Los títulos ya tienen animaciones en CSS
  // Esta función ahora es un placeholder
}

// ======================================
// 2. ANIMACIONES DE CARGA INICIAL
// ======================================

function animatePageLoad() {
  // Animar navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.animation = 'slideInDown 0.6s ease-out forwards';
  }

  // Animar hero visual
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.style.animation = 'slideInRight 1s ease-out 0.4s forwards';
    heroVisual.style.opacity = '0';
  }

  // Animar dashboard cards
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  dashboardCards.forEach((card, index) => {
    card.style.animation = `fadeInUp 0.8s ease-out ${0.6 + index * 0.15}s forwards`;
    card.style.opacity = '0';
  });
}

// ======================================
// 3. OBSERVER PARA ANIMAR ELEMENTOS EN SCROLL
// ======================================

function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animar cards de salud - solo cuando sea visible
        if (entry.target.classList.contains('health-card')) {
          entry.target.classList.add('animate-on-scroll');
        }

        // Animar títulos de sección
        if (entry.target.classList.contains('section-title')) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
          entry.target.style.opacity = '1';
        }

        // Animar divisores
        if (entry.target.classList.contains('divider')) {
          entry.target.style.animation = 'slideInLeft 0.8s ease-out 0.2s forwards';
          entry.target.style.opacity = '1';
        }

        // Animar texto de salud
        if (entry.target.classList.contains('health-text')) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
          entry.target.style.opacity = '1';
        }

        // Animar about cards con cascada
        if (entry.target.classList.contains('about-card')) {
          const cards = document.querySelectorAll('.about-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.8s ease-out forwards`;
              card.style.opacity = '1';
            }, index * 100);
          });
        }

        // Animar speaker cards
        if (entry.target.classList.contains('speaker-card')) {
          const cards = document.querySelectorAll('.speaker-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInScale 0.8s ease-out forwards`;
              card.style.opacity = '1';
            }, index * 120);
          });
        }

        // Animar footer
        if (entry.target.classList.contains('footer')) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
          entry.target.style.opacity = '1';
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos
  document.querySelectorAll(
    '.health-card, .section-title, .divider, .health-text, .about-card, .speaker-card, .footer'
  ).forEach((el) => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ======================================
// 4. EFECTOS DE SCROLL
// ======================================

function setupScrollEffects() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Efecto de navbar on scroll con más intensidad
    if (scrollY > 30) {
      navbar.style.boxShadow = '0 15px 50px rgba(50, 222, 213, 0.15), 0 10px 40px rgba(0, 0, 0, 0.3)';
      navbar.style.backgroundColor = 'rgba(131, 42, 107, 0.98)';
      navbar.style.backdropFilter = 'blur(35px)';
    } else {
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      navbar.style.backgroundColor = 'rgba(131, 42, 107, 0.73)';
      navbar.style.backdropFilter = 'blur(25px)';
    }

    // Efecto parallax suave en hero
    const hero = document.querySelector('.hero');
    if (hero && scrollY < window.innerHeight) {
      hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }

    lastScrollY = scrollY;
  });
}

// ======================================
// 5. EFECTOS INTERACTIVOS
// ======================================

function setupInteractiveEffects() {
  // Efecto ripple en botones
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      btn.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Efecto glow en hover de cards
  document.querySelectorAll('.about-card, .speaker-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });

  // Animar números/contadores si existen
  animateCounters();

  // Efecto de animación en links
  document.querySelectorAll('a:not(.navbar a)').forEach((link) => {
    link.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.3s ease-out';
    });
  });
}

// ======================================
// 6. ANIMACIÓN DE CONTADORES
// ======================================

function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();

    const animate = (now) => {
      const progress = (now - start) / duration;
      if (progress < 1) {
        counter.textContent = Math.floor(target * progress);
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target;
      }
    };

    requestAnimationFrame(animate);
  });
}

// ======================================
// EFECTOS DE SCROLL EN NAVBAR LINKS
// ======================================

document.querySelectorAll('.navbar nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
