(() => {
  'use strict';

  const toNumbers = (value) => String(value || '').split(',').map((x) => Number(x.trim())).filter((x) => Number.isFinite(x));
  const range = (a, b) => { const out = []; for (let i = a; i <= b; i += 1) out.push(i); return out; };

  function clone(values) { return values.slice(); }

  function makeSteps(widget) {
    const mode = widget.dataset.algo || 'linear-search';
    const values = toNumbers(widget.dataset.values);
    const target = Number(widget.dataset.target);
    const steps = [];

    if (mode === 'linear-search') {
      for (let i = 0; i < values.length; i += 1) {
        const found = values[i] === target;
        steps.push({ values: clone(values), active: [i], checked: range(0, i - 1), caption: found ? `Passo ${i + 1}: ${target} encontrado na posição ${i}.` : `Passo ${i + 1}: comparar ${values[i]} com ${target}.` });
        if (found) return steps;
      }
      steps.push({ values: clone(values), active: [], checked: range(0, values.length - 1), caption: `${target} não foi encontrado.` });
      return steps;
    }

    if (mode === 'binary-search') {
      let low = 0; let high = values.length - 1; let count = 1;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const found = values[mid] === target;
        steps.push({ values: clone(values), active: [mid], range: [low, high], caption: found ? `Passo ${count}: meio = ${mid}; ${target} encontrado.` : `Passo ${count}: comparar ${target} com ${values[mid]} (posição ${mid}).` });
        if (found) return steps;
        if (target < values[mid]) high = mid - 1; else low = mid + 1;
        count += 1;
      }
      steps.push({ values: clone(values), active: [], range: [low, high], caption: `${target} não foi encontrado: o intervalo ficou vazio.` });
      return steps;
    }

    if (mode === 'selection-sort') {
      const a = clone(values); steps.push({ values: clone(a), sorted: [], caption: 'Estado inicial: nenhum elemento está garantidamente ordenado.' });
      for (let i = 0; i < a.length - 1; i += 1) {
        let min = i;
        for (let j = i + 1; j < a.length; j += 1) {
          steps.push({ values: clone(a), active: [j, min], sorted: range(0, i - 1), caption: `Comparar ${a[j]} com o menor atual ${a[min]}.` });
          if (a[j] < a[min]) min = j;
        }
        [a[i], a[min]] = [a[min], a[i]];
        steps.push({ values: clone(a), active: [i], sorted: range(0, i), caption: `Fixar ${a[i]} na posição ${i}.` });
      }
      steps.push({ values: clone(a), sorted: range(0, a.length - 1), caption: 'Vetor ordenado.' });
      return steps;
    }

    if (mode === 'insertion-sort') {
      const a = clone(values); steps.push({ values: clone(a), sorted: [0], caption: 'O primeiro elemento já forma uma parte ordenada.' });
      for (let i = 1; i < a.length; i += 1) {
        const key = a[i]; let j = i - 1;
        while (j >= 0 && a[j] > key) {
          a[j + 1] = a[j];
          steps.push({ values: clone(a), active: [j, j + 1], sorted: range(0, i), caption: `Deslocar ${a[j]} para abrir espaço para ${key}.` });
          j -= 1;
        }
        a[j + 1] = key;
        steps.push({ values: clone(a), active: [j + 1], sorted: range(0, i), caption: `Inserir ${key} na posição ${j + 1}.` });
      }
      steps.push({ values: clone(a), sorted: range(0, a.length - 1), caption: 'Vetor ordenado.' });
      return steps;
    }

    if (mode === 'shell-sort') {
      const a = clone(values); const gaps = [Math.max(1, Math.floor(a.length / 2)), 1];
      steps.push({ values: clone(a), caption: 'Estado inicial: escolher um intervalo (gap).', gap: gaps[0] });
      gaps.forEach((gap) => {
        for (let i = gap; i < a.length; i += 1) {
          const temp = a[i]; let j = i;
          while (j >= gap && a[j - gap] > temp) { a[j] = a[j - gap]; j -= gap; steps.push({ values: clone(a), active: [j, j + gap], gap, caption: `Com gap ${gap}, deslocar ${a[j + gap]} para a direita.` }); }
          a[j] = temp;
        }
        steps.push({ values: clone(a), gap, sorted: gap === 1 ? range(0, a.length - 1) : [], caption: `Finalizar a passagem com gap ${gap}.` });
      });
      return steps;
    }

    if (mode === 'quick-sort') {
      const a = clone(values); steps.push({ values: clone(a), caption: 'Estado inicial: escolher o último elemento como pivô.' });
      const partition = (low, high) => {
        const pivot = a[high]; let i = low;
        for (let j = low; j < high; j += 1) {
          steps.push({ values: clone(a), active: [j], pivot: high, range: [low, high], caption: `Comparar ${a[j]} com o pivô ${pivot}.` });
          if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; steps.push({ values: clone(a), active: [i, j], pivot: high, range: [low, high], caption: `Trocar para manter os menores à esquerda do pivô.` }); i += 1; }
        }
        [a[i], a[high]] = [a[high], a[i]];
        steps.push({ values: clone(a), active: [i], pivot: i, range: [low, high], caption: `Pivô ${pivot} fica na posição definitiva ${i}.` });
        return i;
      };
      const sort = (low, high) => { if (low < high) { const p = partition(low, high); sort(low, p - 1); sort(p + 1, high); } };
      sort(0, a.length - 1);
      steps.push({ values: clone(a), sorted: range(0, a.length - 1), caption: 'Vetor ordenado pelo QuickSort.' });
      return steps;
    }

    if (mode === 'merge-sort') {
      const a = clone(values); steps.push({ values: clone(a), caption: 'Estado inicial: dividir para conquistar.' });
      const merge = (low, mid, high) => {
        const left = a.slice(low, mid + 1); const right = a.slice(mid + 1, high + 1); let i = 0; let j = 0; let k = low;
        while (i < left.length && j < right.length) { a[k] = left[i] <= right[j] ? left[i++] : right[j++]; steps.push({ values: clone(a), active: [k], range: [low, high], caption: `Intercalar trechos ordenados: escrever ${a[k]} na posição ${k}.` }); k += 1; }
        while (i < left.length) { a[k] = left[i++]; steps.push({ values: clone(a), active: [k], range: [low, high], caption: `Copiar sobra da metade esquerda para a posição ${k}.` }); k += 1; }
        while (j < right.length) { a[k] = right[j++]; steps.push({ values: clone(a), active: [k], range: [low, high], caption: `Copiar sobra da metade direita para a posição ${k}.` }); k += 1; }
      };
      const sort = (low, high) => { if (low >= high) return; const mid = Math.floor((low + high) / 2); steps.push({ values: clone(a), range: [low, high], caption: `Dividir o trecho [${low}, ${high}] em duas partes.` }); sort(low, mid); sort(mid + 1, high); merge(low, mid, high); };
      sort(0, a.length - 1);
      steps.push({ values: clone(a), sorted: range(0, a.length - 1), caption: 'Vetor ordenado pelo MergeSort.' });
      return steps;
    }

    if (mode === 'resize') {
      const capacity = Number(widget.dataset.capacity || values.length); const grown = Math.max(capacity * 2, capacity + 1);
      steps.push({ values: clone(values), capacity, caption: `Vetor cheio: tamanho ${values.length}, capacidade ${capacity}.` });
      steps.push({ values: clone(values), capacity: grown, ghost: true, caption: `Alocar um novo bloco com capacidade ${grown}.` });
      steps.push({ values: clone(values), capacity: grown, copied: true, caption: 'Copiar os elementos válidos para o novo bloco.' });
      steps.push({ values: clone(values), capacity: grown, released: true, caption: 'Liberar o bloco antigo com delete[].' });
      steps.push({ values: clone(values), capacity: grown, updated: true, caption: 'Atualizar o ponteiro principal: agora ele aponta para o novo bloco.' });
      return steps;
    }

    if (mode === 'recursion') {
      const n = Number(widget.dataset.n || 4);
      for (let k = n; k >= 0; k -= 1) steps.push({ values: [k], stack: range(k, n), caption: k === 0 ? 'Caso base: fatorial(0) = 1.' : `Chamada recursiva: fatorial(${k}) chama fatorial(${k - 1}).` });
      for (let k = 1; k <= n; k += 1) steps.push({ values: [k], stack: range(k, n), caption: `Retorno: ${k}! é calculado usando o resultado anterior.` });
      return steps;
    }

    if (mode === 'matrix') {
      const rows = Number(widget.dataset.rows || 3); const cols = Number(widget.dataset.cols || 4); const matrix = values.slice(0, rows * cols);
      for (let i = 0; i < rows; i += 1) for (let j = 0; j < cols; j += 1) steps.push({ values: matrix, rows, cols, active: [i * cols + j], diagonal: i === j, caption: `Visitar m[${i}][${j}] = ${matrix[i * cols + j]}.` });
      steps.push({ values: matrix, rows, cols, sorted: [], caption: 'Percurso completo: a coluna interna muda mais rápido.' });
      return steps;
    }

    if (mode === 'records') {
      return [{ values: [1, 2, 3], record: true, caption: 'Cada posição guarda um registro completo: nome, matrícula e nota.' }];
    }

    return [{ values, caption: 'Visualização pronta.' }];
  }

  function renderCells(widget, step) {
    const track = widget.querySelector('.ialg-anim-track');
    track.innerHTML = '';
    if (step.rows && step.cols) track.style.gridTemplateColumns = `repeat(${step.cols}, minmax(40px, 1fr))`; else track.style.gridTemplateColumns = '';
    (step.values || []).forEach((value, index) => {
      const cell = document.createElement('div'); cell.className = 'ialg-anim-cell';
      if (step.active && step.active.includes(index)) cell.classList.add('active');
      if (step.sorted && step.sorted.includes(index)) cell.classList.add('sorted');
      if (step.checked && step.checked.includes(index)) cell.classList.add('checked');
      if (step.range && (index < step.range[0] || index > step.range[1])) cell.classList.add('discarded');
      if (step.pivot === index) cell.classList.add('pivot');
      if (step.diagonal && step.active && step.active.includes(index)) cell.classList.add('diagonal');
      cell.innerHTML = `<span class="ialg-anim-index">${index}</span><strong>${value}</strong>`;
      track.appendChild(cell);
    });
    if (step.capacity) {
      for (let i = step.values.length; i < step.capacity; i += 1) {
        const cell = document.createElement('div'); cell.className = 'ialg-anim-cell empty'; cell.innerHTML = `<span class="ialg-anim-index">${i}</span><strong>·</strong>`; track.appendChild(cell);
      }
    }
    if (step.stack) {
      const stack = document.createElement('div'); stack.className = 'ialg-stack';
      step.stack.slice().reverse().forEach((k) => { const frame = document.createElement('div'); frame.className = 'ialg-stack-frame'; frame.textContent = `fatorial(${k})`; stack.appendChild(frame); });
      widget.querySelector('.ialg-anim-side').replaceChildren(stack);
    }
  }

  function init(widget) {
    if (widget.dataset.ready) return;
    widget.dataset.ready = '1';
    const steps = makeSteps(widget); let current = 0; let timer = null;
    widget.innerHTML = `<div class="ialg-anim-header"><strong>${widget.dataset.title || 'Visualização passo a passo'}</strong><span class="ialg-anim-counter"></span></div><div class="ialg-anim-main"><div class="ialg-anim-track"></div><div class="ialg-anim-side"></div></div><p class="ialg-anim-caption"></p><div class="ialg-anim-controls"><button type="button" data-anim="prev">◀ Anterior</button><button type="button" data-anim="play">▶ Reproduzir</button><button type="button" data-anim="next">Próximo ▶</button><button type="button" data-anim="reset">↺ Reiniciar</button></div>`;
    const paint = () => { const step = steps[current]; renderCells(widget, step); widget.querySelector('.ialg-anim-caption').textContent = step.caption || ''; widget.querySelector('.ialg-anim-counter').textContent = `Passo ${current + 1}/${steps.length}`; };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; widget.querySelector('[data-anim="play"]').textContent = '▶ Reproduzir'; } };
    widget.addEventListener('click', (event) => { const action = event.target.dataset.anim; if (!action) return; if (action === 'next') { current = Math.min(steps.length - 1, current + 1); paint(); } else if (action === 'prev') { current = Math.max(0, current - 1); paint(); } else if (action === 'reset') { stop(); current = 0; paint(); } else if (action === 'play') { if (timer) { stop(); } else { widget.querySelector('[data-anim="play"]').textContent = '❚❚ Pausar'; timer = setInterval(() => { if (current >= steps.length - 1) { stop(); return; } current += 1; paint(); }, Number(widget.dataset.interval || 1100)); } } });
    paint();
  }

  document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('.ialg-visualizer').forEach(init));
})();
