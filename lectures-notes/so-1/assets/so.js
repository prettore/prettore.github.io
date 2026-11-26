/* Ajustes de código: executado antes do visualizador e da navegação. */
(() => {
  'use strict';

  let codeZoom;
  const MIN_CODE_ZOOM = 12;
  const MAX_CODE_ZOOM = 30;
  const STEP = 2;

  function adjustCodeZoom(delta) {
    if (codeZoom === undefined) {
      const firstBlock = document.querySelector('.reveal pre');
      const initialSize = firstBlock ? parseFloat(window.getComputedStyle(firstBlock).fontSize) : 16;
      codeZoom = Number.isFinite(initialSize) ? initialSize : 16;
    }
    codeZoom = Math.max(MIN_CODE_ZOOM, Math.min(MAX_CODE_ZOOM, codeZoom + delta));
    document.querySelectorAll('.reveal pre').forEach((block) => {
      block.style.setProperty('font-size', `${codeZoom}px`, 'important');
    });
    if (window.Reveal && typeof window.Reveal.layout === 'function') window.Reveal.layout();
  }

  function setup() {
    if (document.querySelector('.code-zoom-controls')) return;

    const style = document.createElement('style');
    style.id = 'so-code-zoom-style';
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

/* Visualizador de passos com dados JSON embutidos no próprio widget. */
(() => {
  'use strict';

  function init(widget) {
    const source = widget.querySelector('script[type="application/json"]');
    if (!source) return;
    let steps;
    try { steps = JSON.parse(source.textContent).steps; }
    catch (error) { return; }
    if (!Array.isArray(steps) || !steps.length) return;

    let current = 0;
    let timer = null;
    const header = document.createElement('div');
    header.className = 'so-vis-header';
    const title = document.createElement('strong');
    title.textContent = widget.dataset.title || 'Visualização passo a passo';
    const counter = document.createElement('span');
    counter.className = 'so-vis-counter';
    header.append(title, counter);
    const track = document.createElement('div');
    track.className = 'so-vis-cells';
    const caption = document.createElement('p');
    caption.className = 'so-vis-caption';
    caption.setAttribute('aria-live', 'polite');
    const controls = document.createElement('div');
    controls.className = 'so-vis-controls';
    widget.replaceChildren(header, track, caption, controls);

    const buttons = {};
    [['prev', 'Anterior'], ['play', 'Reproduzir'], ['next', 'Próximo'], ['reset', 'Reiniciar']].forEach(([action, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.dataset.action = action;
      controls.appendChild(button);
      buttons[action] = button;
    });

    function paint() {
      const step = steps[current];
      track.replaceChildren();
      (step.cells || []).forEach((value, index) => {
        const cell = document.createElement('div');
        cell.className = 'so-vis-cell';
        if ((step.active || []).includes(index)) cell.classList.add('active');
        cell.textContent = String(value);
        track.appendChild(cell);
      });
      caption.textContent = step.caption || '';
      counter.textContent = `Passo ${current + 1}/${steps.length}`;
      buttons.prev.disabled = current === 0;
      buttons.next.disabled = current === steps.length - 1;
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
      buttons.play.textContent = 'Reproduzir';
    }

    controls.addEventListener('click', (event) => {
      const action = event.target.dataset.action;
      if (!action) return;
      if (action === 'reset') { stop(); current = 0; }
      if (action === 'prev') { stop(); current = Math.max(0, current - 1); }
      if (action === 'next') { stop(); current = Math.min(steps.length - 1, current + 1); }
      if (action === 'play') {
        if (timer) stop();
        else {
          if (current === steps.length - 1) current = 0;
          buttons.play.textContent = 'Pausar';
          timer = window.setInterval(() => {
            if (current >= steps.length - 1) { stop(); return; }
            current += 1;
            paint();
            if (current === steps.length - 1) stop();
          }, 1500);
        }
      }
      paint();
    });
    document.addEventListener('so:pause-visualizers', stop);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
    paint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('.so-visualizer').forEach(init), { once: true });
  } else document.querySelectorAll('.so-visualizer').forEach(init);
})();

/* Configuração e controles da apresentação Reveal. */
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
    document.dispatchEvent(new Event('so:pause-visualizers'));
  });

  // Protege os controles depois que o zoom é criado.
  const protectInteractiveControls = () => {
    document.querySelectorAll('details, .so-visualizer, .slide-toolbar, .code-zoom-controls').forEach((element) => {
      element.addEventListener('keydown', (event) => {
        if ([' ', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(event.key)) event.stopPropagation();
      });
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', protectInteractiveControls, { once: true });
  } else protectInteractiveControls();
})();
