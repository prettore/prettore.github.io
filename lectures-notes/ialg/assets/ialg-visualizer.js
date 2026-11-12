(() => {
  'use strict';

  const toNumbers = (value) => String(value || '').split(',').map((x) => Number(x.trim())).filter((x) => Number.isFinite(x));
  const range = (a, b) => { const out = []; for (let i = a; i <= b; i += 1) out.push(i); return out; };

  function clone(values) { return values.slice(); }

  function makeSteps(widget) {
    const mode = widget.dataset.algo || 'linear-search';
    const detailed = widget.dataset.detailed === 'true';
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
      const a = clone(values);
      if (!detailed) {
        steps.push({ values: clone(a), sorted: [], caption: 'Estado inicial: nenhum elemento está garantidamente ordenado.' });
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
      steps.push({ values: clone(a), sorted: [], variables: { i: 0, j: '—', menor: '—' }, caption: `Vetor inicial: ${a.join(', ')}. Em cada passagem, procuramos o menor valor da parte ainda não ordenada.` });
      for (let i = 0; i < a.length - 1; i += 1) {
        let min = i;
        steps.push({ values: clone(a), active: [i], sorted: range(0, i - 1), variables: { i, j: i, menor: `${a[min]} (índice ${min})` }, caption: `Passagem ${i + 1}: considerar o índice ${i} como candidato a menor; percorrer o restante do vetor.` });
        for (let j = i + 1; j < a.length; j += 1) {
          const antigoMin = min;
          const valorAtual = a[min];
          if (a[j] < valorAtual) {
            min = j;
            steps.push({ values: clone(a), active: [j, antigoMin], sorted: range(0, i - 1), variables: { i, j, menor: `${a[min]} (índice ${min})` }, caption: `Comparar v[${j}]=${a[j]} com o menor atual ${valorAtual}: é menor, então atualizar menor para ${a[min]} (índice ${min}).` });
          } else {
            steps.push({ values: clone(a), active: [j, min], sorted: range(0, i - 1), variables: { i, j, menor: `${a[min]} (índice ${min})` }, caption: `Comparar v[${j}]=${a[j]} com o menor atual ${valorAtual}: não é menor, portanto manter o candidato.` });
          }
        }
        const escolhido = a[min];
        [a[i], a[min]] = [a[min], a[i]];
        steps.push({ values: clone(a), active: [i, min], sorted: range(0, i), variables: { i, j: 'fim da passagem', menor: `${a[i]} (fixado no índice ${i})` }, caption: `Fim da busca: trocar o menor ${escolhido} com v[${i}]. Agora ${a[i]} está fixo; a próxima passagem começa em ${i + 1}.` });
      }
      steps.push({ values: clone(a), sorted: range(0, a.length - 1), variables: { i: 'fim', j: 'fim', menor: 'todos fixados' }, caption: `Concluído: ${a.join(', ')}. Cada passagem colocou o menor valor restante na próxima posição.` });
      return steps;
    }

    if (mode === 'insertion-sort') {
      const a = clone(values);
      if (!detailed) {
        steps.push({ values: clone(a), sorted: [0], caption: 'O primeiro elemento já forma uma parte ordenada.' });
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
      steps.push({ values: clone(a), sorted: [0], variables: { i: 1, chave: '—', j: '—' }, caption: `Início: ${a[0]} sozinho já está ordenado. i=1 será a primeira chave inserida na parte ordenada à esquerda.` });
      for (let i = 1; i < a.length; i += 1) {
        const key = a[i]; let j = i - 1;
        steps.push({ values: clone(a), active: [i], sorted: range(0, i - 1), key, variables: { i, chave: key, j }, caption: `Passagem ${i}: guardar v[${i}]=${key} como chave. Comparar com os valores ordenados à esquerda.` });
        while (j >= 0 && a[j] > key) {
          const from = j;
          a[j + 1] = a[j];
          steps.push({ values: clone(a), active: [from, from + 1], sorted: range(0, i - 1), key, variables: { i, chave: key, j: from }, caption: `v[${from}]=${a[from]} é maior que a chave ${key}: deslocar ${a[from]} uma posição à direita para abrir espaço.` });
          j -= 1;
        }
        if (j >= 0) steps.push({ values: clone(a), active: [j], sorted: range(0, i - 1), key, variables: { i, chave: key, j }, caption: `v[${j}]=${a[j]} ≤ ${key}: parar. A chave ficará no índice seguinte, ${j + 1}.` });
        else steps.push({ values: clone(a), active: [0], sorted: range(0, i - 1), key, variables: { i, chave: key, j: -1 }, caption: `j chegou a −1: não há mais elemento à esquerda. Inserir a chave no início, índice 0.` });
        a[j + 1] = key;
        steps.push({ values: clone(a), active: [j + 1], sorted: range(0, i), key: null, variables: { i, chave: key, j: j + 1 }, caption: `Inserir a chave ${key} no índice ${j + 1}. Agora os índices de 0 a ${i} estão ordenados.` });
      }
      steps.push({ values: clone(a), sorted: range(0, a.length - 1), variables: { i: 'fim', chave: '—', j: '—' }, caption: `Concluído: ${a.join(', ')}. A parte ordenada cresceu até incluir todo o vetor.` });
      return steps;
    }

    if (mode === 'shell-sort') {
      if (!detailed) {
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
      const a = clone(values); const firstGap = Math.max(1, Math.floor(a.length / 2)); const gaps = firstGap === 1 ? [1] : [firstGap, 1];
      steps.push({ values: clone(a), gap: gaps[0], variables: { gap: gaps[0], i: '—', j: '—', chave: '—' }, caption: `Vetor inicial: ${a.join(', ')}. Começaremos com gap=${gaps[0]}, comparando posições separadas por esse intervalo.` });
      gaps.forEach((gap) => {
        steps.push({ values: clone(a), gap, variables: { gap, i: '—', j: '—', chave: '—' }, caption: `Nova passagem: aplicar inserção aos grupos de posições separados por gap=${gap}.` });
        for (let i = gap; i < a.length; i += 1) {
          const temp = a[i]; let j = i;
          steps.push({ values: clone(a), active: [i], gap, key: temp, variables: { gap, i, j, chave: temp }, caption: `Guardar v[${i}]=${temp} como chave. Procurar sua posição comparando com o elemento ${gap} índice(s) antes.` });
          let stoppedByOrder = false;
          while (j >= gap) {
            const anterior = a[j - gap];
            if (anterior > temp) {
              const origem = j - gap;
              const destino = j;
              a[j] = anterior;
              steps.push({ values: clone(a), active: [origem, destino], gap, key: temp, variables: { gap, i, j, chave: temp }, caption: `Comparar v[${origem}]=${anterior} com a chave ${temp}: como é maior, deslocar ${anterior} para o índice ${destino}.` });
              j -= gap;
              if (j >= gap) steps.push({ values: clone(a), active: [j - gap, j], gap, key: temp, variables: { gap, i, j, chave: temp }, caption: `Recuar ${gap} índice(s): agora j=${j}; comparar v[${j - gap}]=${a[j - gap]} com a chave ${temp}.` });
            } else {
              steps.push({ values: clone(a), active: [j - gap, j], gap, key: temp, variables: { gap, i, j, chave: temp }, caption: `Comparar v[${j - gap}]=${anterior} com a chave ${temp}: como é menor ou igual, parar os deslocamentos.` });
              stoppedByOrder = true;
              break;
            }
          }
          if (!stoppedByOrder && j < gap) steps.push({ values: clone(a), active: [j], gap, key: temp, variables: { gap, i, j, chave: temp }, caption: `j=${j}: não existe posição anterior dentro deste grupo. A chave será inserida aqui.` });
          a[j] = temp;
          steps.push({ values: clone(a), active: [j], gap, variables: { gap, i, j, chave: temp }, caption: `Inserir a chave ${temp} em v[${j}]. Este grupo separado por gap=${gap} fica ordenado.` });
        }
        steps.push({ values: clone(a), gap, sorted: gap === 1 ? range(0, a.length - 1) : [], variables: { gap, i: 'fim', j: '—', chave: '—' }, caption: gap === 1 ? `Fim da passagem gap=1: todos os vizinhos foram conferidos; o vetor está ordenado.` : `Fim da passagem gap=${gap}: os elementos distantes já foram aproximados. Reduzir o gap e refinar a ordem.` });
      });
      return steps;
    }

    if (mode === 'quick-sort') {
      const a = clone(values); steps.push({ values: clone(a), variables: { inicio: 0, fim: a.length - 1, 'próximo menor (i)': 0, 'varredura (j)': '—', pivô: a[a.length - 1] }, caption: `Vetor inicial: ${a.join(', ')}. Vamos ordenar o trecho inteiro e usar o último valor como pivô.` });
      const partition = (low, high) => {
        const pivot = a[high]; let i = low;
        steps.push({ values: clone(a), active: [high], pivot: high, range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': i, 'varredura (j)': '—', pivô: pivot }, caption: `Particionar o trecho [${low}, ${high}]. O pivô é ${pivot}; i marca onde ficará o próximo valor ≤ pivô.` });
        for (let j = low; j < high; j += 1) {
          const valor = a[j];
          steps.push({ values: clone(a), active: [j, i], pivot: high, range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': i, 'varredura (j)': j, pivô: pivot }, caption: `Comparar v[${j}]=${valor} com o pivô ${pivot}. A região antes de i contém valores ≤ pivô.` });
          if (valor <= pivot) {
            if (i !== j) {
              [a[i], a[j]] = [a[j], a[i]];
              steps.push({ values: clone(a), active: [i, j], pivot: high, range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': i, 'varredura (j)': j, pivô: pivot }, caption: `${valor} ≤ ${pivot}: trocar v[${i}] e v[${j}] para ampliar a região dos valores menores.` });
            } else {
              steps.push({ values: clone(a), active: [i], pivot: high, range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': i, 'varredura (j)': j, pivô: pivot }, caption: `${valor} ≤ ${pivot} e i=j: o valor já está na região correta; não é preciso trocar.` });
            }
            i += 1;
            steps.push({ values: clone(a), active: [i < a.length ? i : high], pivot: high, range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': i, 'varredura (j)': j + 1, pivô: pivot }, caption: `Avançar i para ${i}. O próximo valor ≤ pivô deve ficar nessa posição.` });
          } else {
            steps.push({ values: clone(a), active: [j], pivot: high, range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': i, 'varredura (j)': j, pivô: pivot }, caption: `${valor} > ${pivot}: deixar à direita por enquanto; i não muda.` });
          }
        }
        [a[i], a[high]] = [a[high], a[i]];
        steps.push({ values: clone(a), active: [i], pivot: i, range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': i, 'varredura (j)': 'fim', pivô: pivot }, caption: `Fim da varredura: colocar o pivô ${pivot} em v[${i}]. Agora ele está em sua posição definitiva.` });
        return i;
      };
      const sort = (low, high) => {
        if (low > high) {
          steps.push({ values: clone(a), range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': '—', 'varredura (j)': '—', pivô: '—' }, caption: `Trecho [${low}, ${high}] vazio: caso-base, não há valores para ordenar.` });
          return;
        }
        if (low === high) {
          steps.push({ values: clone(a), active: [low], sorted: [low], range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': '—', 'varredura (j)': '—', pivô: a[low] }, caption: `Trecho [${low}, ${high}] tem um elemento (${a[low]}): caso-base, já está ordenado.` });
          return;
        }
        steps.push({ values: clone(a), range: [low, high], variables: { inicio: low, fim: high, 'próximo menor (i)': '—', 'varredura (j)': '—', pivô: '—' }, caption: `Trabalhar no subtrecho [${low}, ${high}]. Primeiro particionar; depois ordenar as partes menores.` });
        const p = partition(low, high);
        steps.push({ values: clone(a), active: [p], pivot: p, sorted: [p], range: [low, high], variables: { inicio: low, fim: high, 'posição do pivô': p, pivô: a[p] }, caption: `Pivô fixado em ${p}. Agora ordenar à esquerda [${low}, ${p - 1}] e à direita [${p + 1}, ${high}].` });
        sort(low, p - 1);
        sort(p + 1, high);
        steps.push({ values: clone(a), sorted: range(low, high), range: [low, high], variables: { inicio: low, fim: high, estado: 'ordenado' }, caption: `Subtrecho [${low}, ${high}] resolvido: seus valores estão em ordem.` });
      };
      sort(0, a.length - 1);
      steps.push({ values: clone(a), sorted: range(0, a.length - 1), variables: { inicio: 0, fim: a.length - 1, estado: 'ordenado' }, caption: `Concluído: ${a.join(', ')}. Todos os pivôs ficaram fixos e os subtrechos foram resolvidos.` });
      return steps;
    }

    if (mode === 'merge-sort') {
      const a = clone(values); steps.push({ values: clone(a), variables: { chamada: 'mergesort(0, ' + (a.length - 1) + ')' }, caption: `Vetor inicial: ${a.join(', ')}. Primeiro dividimos em partes; depois, juntamos as partes já ordenadas.` });
      const merge = (low, mid, high) => {
        const left = a.slice(low, mid + 1); const right = a.slice(mid + 1, high + 1); let i = 0; let j = 0; let k = low;
        steps.push({ values: clone(a), range: [low, high], left: clone(left), right: clone(right), output: [], variables: { i: 0, j: 0, k }, caption: `Intercalar [${low}, ${mid}] = {${left.join(', ')}} e [${mid + 1}, ${high}] = {${right.join(', ')}}. i e j apontam para os próximos valores; k indica a posição de escrita.` });
        while (i < left.length && j < right.length) {
          const leftValue = left[i]; const rightValue = right[j];
          if (leftValue <= rightValue) {
            const destino = k;
            a[destino] = leftValue;
            i += 1; k += 1;
            steps.push({ values: clone(a), active: [destino], range: [low, high], left: clone(left), right: clone(right), output: a.slice(low, destino + 1), variables: { i, j, k }, caption: `Comparar esquerda ${leftValue} com direita ${rightValue}: copiar ${leftValue} para v[${destino}]. Avançar i e k.` });
          } else {
            const destino = k;
            a[destino] = rightValue;
            j += 1; k += 1;
            steps.push({ values: clone(a), active: [destino], range: [low, high], left: clone(left), right: clone(right), output: a.slice(low, destino + 1), variables: { i, j, k }, caption: `Comparar esquerda ${leftValue} com direita ${rightValue}: copiar ${rightValue} para v[${destino}]. Avançar j e k.` });
          }
        }
        while (i < left.length) {
          const sobra = left[i]; const destino = k;
          a[destino] = sobra;
          i += 1; k += 1;
          steps.push({ values: clone(a), active: [destino], range: [low, high], left: clone(left), right: clone(right), output: a.slice(low, destino + 1), variables: { i, j, k }, caption: `A metade direita acabou. Copiar a sobra ${sobra} da esquerda para v[${destino}]; avançar i e k.` });
        }
        while (j < right.length) {
          const sobra = right[j]; const destino = k;
          a[destino] = sobra;
          j += 1; k += 1;
          steps.push({ values: clone(a), active: [destino], range: [low, high], left: clone(left), right: clone(right), output: a.slice(low, destino + 1), variables: { i, j, k }, caption: `A metade esquerda acabou. Copiar a sobra ${sobra} da direita para v[${destino}]; avançar j e k.` });
        }
        steps.push({ values: clone(a), sorted: range(low, high), range: [low, high], left: clone(left), right: clone(right), output: a.slice(low, high + 1), variables: { i: 'fim', j: 'fim', k: high + 1 }, caption: `Intercalação concluída: o trecho [${low}, ${high}] agora está ordenado como {${a.slice(low, high + 1).join(', ')}}.` });
      };
      const sort = (low, high) => {
        if (low >= high) {
          steps.push({ values: clone(a), active: [low], sorted: [low], range: [low, high], variables: { inicio: low, fim: high }, caption: `Trecho [${low}, ${high}] tem um elemento (${a[low]}): caso-base, já está ordenado.` });
          return;
        }
        const mid = Math.floor((low + high) / 2);
        steps.push({ values: clone(a), range: [low, high], left: a.slice(low, mid + 1), right: a.slice(mid + 1, high + 1), variables: { inicio: low, meio: mid, fim: high }, caption: `Dividir [${low}, ${high}] ao meio: esquerda [${low}, ${mid}] e direita [${mid + 1}, ${high}]. Resolver cada lado antes de intercalar.` });
        sort(low, mid);
        sort(mid + 1, high);
        merge(low, mid, high);
      };
      sort(0, a.length - 1);
      steps.push({ values: clone(a), sorted: range(0, a.length - 1), output: clone(a), variables: { resultado: 'completo' }, caption: `Concluído: ${a.join(', ')}. Cada metade foi ordenada e depois intercalada.` });
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
    const side = widget.querySelector('.ialg-anim-side');
    side.replaceChildren();
    if (step.variables) {
      const panel = document.createElement('div'); panel.className = 'ialg-stack ialg-algo-vars';
      Object.entries(step.variables).forEach(([name, value]) => {
        const row = document.createElement('div'); row.className = 'ialg-stack-frame';
        row.textContent = `${name} = ${value}`; panel.appendChild(row);
      });
      side.appendChild(panel);
    }
    if (step.left || step.right || step.output) {
      const groups = document.createElement('div'); groups.className = 'ialg-merge-groups';
      [['Esquerda', step.left], ['Direita', step.right], ['Juntando', step.output]].forEach(([label, values]) => {
        if (!values) return;
        const row = document.createElement('div'); row.className = 'ialg-stack-frame';
        row.textContent = `${label}: {${values.join(', ')}}`; groups.appendChild(row);
      });
      side.appendChild(groups);
    }
    if (step.stack) {
      const stack = document.createElement('div'); stack.className = 'ialg-stack';
      step.stack.slice().reverse().forEach((k) => { const frame = document.createElement('div'); frame.className = 'ialg-stack-frame'; frame.textContent = `fatorial(${k})`; stack.appendChild(frame); });
      side.appendChild(stack);
    }
    if (widget.dataset.detailed === 'true' && step.gap && !step.variables) {
      const gap = document.createElement('div'); gap.className = 'ialg-stack-frame'; gap.textContent = `gap = ${step.gap}`; side.appendChild(gap);
    }
    if (widget.dataset.detailed === 'true' && step.key !== undefined && step.key !== null && !step.variables) {
      const key = document.createElement('div'); key.className = 'ialg-stack-frame'; key.textContent = `chave guardada: ${step.key}`; side.appendChild(key);
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
