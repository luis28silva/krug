// Menu hamburguer (mobile)
const navToggle = document.querySelector('.nav-toggle');
const siteHeader = document.querySelector('.site-header');
if (navToggle && siteHeader) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Fecha o menu ao clicar em algum link (útil pra âncoras tipo #sobre)
  document.querySelectorAll('.mobile-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      siteHeader.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Efeito de revelar seções suavemente conforme a rolagem
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el) => observer.observe(el));
}

// Lightbox: clicar numa foto da galeria amplia ela numa janela central
const galleryItems = document.querySelectorAll('.momentos-gallery > .ph-photo:not(.frase-card):has(img)');
if (galleryItems.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Fechar">&times;</button>
    <div class="lightbox-frame">
      <div class="lightbox-media"></div>
      <p class="lightbox-caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  const media = lightbox.querySelector('.lightbox-media');
  const caption = lightbox.querySelector('.lightbox-caption');

  const openLightbox = (item) => {
    const captionText = item.querySelector('.overlay span')?.textContent || '';
    const imgEl = item.querySelector('img');
    media.innerHTML = '';
    media.style.backgroundImage = '';

    if (imgEl) {
      // Item com <img> real dentro da div (caso da galeria da Krug)
      const img = document.createElement('img');
      img.src = imgEl.src;
      img.alt = imgEl.alt || captionText;
      media.appendChild(img);
    } else {
      // Fallback: itens sem <img>, usando background-image do CSS (ex.: placeholders)
      media.style.backgroundImage = getComputedStyle(item).backgroundImage;
      media.style.backgroundSize = 'cover';
      media.style.backgroundPosition = 'center';
    }
    caption.textContent = captionText;
    lightbox.classList.add('is-open');
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = sbw > 0 ? sbw + 'px' : '';
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => openLightbox(item));
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// Envio simples do formulário de contato (troque pelo FormSubmit, como nos outros sites)
const contactForm = document.querySelector('.contato-form');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    // Integrar aqui com FormSubmit ou outro serviço de envio, igual aos demais sites da Krug/LR Web Design.
  });
}

// Cabeçalho: sombra mais forte ao rolar + link da seção atual
(function () {
  const header = document.querySelector('.site-header');
  const links = document.querySelectorAll('.main-nav a, .mobile-nav a');
  if (!header || !links.length) return;

  const page = location.pathname.split('/').pop() || 'index.html';
  const sections = ['sobre', 'seu-momento', 'contato']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function update() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);

    // seção mais abaixo que já passou de 40% da altura da tela
    let atual = null;
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) atual = s;
    });

    links.forEach((a) => {
      const href = a.getAttribute('href') || '';
      const ativo = atual
        ? href.endsWith('#' + atual.id)
        : href === page || (page === '' && href === 'index.html');
      a.classList.toggle('is-active', ativo);
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* ===== QUAL BISCOITO COMBINA COM O SEU MOMENTO ===== */
(function () {
  const stage = document.getElementById('momentoStage');
  if (!stage) return;

  const nome = document.getElementById('momentoNome');
  const cta = document.getElementById('momentosCta');
  const surpresa = document.getElementById('momentosSurpresa');
  const botoes = document.querySelectorAll('.momento-btn');

   const BISCOITOS = {
    ervas:       { nome: 'Palito de Ervas',       img: 'imagens/caixas/palito_ervas.png',        halo: '#8CCB3F' },
    parmesao:    { nome: 'Palito de Parmesão',    img: 'imagens/caixas/palito_parmesao.png',     halo: '#F2B61F' },
    bacon:       { nome: 'Palito de Bacon',       img: 'imagens/caixas/bacon.png',               halo: '#D9262B' },
    coco:        { nome: 'Biscoito de Coco',      img: 'imagens/caixas/coco.png',                halo: '#EADFC9' },
    chocolate:   { nome: 'Biscoito de Chocolate', img: 'imagens/caixas/chocolate.png',           halo: '#8A4B32' },
    mel:         { nome: 'Coração de Mel',        img: 'imagens/caixas/mel.png',                 halo: '#E07B1A' },
    milho:       { nome: 'Biscoito de Milho',     img: 'imagens/caixas/milho.png',               halo: '#F0B429' },
    amanteigado: { nome: 'Coração Amanteigado',   img: 'imagens/caixas/coracao_amanteigado.png', halo: '#F1D9A8' },
    doisAmores:  { nome: 'Dois Amores',           img: 'imagens/caixas/dois_amores.png',         halo: '#6E3B2A' }
  };

  // [id do biscoito, frase]. Com 3 itens, o do meio fica maior (e define a cor do halo)
  const MOMENTOS = {
    cafe:     { nome: 'Café da manhã',       itens: [['milho', 'sabor de infância pra abrir o dia'], ['amanteigado', 'macio e delicado, derrete na boca'], ['mel', 'um carinho de mel pra acompanhar o café']] },
    tarde:    { nome: 'Tardinha com café',   itens: [['doisAmores', 'dois sabores num só abraço'], ['coco', 'o par perfeito do cafezinho da tarde'], ['chocolate', 'cacau de verdade pra pausa merecida']] },
    happy:    { nome: 'Happy hour',          itens: [['ervas', 'sabor que combina com boas conversas'], ['parmesao', 'crocante e irresistível no seu brinde'], ['bacon', 'o clássico que não pode faltar']] },
    presente: { nome: 'Presente',            itens: [['doisAmores', 'pra quem tem lugar especial no coração'], ['mel', 'um presente que vem do coração'], ['chocolate', 'pra adoçar o dia de quem você ama']] },
    criancas: { nome: 'Lanche das crianças', itens: [['chocolate', 'lanche gostoso pra lancheira e pra casa'], ['coco', 'docinho que a criançada adora'], ['amanteigado', 'macio e docinho, a cara da infância']] },
    estrada:  { nome: 'Na estrada',          itens: [['milho', 'leve e fácil de beliscar no caminho'], ['parmesao', 'companhia crocante pra viagem'], ['ervas', 'pra beliscar e curtir o estrada afora']] }
  };

  const WHATS = 'https://wa.me/5551980302546?text=';
  let atual = 'happy';
  let rolando = false;

  // pré-carrega as caixinhas pra troca ser instantânea
  Object.values(BISCOITOS).forEach(b => { const i = new Image(); i.src = b.img; });

  function marcarBotao(chave) {
    botoes.forEach(b => {
      const ativo = b.dataset.momento === chave;
      b.classList.toggle('is-active', ativo);
      b.setAttribute('aria-pressed', ativo);
    });
  }

  function mostrar(chave) {
    const m = MOMENTOS[chave];
    if (!m) return;
    atual = chave;
    marcarBotao(chave);

    nome.textContent = m.nome;
    nome.classList.remove('troca');
    void nome.offsetWidth;            // reinicia a animação
    nome.classList.add('troca');

    const idxPrincipal = m.itens.length === 3 ? 1 : 0;
    stage.style.setProperty('--halo', BISCOITOS[m.itens[idxPrincipal][0]].halo);
    stage.dataset.count = m.itens.length;

    stage.innerHTML = m.itens.map(([id, frase], i) => {
      const b = BISCOITOS[id];
      return `
        <figure class="caixa" style="--i:${i}">
          <div class="caixa__float">
            <img src="${b.img}" alt="Caixinha de ${b.nome} Krug Biscoitos">
          </div>
          <figcaption><strong>${b.nome}</strong><span>${frase}</span></figcaption>
        </figure>`;
    }).join('');

    cta.href = WHATS + encodeURIComponent('Olá! Quero conhecer os biscoitos Krug para o momento: ' + m.nome);
  }

  botoes.forEach(b => b.addEventListener('click', () => { if (!rolando) mostrar(b.dataset.momento); }));

  // "Me surpreenda": passa pelos botões como um sorteio e para num momento diferente do atual
  surpresa.addEventListener('click', () => {
    if (rolando) return;
    rolando = true;
    surpresa.classList.add('is-rolling');

    const chaves = Object.keys(MOMENTOS);
    const outros = chaves.filter(k => k !== atual);
    const alvo = outros[Math.floor(Math.random() * outros.length)];
    const total = 9;
    let passo = 0;

    const timer = setInterval(() => {
      passo++;
      if (passo < total) {
        marcarBotao(chaves[passo % chaves.length]);
      } else {
        clearInterval(timer);
        rolando = false;
        surpresa.classList.remove('is-rolling');
        mostrar(alvo);
      }
    }, 110);
  });

  mostrar(atual);
})();