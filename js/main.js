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
const galleryItems = document.querySelectorAll('.momentos-gallery > .ph-photo');
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
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
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
  const WHATS_NUMERO = "5551999999999"; // troque pelo número da Krug (55 + DDD + número)

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

  const selectEl   = document.getElementById("ondeCidade");
  const tituloEl   = document.getElementById("ondeCidadeTitulo");
  const contadorEl = document.getElementById("ondeContadorTexto");
  const listaEl    = document.getElementById("ondeLista");
  const filtrosEl  = document.getElementById("ondeFiltros");
  const whatsEl    = document.getElementById("ondeWhats");
  if (!selectEl || !listaEl) return;

  let tipoAtivo = "todos";

  Object.keys(PONTOS).forEach(function (cidade) {
    const opt = document.createElement("option");
    opt.value = cidade;
    opt.textContent = cidade;
    selectEl.appendChild(opt);
  });

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
    const cidade = selectEl.value;
    const todos = PONTOS[cidade] || [];
    const visiveis = todos.filter(function (p) {
      return tipoAtivo === "todos" || p.tipo === tipoAtivo;
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

  selectEl.addEventListener("change", render);

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