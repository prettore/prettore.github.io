/* Shared navigation, language switcher and interaction layer. */
(() => {
  const translations = {
    'Language': 'Idioma',
    'Choose language': 'Escolher idioma',
    'English': 'Inglês',
    'Português': 'Português',
    'Home': 'Início',
    'About Me': 'Sobre mim',
    'Research': 'Pesquisa',
    'Lectures': 'Aulas',
    'Students': 'Alunos',
    'Publications': 'Publicações',
    'I am P.h.D in Computer Science and Professor at Federal University of Lavras in Brazil': 'Sou doutor em Ciência da Computação e professor da Universidade Federal de Lavras, no Brasil.',
    'Short Bio': 'Breve biografia',
    'Paulo H. L. Rettore is a Professor at the Federal University of Lavras (UFLA), Brazil. His research interests include intelligent environments, such as transportation systems, smart cities, smart farms, and smart homes, with a focus on heterogeneous data fusion, data mining, applied artificial intelligence, and resilient systems and networks.': 'Paulo H. L. Rettore é professor da Universidade Federal de Lavras (UFLA), Brasil. Seus interesses de pesquisa incluem ambientes inteligentes, como sistemas de transporte, cidades inteligentes, fazendas inteligentes e casas inteligentes, com foco em fusão de dados heterogêneos, mineração de dados, inteligência artificial aplicada e sistemas e redes resilientes.',
    'He received his B.Sc. in Computer Science in 2009, his M.Sc. in Computer Science from the Federal University of São Carlos (UFSCar) in 2012, and his Ph.D. in Computer Science from the Federal University of Minas Gerais (UFMG) in 2019. He previously worked as a researcher at Fraunhofer FKIE in Bonn, Germany (2019–2025) and completed a postdoctoral fellowship at UFMG (2025-2026) before joining UFLA.': 'Recebeu o bacharelado em Ciência da Computação em 2009, o mestrado em Ciência da Computação pela Universidade Federal de São Carlos (UFSCar) em 2012 e o doutorado em Ciência da Computação pela Universidade Federal de Minas Gerais (UFMG) em 2019. Atuou como pesquisador no Fraunhofer FKIE, em Bonn, Alemanha (2019–2025), e realizou estágio de pós-doutorado na UFMG (2025–2026) antes de ingressar na UFLA.',
    'Expertise': 'Áreas de especialidade',
    'Computer Networks': 'Redes de computadores',
    'Smart Environments (Intelligent Transportation Systems, Smart Cities, Smart Farms, Smart Homes)': 'Ambientes inteligentes (sistemas inteligentes de transporte, cidades inteligentes, fazendas inteligentes e casas inteligentes)',
    'Software-defined Networking (SDN)': 'Redes definidas por software (SDN)',
    'Mobile Ad-hoc Networks (VANETs, Tactical Networks)': 'Redes móveis ad hoc (VANETs, redes táticas)',
    'Data Science (Big Data, Data Fusion, NLP, ML, AI)': 'Ciência de dados (Big Data, fusão de dados, PLN, ML e IA)',
    'Areas of Interest': 'Áreas de interesse',
    'Tactical Networks': 'Redes táticas',
    'Resilient Systems for Smart Environments': 'Sistemas resilientes para ambientes inteligentes',
    'Heterogeneous Data Fusion': 'Fusão de dados heterogêneos',
    'Internet of Things (IoT)': 'Internet das Coisas (IoT)',
    'Computer Networking - Wireless Sensor Networks': 'Redes de computadores — redes de sensores sem fio',
    'Research Keywords': 'Palavras-chave de pesquisa',
    'RISE Research Group': 'Grupo de Pesquisa RISE',
    'Resilient and Intelligent Systems for Smart Environments': 'Sistemas resilientes e inteligentes para ambientes inteligentes',
    'The RISE Group is a multidisciplinary and inter-institutional research group led by Prof. Dr. Paulo Rettore, dedicated to designing intelligent systems that understand their context, adapt their behaviour, and remain resilient in dynamic environments. The group was established through the SiR.AI project, supported by CNPq/MCTI/FNDCT, and brings together researchers from UFLA, UFMG, UFBA, ITA, USP, University of Bonn, and Fraunhofer FKIE.': 'O Grupo RISE é um grupo de pesquisa multidisciplinar e interinstitucional liderado pelo Prof. Dr. Paulo Rettore, dedicado ao desenvolvimento de sistemas inteligentes que compreendem seu contexto, adaptam seu comportamento e permanecem resilientes em ambientes dinâmicos. O grupo foi criado por meio do projeto SiR.AI, apoiado pelo CNPq/MCTI/FNDCT, e reúne pesquisadores da UFLA, UFMG, UFBA, ITA, USP, Universidade de Bonn e Fraunhofer FKIE.',
    'Members': 'Membros',
    'Funded Projects': 'Projetos financiados',
    'Publications': 'Publicações',
    'Institutions': 'Instituições',
    'Artificial Intelligence': 'Inteligência artificial',
    'Cybersecurity': 'Cibersegurança',
    'Distributed Systems': 'Sistemas distribuídos',
    'Context Awareness': 'Consciência de contexto',
    '5G/6G Networks': 'Redes 5G/6G',
    'Visit RISE Group →': 'Visitar o Grupo RISE →',
    'Research': 'Pesquisa',
    'Resilient Systems for Intelligent Environments': 'Sistemas resilientes para ambientes inteligentes',
    'The RICA (Reliable and Adaptable Intelligent Networks) project arises in response to emerging challenges in network management for critical applications. This project aims to investigate the operation and management of emerging networks, with a focus on applications that require high reliability and strong guarantees of network performance and security. New applications, such as teleoperation, telemedicine, Industry 4.0, autonomous vehicles, and cooperative work using virtual and augmented reality, require guarantees of low latency and low loss rates, as well as more or less constant throughput.': 'O projeto RICA (Reliable and Adaptable Intelligent Networks) surge em resposta aos desafios emergentes da gestão de redes para aplicações críticas. O projeto investiga a operação e o gerenciamento de redes emergentes, com foco em aplicações que exigem alta confiabilidade e fortes garantias de desempenho e segurança. Novas aplicações, como teleoperação, telemedicina, Indústria 4.0, veículos autônomos e trabalho cooperativo com realidade virtual e aumentada, exigem baixa latência, baixas taxas de perda e vazão aproximadamente constante.',
    'This project seeks to comprehensively investigate these challenges and implement solutions to enhance data quality and develop context-aware systems that can adapt to change. The underlying hypothesis is that applications and models that integrate heterogeneous contextual data are more robust and accurate for monitoring, prediction, and analysis. These systems are also more resilient to environmental changes, allowing for more informed decision-making.': 'Este projeto busca investigar esses desafios de forma abrangente e implementar soluções para melhorar a qualidade dos dados e desenvolver sistemas sensíveis ao contexto, capazes de se adaptar às mudanças. A hipótese central é que aplicações e modelos que integram dados contextuais heterogêneos são mais robustos e precisos para monitoramento, predição e análise. Esses sistemas também são mais resilientes às mudanças ambientais, permitindo decisões mais bem informadas.',
    'The expected massive growth of mobile Internet traffic in 5G mobile networks introduces the need to change the operators’ networks. Such networks require a drastic transformation toward open, scalable, and elastic ecosystems that support new types of communication. The PORVIR-5G project will develop and demonstrate a programmable fronthaul and backhaul integrating wireless with optical-packet networks and cloud solutions.': 'O crescimento esperado do tráfego de Internet móvel nas redes 5G cria a necessidade de transformar as redes das operadoras. Essas redes exigem uma mudança profunda em direção a ecossistemas abertos, escaláveis e elásticos, capazes de suportar novos tipos de comunicação. O projeto PORVIR-5G desenvolverá e demonstrará uma rede de acesso e transporte programável, integrando redes sem fio, redes ópticas baseadas em pacotes e soluções em nuvem.',
    'Several sources of randomness can change the radio link data rate at the edge of tactical networks. Simulations and field experiments define these sources of randomness indirectly by choosing the mobility pattern, communication technology, number of nodes, terrain, obstacles, and so on.': 'Diversas fontes de aleatoriedade podem alterar a taxa de dados do enlace de rádio na borda das redes táticas. Simulações e experimentos de campo definem indiretamente essas fontes ao escolher o padrão de mobilidade, a tecnologia de comunicação, o número de nós, o terreno, os obstáculos e outros fatores.',
    'Urban mobility deals with the movement of people and cargo in urban environments and has become a challenge with the constant growth of the global population. As a consequence of such an increase, more data has become available, which allows new information technologies to improve the mobility systems.': 'A mobilidade urbana envolve o deslocamento de pessoas e cargas em ambientes urbanos e tornou-se um desafio com o crescimento constante da população mundial. Como consequência desse aumento, mais dados passaram a estar disponíveis, permitindo que novas tecnologias da informação aprimorem os sistemas de mobilidade.',
    'Read more': 'Ler mais',
    'Lectures - Notes': 'Aulas — Notas',
    'Introduction to Algorithms': 'Introdução a algoritmos',
    'This lecture explores basic structures essential for computer programming.': 'Esta aula explora estruturas básicas essenciais para a programação de computadores.',
    'Operating System': 'Sistemas operacionais',
    'This lecture introduces operating systems, focusing on processes, memory management, file systems, and the role of the OS in managing hardware and software resources.': 'Esta aula apresenta os sistemas operacionais, com foco em processos, gerenciamento de memória, sistemas de arquivos e no papel do sistema operacional na gestão de recursos de hardware e software.',
    'Artificial Intelligence': 'Inteligência artificial',
    'This lecture examines the principles of AI, its applicability, and its impact on society.': 'Esta aula examina os princípios da IA, suas aplicações e seu impacto na sociedade.',
    'Data Base': 'Banco de dados',
    'This lecture covers the principles of database design, management, and implementation, focusing on relational databases and SQL.': 'Esta aula aborda os princípios de projeto, gerenciamento e implementação de bancos de dados, com foco em bancos relacionais e SQL.',
    'Smart Cities': 'Cidades inteligentes',
    'This lecture delves into integrating technology and data analytics in urban environments to enhance residents\' infrastructure, services, and quality of life.': 'Esta aula explora a integração de tecnologia e análise de dados em ambientes urbanos para melhorar a infraestrutura, os serviços e a qualidade de vida da população.',
    'This lecture examines the principles, protocols, and architectures of computer networks, with a focus on the Internet and its underlying technologies.': 'Esta aula examina os princípios, protocolos e arquiteturas de redes de computadores, com foco na Internet e em suas tecnologias fundamentais.',
    'Algorithms and Data Structure': 'Algoritmos e estruturas de dados',
    'This lecture explores fundamental algorithms and data structures essential for efficient problem-solving and programming in computer science.': 'Esta aula explora algoritmos fundamentais e estruturas de dados essenciais para a resolução eficiente de problemas e a programação em ciência da computação.',
    'Web Development': 'Desenvolvimento web',
    'Data Base': 'Banco de dados',
    'This lecture provides an introduction to building and maintaining websites, including client-side and server-side technologies, frameworks, and best practices.': 'Esta aula apresenta os fundamentos da construção e manutenção de sites, incluindo tecnologias de front-end e back-end, frameworks e boas práticas.',
    'Student Advising Overview': 'Visão geral das orientações de alunos',
    'Summary Statistics': 'Resumo estatístico',
    'Current Students:': 'Alunos atuais:',
    'Concluded Students:': 'Alunos concluídos:',
    'Total Students:': 'Total de alunos:',
    'Current PhD:': 'Doutorado atual:',
    "Current Master's:": 'Mestrado atual:',
    "Current Bachelor's:": 'Graduação atual:',
    'Current Advising': 'Orientações atuais',
    'Concluded Advising': 'Orientações concluídas',
    'PhD Students': 'Alunos de doutorado',
    "Master's Students": 'Alunos de mestrado',
    "Bachelor's Students": 'Alunos de graduação',
    '02 students': '2 alunos',
    '03 students': '3 alunos',
    '09 students': '9 alunos',
    '10 students': '10 alunos',
    '6 students': '6 alunos',
    'download': 'baixar',
    'students': 'alunos',
    'Publications': 'Publicações',
    'Dataset': 'Conjunto de dados',
    'Download': 'Baixar',
    'Short course (Portuguese only)': 'Curso breve (somente em português)',
    'This dataset provides intra-vehicular sensor data for driver authentication in Vehicular Ad-hoc Networks (VANETs).': 'Este conjunto de dados fornece dados de sensores intraveiculares para autenticação de motoristas em redes veiculares ad hoc (VANETs).',
    'This dataset provides data for fusion in Intelligent Transportation Systems, supporting research in urban mobility and smart cities.': 'Este conjunto de dados fornece dados para fusão em Sistemas Inteligentes de Transporte, apoiando pesquisas em mobilidade urbana e cidades inteligentes.',
    'This short course covers the fundamentals of Intelligent Transportation Systems, their applications, and the challenges in implementing them.': 'Este curso breve aborda os fundamentos dos Sistemas Inteligentes de Transporte, suas aplicações e os desafios de sua implementação.',
    'Back to all posts': 'Voltar para todas as pesquisas',
    'Back to lectures': 'Voltar para as aulas',
    'In: Tactical Networks': 'Em: Redes táticas',
    'In: Data Fusion': 'Em: Fusão de dados',
    'August, 2016': 'Agosto de 2016',
    'May, 2019': 'Maio de 2019',
    'July, 2025': 'Julho de 2025',
    'Feb, 2026': 'Fev. de 2026',
    'September, 2024': 'Setembro de 2024',
    'English': 'Inglês',
    'Prof. Dr. Paulo Rettore': 'Prof. Dr. Paulo Rettore'
  };

  const pageTitles = {
    'index.html': { en: 'Prof. Dr. Paulo Rettore', 'pt-BR': 'Prof. Dr. Paulo Rettore' },
    'about-me.html': { en: 'About Me - Prof. Dr. Paulo Rettore', 'pt-BR': 'Sobre mim - Prof. Dr. Paulo Rettore' },
    'research.html': { en: 'Research - Prof. Dr. Paulo Rettore', 'pt-BR': 'Pesquisa - Prof. Dr. Paulo Rettore' },
    'research-tactical-networks.html': { en: 'Tactical Networks - Prof. Dr. Paulo Rettore', 'pt-BR': 'Redes táticas - Prof. Dr. Paulo Rettore' },
    'research-data-fusion.html': { en: 'Data Fusion on Intelligent Transportation Systems - Prof. Dr. Paulo Rettore', 'pt-BR': 'Fusão de dados em sistemas inteligentes de transporte - Prof. Dr. Paulo Rettore' },
    'lectures.html': { en: 'Lectures - Prof. Dr. Paulo Rettore', 'pt-BR': 'Aulas - Prof. Dr. Paulo Rettore' },
    'students.html': { en: 'Students - Prof. Dr. Paulo Rettore', 'pt-BR': 'Alunos - Prof. Dr. Paulo Rettore' },
    'publications.html': { en: 'Publications - Prof. Dr. Paulo Rettore', 'pt-BR': 'Publicações - Prof. Dr. Paulo Rettore' }
  };

  const normalize = (value) => value.replace(/\s+/g, ' ').replace(/\s+([,.!?;:])/g, '$1').trim();
  const textRecords = [];
  const attributeRecords = [];

  function collectTranslatableNodes() {
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;
      const original = normalize(node.nodeValue || '');
      if (original && Object.prototype.hasOwnProperty.call(translations, original)) {
        textRecords.push({ node, original });
      }
    }

    document.querySelectorAll('img[alt], [aria-label]').forEach((element) => {
      const attribute = element.hasAttribute('alt') ? 'alt' : 'aria-label';
      const original = normalize(element.getAttribute(attribute) || '');
      if (original && Object.prototype.hasOwnProperty.call(translations, original)) {
        attributeRecords.push({ element, attribute, original });
      }
    });
  }

  function refreshStudentsChart(lang) {
    if (!window.statusChart) return;
    const isPortuguese = lang === 'pt-BR';
    window.statusChart.data.labels = isPortuguese
      ? ['Orientações atuais', 'Orientações concluídas']
      : ['Current Advising', 'Concluded Advising'];
    window.statusChart.options.plugins.tooltip.callbacks.label = (context) => {
      const suffix = isPortuguese ? ' alunos' : ' students';
      return context.label + ': ' + context.parsed + suffix;
    };
    window.statusChart.update();
  }

  function applyLanguage(lang) {
    const isPortuguese = lang === 'pt-BR';
    textRecords.forEach(({ node, original }) => {
      node.nodeValue = isPortuguese ? translations[original] : original;
    });
    attributeRecords.forEach(({ element, attribute, original }) => {
      element.setAttribute(attribute, isPortuguese ? translations[original] : original);
    });
    document.documentElement.lang = isPortuguese ? 'pt-BR' : 'en';
    document.body.dataset.language = lang;
    const currentFile = document.body.dataset.page || window.location.pathname.split('/').pop() || 'index.html';
    if (pageTitles[currentFile]) document.title = pageTitles[currentFile][lang];
    const select = document.getElementById('language-select');
    if (select) select.value = lang;
    localStorage.setItem('siteLanguage', lang);
    refreshStudentsChart(lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function setupLanguageSwitcher() {
    const select = document.getElementById('language-select');
    if (!select) return;
    select.addEventListener('change', () => applyLanguage(select.value));
    applyLanguage(localStorage.getItem('siteLanguage') || 'en');
  }

  function setupActiveNavigation() {
    const currentFile = document.body.dataset.page || window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      if (href === currentFile || (currentFile === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function setupMobileMenu() {
    const nav = document.querySelector('header nav');
    const navMenu = document.querySelector('.nav-menu');
    if (!nav || !navMenu) return;
    let menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) {
      menuToggle = document.createElement('button');
      menuToggle.className = 'menu-toggle';
      menuToggle.type = 'button';
      menuToggle.textContent = 'Menu';
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-controls', 'site-navigation');
      nav.id = 'site-navigation';
      nav.parentNode.insertBefore(menuToggle, nav);
    }
    menuToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  function setupImageFallbacks() {
    document.querySelectorAll('img').forEach((image) => {
      image.addEventListener('error', () => {
        if (image.dataset.fallbackApplied) return;
        image.dataset.fallbackApplied = 'true';
        const label = (image.alt || 'Academic visual').slice(0, 34);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#dbeafe"/><stop offset="1" stop-color="#ccfbf1"/></linearGradient></defs><rect width="640" height="360" rx="28" fill="url(#g)"/><circle cx="510" cy="85" r="95" fill="#1769aa" opacity=".16"/><path d="M80 270c70-95 130-35 195-100 70-70 120 10 180-42 40-34 73-30 105 18v124H80Z" fill="#1769aa" opacity=".24"/><text x="320" y="195" fill="#102a43" font-family="Arial,sans-serif" font-size="26" font-weight="700" text-anchor="middle">${label}</text></svg>`;
        image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
        image.classList.add('image-fallback');
      }, { once: true });
      if (image.complete && image.naturalWidth === 0) image.dispatchEvent(new Event('error'));
    });
  }

  function setupResearchTabs() {
    const researchTabs = document.querySelectorAll('.research-tabs a');
    const researchCards = document.querySelectorAll('.research-card');
    researchTabs.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        researchTabs.forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');
        const filter = normalize(tab.textContent);
        researchCards.forEach((card) => {
          const title = normalize(card.querySelector('h3')?.textContent || '');
          card.style.display = filter === 'Todos' || filter === 'All' || title.includes(filter) ? 'block' : 'none';
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    collectTranslatableNodes();
    setupActiveNavigation();
    setupMobileMenu();
    setupResearchTabs();
    setupImageFallbacks();
    setupLanguageSwitcher();
  });
})();
