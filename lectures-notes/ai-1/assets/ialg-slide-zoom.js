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
    style.id = 'ialg-code-zoom-style';
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
