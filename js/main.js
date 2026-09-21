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
