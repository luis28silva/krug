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

/* ---------- Onde encontrar ---------- */
(function () {
  const WHATS_NUMERO = "https://wa.me/5551980302546"; // troque pelo número da Krug (55 + DDD + número)

  const TIPOS = {
    padaria:  { rotulo: "Padaria",  icone: "fa-bread-slice" },
    mercado:  { rotulo: "Mercado",  icone: "fa-cart-shopping" },
    fruteira: { rotulo: "Fruteira", icone: "fa-apple-whole" }
  };

  // EXEMPLOS FICTÍCIOS: troque pelos locais reais. Para link exato, use o campo "link".
  const PONTOS = {
    "Igrejinha": [
      { nome: "Padaria Exemplo A",  tipo: "padaria",  bairro: "Centro" },
      { nome: "Mercado Exemplo A",  tipo: "mercado",  bairro: "Centro" },
      { nome: "Fruteira Exemplo A", tipo: "fruteira", bairro: "Bairro Exemplo" },
      { nome: "Padaria Exemplo B",  tipo: "padaria",  bairro: "Bairro Exemplo" },
      { nome: "Mercado Exemplo B",  tipo: "mercado",  bairro: "Bairro Exemplo" },
      { nome: "Fruteira Exemplo B", tipo: "fruteira", bairro: "Centro" }
    ],
    "Taquara": [
      { nome: "Mercado Exemplo C",  tipo: "mercado",  bairro: "Centro" },
      { nome: "Padaria Exemplo C",  tipo: "padaria",  bairro: "Bairro Exemplo" },
      { nome: "Fruteira Exemplo C", tipo: "fruteira", bairro: "Centro" },
      { nome: "Mercado Exemplo D",  tipo: "mercado",  bairro: "Bairro Exemplo" },
      { nome: "Padaria Exemplo D",  tipo: "padaria",  bairro: "Centro" },
      { nome: "Fruteira Exemplo D", tipo: "fruteira", bairro: "Bairro Exemplo" }
    ],
    "Três Coroas": [
      { nome: "Fruteira Exemplo E", tipo: "fruteira", bairro: "Centro" },
      { nome: "Mercado Exemplo E",  tipo: "mercado",  bairro: "Centro" },
      { nome: "Padaria Exemplo E",  tipo: "padaria",  bairro: "Bairro Exemplo" },
      { nome: "Mercado Exemplo F",  tipo: "mercado",  bairro: "Bairro Exemplo" },
      { nome: "Padaria Exemplo F",  tipo: "padaria",  bairro: "Centro" },
      { nome: "Fruteira Exemplo F", tipo: "fruteira", bairro: "Bairro Exemplo" }
    ],
    "Novo Hamburgo": [
      { nome: "Mercado Exemplo G",  tipo: "mercado",  bairro: "Centro" },
      { nome: "Padaria Exemplo G",  tipo: "padaria",  bairro: "Bairro Exemplo" },
      { nome: "Fruteira Exemplo G", tipo: "fruteira", bairro: "Centro" },
      { nome: "Mercado Exemplo H",  tipo: "mercado",  bairro: "Bairro Exemplo" },
      { nome: "Padaria Exemplo H",  tipo: "padaria",  bairro: "Centro" },
      { nome: "Fruteira Exemplo H", tipo: "fruteira", bairro: "Bairro Exemplo" }
    ],
    "Ivoti": [
      { nome: "Padaria Exemplo I",  tipo: "padaria",  bairro: "Centro" },
      { nome: "Mercado Exemplo I",  tipo: "mercado",  bairro: "Centro" },
      { nome: "Fruteira Exemplo I", tipo: "fruteira", bairro: "Bairro Exemplo" },
      { nome: "Mercado Exemplo J",  tipo: "mercado",  bairro: "Bairro Exemplo" },
      { nome: "Padaria Exemplo J",  tipo: "padaria",  bairro: "Bairro Exemplo" },
      { nome: "Fruteira Exemplo J", tipo: "fruteira", bairro: "Centro" }
    ]
  };

    const selectBox   = document.getElementById("ondeSelect");
  const selectBtn   = document.getElementById("ondeSelectBtn");
  const selectLabel = document.getElementById("ondeCidadeAtual");
  const selectList  = document.getElementById("ondeCidadeLista");
  const tituloEl    = document.getElementById("ondeCidadeTitulo");
  const contadorEl  = document.getElementById("ondeContadorTexto");
  const listaEl     = document.getElementById("ondeLista");
  const filtrosEl   = document.getElementById("ondeFiltros");
  const whatsEl     = document.getElementById("ondeWhats");
  if (!selectBox || !listaEl) return;

  const cidades = Object.keys(PONTOS);
  let cidadeAtual = cidades[0];
  let tipoAtivo = "todos";

  // monta a lista de cidades
  cidades.forEach(function (cidade) {
    const li = document.createElement("li");
    li.setAttribute("role", "option");
    li.dataset.cidade = cidade;
    li.innerHTML = "<span></span><i class='fa-solid fa-check'></i>";
    li.firstChild.textContent = cidade;
    selectList.appendChild(li);
  });

  function abrir() {
    selectBox.classList.add("is-open");
    selectBtn.setAttribute("aria-expanded", "true");
  }
  function fechar() {
    selectBox.classList.remove("is-open");
    selectBtn.setAttribute("aria-expanded", "false");
  }

  function linkDoLocal(p, cidade) {
    if (p.link) return p.link;
    const q = encodeURIComponent(p.nome + " " + cidade + " RS");
    return "https://www.google.com/maps/search/?api=1&query=" + q;
  }

  function criarCard(p, cidade) {
    const tipo = TIPOS[p.tipo];
    const a = document.createElement("a");
    a.className = "onde-card";
    a.dataset.tipo = p.tipo;
    a.href = linkDoLocal(p, cidade);
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML =
      '<span class="onde-card-icone"><i class="fa-solid ' + tipo.icone + '"></i></span>' +
      '<span class="onde-card-info"><strong></strong><small></small></span>' +
      '<i class="fa-solid fa-arrow-up-right-from-square onde-card-seta"></i>';
    a.querySelector("strong").textContent = p.nome;
    a.querySelector("small").textContent = tipo.rotulo + " · " + p.bairro;
    return a;
  }

  function render() {
    const cidade = cidadeAtual;
    const todos = PONTOS[cidade] || [];
    const visiveis = todos.filter(function (p) {
      return tipoAtivo === "todos" || p.tipo === tipoAtivo;
    });

    selectLabel.textContent = cidade;
    selectList.querySelectorAll("li").forEach(function (li) {
      li.setAttribute("aria-selected", li.dataset.cidade === cidade ? "true" : "false");
    });

    tituloEl.textContent = cidade;
    contadorEl.textContent =
      visiveis.length + (visiveis.length === 1 ? " local encontrado" : " locais encontrados");

    listaEl.innerHTML = "";
    if (!visiveis.length) {
      const vazio = document.createElement("p");
      vazio.className = "onde-vazio";
      vazio.textContent = "Ainda não temos pontos desse tipo em " + cidade +
        ". Fale com a gente pelo WhatsApp que ajudamos você a encontrar!";
      listaEl.appendChild(vazio);
    } else {
      visiveis.forEach(function (p) { listaEl.appendChild(criarCard(p, cidade)); });
    }

    const msg = "Olá! Quero encontrar os biscoitos Krug em " + cidade + ".";
    whatsEl.href = "https://wa.me/" + WHATS_NUMERO + "?text=" + encodeURIComponent(msg);
  }

  // abre/fecha clicando em qualquer parte da caixa (texto ou setinha)
  selectBtn.addEventListener("click", function () {
    selectBox.classList.contains("is-open") ? fechar() : abrir();
  });

  // escolhe a cidade
  selectList.addEventListener("click", function (e) {
    const li = e.target.closest("li[data-cidade]");
    if (!li) return;
    cidadeAtual = li.dataset.cidade;
    render();
    fechar();
    selectBtn.focus();
  });

  // fecha ao clicar fora ou apertar Esc
  document.addEventListener("click", function (e) {
    if (!selectBox.contains(e.target)) fechar();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") fechar();
  });

  // setas ↑ ↓ do teclado trocam de cidade
  selectBox.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    let i = cidades.indexOf(cidadeAtual) + (e.key === "ArrowDown" ? 1 : -1);
    i = Math.max(0, Math.min(cidades.length - 1, i));
    cidadeAtual = cidades[i];
    render();
    abrir();
  });

  filtrosEl.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-tipo]");
    if (!btn) return;
    tipoAtivo = btn.dataset.tipo;
    filtrosEl.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("is-active", b === btn);
    });
    render();
  });

  render();
})();

// Cabeçalho: sombra mais forte ao rolar + link da seção atual
(function () {
  const header = document.querySelector('.site-header');
  const links = document.querySelectorAll('.main-nav a, .mobile-nav a');
  if (!header || !links.length) return;

  const page = location.pathname.split('/').pop() || 'index.html';
  const sections = ['sobre', 'onde-encontrar', 'contato']
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