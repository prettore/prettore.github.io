(() => {
  'use strict';
  const reveal = window.Reveal;
  if (!reveal) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  reveal.initialize({
    hash: true,
    slideNumber: 'c/t',
    transition: reducedMotion ? 'none' : 'slide',
    controls: true,
    progress: true,
    width: 1024,
    height: 768,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 1.0,
    center: false,
    keyboard: true,
    touch: true,
    overview: true,
    help: true,
    embedded: false
  });

  const menu = document.querySelector('.menu-list');
  const menuToggle = document.querySelector('[data-slide-action="menu"]');
  const sections = Array.from(document.querySelectorAll('.reveal .slides > section'));
  if (menu && menuToggle) {
    sections.forEach((section, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${index + 1}. ${section.dataset.title || 'Slide'}`;
      button.addEventListener('click', () => {
        reveal.slide(index);
        menu.hidden = true;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      });
      menu.appendChild(button);
    });
    menuToggle.addEventListener('click', () => {
      menu.hidden = !menu.hidden;
      menuToggle.setAttribute('aria-expanded', String(!menu.hidden));
    });
    document.addEventListener('click', (event) => {
      if (!menu.hidden && !event.target.closest('.slide-toolbar')) {
        menu.hidden = true;
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  document.querySelector('[data-slide-action="overview"]')?.addEventListener('click', () => reveal.toggleOverview());
  document.querySelector('[data-slide-action="fullscreen"]')?.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (error) {
      // Tela cheia pode ser bloqueada pelo iframe; a navegação continua disponível.
      reveal.toggleOverview(false);
    }
  });
  const updateMenu = () => {
    if (!menu) return;
    Array.from(menu.children).forEach((button, index) => {
      if (index === reveal.getIndices().h) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  };
  reveal.on('ready', updateMenu);
  reveal.on('slidechanged', () => {
    updateMenu();
    document.dispatchEvent(new Event('ia:pause-visualizers'));
  });
  // O toolbar original de zoom é criado em DOMContentLoaded: proteger depois.
  const protectInteractiveControls = () => {
    document.querySelectorAll('details, .ia-visualizer, .slide-toolbar, .code-zoom-controls').forEach((element) => {
      element.addEventListener('keydown', (event) => {
        if ([' ', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(event.key)) event.stopPropagation();
      });
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', protectInteractiveControls, { once: true });
  } else protectInteractiveControls();
})();
