(() => {
  const container = document.getElementById('wordCloud');
  if (!container || typeof d3 === 'undefined' || typeof d3.layout === 'undefined') return;

  const palette = ['#1769aa', '#0f8b8d', '#d97706', '#7c3aed', '#be123c', '#15803d'];
  const wordSets = {
    en: ['network', 'data', 'tactical', 'systems', 'sensor', 'scenarios', 'intra-vehicular', 'IoT', 'fusion', 'intelligent', 'resilience', 'queuing', 'cybersecurity', 'heterogeneous', 'ever-changing', 'communication', 'military', 'context-awareness'],
    'pt-BR': ['redes', 'dados', 'tática', 'sistemas', 'sensores', 'cenários', 'intraveicular', 'IoT', 'fusão', 'inteligência', 'resiliência', 'filas', 'cibersegurança', 'heterogêneo', 'dinâmico', 'comunicação', 'militar', 'contexto']
  };
  const sizes = [90, 80, 65, 60, 55, 52, 48, 45, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26];

  function render(lang) {
    const width = Math.max(280, Math.min(container.clientWidth || 720, 900));
    const height = width < 500 ? 300 : 380;
    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('role', 'img').attr('aria-label', lang === 'pt-BR' ? 'Nuvem de palavras das pesquisas' : 'Research keyword cloud');
    const words = wordSets[lang] || wordSets.en;
    const data = words.map((text, index) => ({ text, size: sizes[index], color: palette[index % palette.length] }));
    d3.layout.cloud().size([width, height]).words(data).padding(4).rotate((d) => d.text === 'intra-vehicular' || d.text === 'intraveicular' ? 90 : 0).font('Arial, sans-serif').fontSize((d) => d.size * (width < 500 ? 0.72 : 1)).spiral('archimedean').on('end', (placed) => {
      const texts = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`).selectAll('text').data(placed).enter().append('text').style('font-size', (d) => `${d.size}px`).style('font-family', 'Arial, sans-serif').style('font-weight', '700').style('fill', (d) => d.color).attr('text-anchor', 'middle').attr('transform', (d) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`).text((d) => d.text).on('mouseover', function () {
        d3.select(this).transition().duration(160).style('opacity', 0.62);
      }).on('mouseout', function () {
        d3.select(this).transition().duration(160).style('opacity', 1);
      });
    }).start();
  }

  render(document.documentElement.lang || 'en');
  window.addEventListener('languageChanged', (event) => render(event.detail.lang));
  window.addEventListener('resize', () => render(document.documentElement.lang || 'en'));
})();
