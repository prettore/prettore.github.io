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
