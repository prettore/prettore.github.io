/* Controles próprios de Banco de Dados: zoom e navegação. */
(() => {
  'use strict';

  let codeZoom = 16;
  const MIN_CODE_ZOOM = 12;
  const MAX_CODE_ZOOM = 30;
  const STEP = 2;

  function adjustCodeZoom(delta) {
    codeZoom = Math.max(MIN_CODE_ZOOM, Math.min(MAX_CODE_ZOOM, codeZoom + delta));
    document.querySelectorAll('.reveal pre').forEach((block) => {
      block.style.setProperty('font-size', `${codeZoom}px`, 'important');
    });
    if (window.Reveal && typeof window.Reveal.layout === 'function') window.Reveal.layout();
  }

  function setup() {
    if (document.querySelector('.code-zoom-controls')) return;

    const style = document.createElement('style');
    style.id = 'db-code-zoom-style';
    style.textContent = `
      .code-zoom-controls {
        position: fixed; left: 18px; bottom: 14px; z-index: 1000;
        display: flex; gap: 7px; align-items: center;
      }
      .code-zoom-controls button {
        min-width: 48px; min-height: 42px; padding: 4px 8px;
        border: 2px solid #003366; border-radius: 6px;
        background: #fff; color: #003366;
        font: 700 21px/1 'Segoe UI', Arial, sans-serif; cursor: pointer;
      }
      .code-zoom-controls button:hover,
      .code-zoom-controls button:focus-visible {
        background: #e7f3ff; outline: 3px solid #008B45; outline-offset: 2px;
      }
      @media (max-width: 768px) {
        .code-zoom-controls { left: 10px; bottom: 10px; }
        .code-zoom-controls button { min-width: 42px; min-height: 38px; font-size: 18px; }
      }
    `;
    document.head.appendChild(style);

    const toolbar = document.createElement('div');
    toolbar.className = 'code-zoom-controls';
    toolbar.setAttribute('role', 'group');
    toolbar.setAttribute('aria-label', 'Ajustar tamanho dos códigos');

    const smaller = document.createElement('button');
    smaller.type = 'button';
    smaller.textContent = 'A−';
    smaller.title = 'Diminuir tamanho do código';
    smaller.setAttribute('aria-label', 'Diminuir tamanho do código');
    smaller.addEventListener('click', () => adjustCodeZoom(-STEP));

    const larger = document.createElement('button');
    larger.type = 'button';
    larger.textContent = 'A+';
    larger.title = 'Aumentar tamanho do código';
    larger.setAttribute('aria-label', 'Aumentar tamanho do código');
    larger.addEventListener('click', () => adjustCodeZoom(STEP));

    toolbar.append(smaller, larger);
    document.body.appendChild(toolbar);
  }

  window.adjustCodeZoom = adjustCodeZoom;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();

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
      // O iframe pode bloquear a API. Preservar o slide e o modo atuais.
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
  });
  // O toolbar original de zoom é criado em DOMContentLoaded: proteger depois.
  const protectInteractiveControls = () => {
    document.querySelectorAll('details, .slide-toolbar, .code-zoom-controls').forEach((element) => {
      element.addEventListener('keydown', (event) => {
        if ([' ', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(event.key)) event.stopPropagation();
      });
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', protectInteractiveControls, { once: true });
  } else protectInteractiveControls();
})();
