/*
  Rastreamento do site Krug Biscoitos: Google Analytics 4 + Pixel do Meta.
  Montado pela DM Performance Digital (gestão de tráfego da Krug) em 17/11/2026.
  Chamar no <head> de todas as páginas:  <script src="/js/rastreio.js" defer></script>
  Mudança neste arquivo: falar antes com a DM.
*/
(function () {
  'use strict';
 
  var GA4_ID = 'G-VF5KMSX0LR';
  var PIXEL_ID = '1135084582710717';
 
  // ---------- Google Analytics 4 ----------
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA4_ID);
  var tagGA = document.createElement('script');
  tagGA.async = true;
  tagGA.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
  document.head.appendChild(tagGA);
 
  // ---------- Pixel do Meta (código base oficial) ----------
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', PIXEL_ID);
 
  // ---------- Funções de envio ----------
  function novoId() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
  // eventID em todo evento do Meta: deixa pronta a API de Conversões sem contar em dobro
  function meta(evento, dados) {
    window.fbq('track', evento, dados || {}, { eventID: novoId() });
  }
  function ga(evento, parametros) {
    gtag('event', evento, parametros || {});
  }
 
  var caminho = location.pathname.toLowerCase();
 
  meta('PageView');
 
  // Página de sabores: público de remarketing no Meta
  if (caminho.indexOf('sabores') !== -1) {
    meta('ViewContent', { content_name: 'Sabores' });
  }
 
  // ---------- Cliques ----------
  // Onde fica o botão: cabecalho, rodape ou o id da seção (seu-momento, contato...)
  function localDo(el) {
    if (el.closest('header')) return 'cabecalho';
    if (el.closest('footer')) return 'rodape';
    var secao = el.closest('section[id]');
    return secao ? secao.id : 'pagina';
  }
 
  document.addEventListener('click', function (e) {
    var alvo = e.target;
    if (!alvo || !alvo.closest) return;
 
    // Escolha de momento na seção "Seu momento"
    var botaoMomento = alvo.closest('[data-momento], #momentosSurpresa');
    if (botaoMomento) {
      ga('escolher_momento', {
        momento: botaoMomento.id === 'momentosSurpresa' ? 'surpresa' : botaoMomento.getAttribute('data-momento')
      });
      return;
    }
 
    var link = alvo.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var local = localDo(link);
 
    if (/wa\.me|api\.whatsapp\.com|whatsapp\.com\/send/i.test(href)) {
      var parametros = { local: local };
      if (link.id === 'momentosCta') {
        var nome = document.getElementById('momentoNome');
        if (nome) parametros.momento = nome.textContent.trim();
      }
      ga('contato_whatsapp', parametros);
      meta('Contact', { content_name: 'WhatsApp', content_category: local });
    } else if (/instagram\.com/i.test(href)) {
      ga('clique_instagram', { local: local });
    } else if (/^mailto:/i.test(href)) {
      ga('clique_email', { local: local });
    }
  }, true);
 
  // ---------- Formulário de contato ----------
  // O FormSubmit leva para obrigado.html. A conversão só conta se a pessoa
  // enviou o formulário nesta aba (abrir obrigado.html direto não conta).
  var CHAVE_FORM = 'krug_form_enviado';
  var form = document.querySelector('form.contato-form');
  if (form) {
    form.addEventListener('submit', function () {
      try { sessionStorage.setItem(CHAVE_FORM, '1'); } catch (err) { /* navegador sem sessionStorage */ }
    });
  }
  if (caminho.indexOf('obrigado') !== -1) {
    var enviou = false;
    try {
      enviou = sessionStorage.getItem(CHAVE_FORM) === '1';
      sessionStorage.removeItem(CHAVE_FORM);
    } catch (err) {
      enviou = /formsubmit\.co/i.test(document.referrer);
    }
    if (enviou) {
      ga('generate_lead', { local: 'formulario_contato' });
      meta('Lead', { content_name: 'Formulario de contato' });
    }
  }
 
  // ---------- Rolagem 25 / 50 / 90% (engajamento, não é conversão) ----------
  var marcosRolagem = [25, 50, 90];
  var rolagemEnviada = {};
  var rolagemAgendada = false;
  function medirRolagem() {
    rolagemAgendada = false;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var pct = total > 0 ? (window.scrollY / total) * 100 : 100;
    for (var i = 0; i < marcosRolagem.length; i++) {
      var m = marcosRolagem[i];
      if (pct >= m && !rolagemEnviada[m]) {
        rolagemEnviada[m] = true;
        ga('scroll_pagina', { percent_scrolled: m });
      }
    }
  }
  window.addEventListener('scroll', function () {
    if (rolagemAgendada) return;
    rolagemAgendada = true;
    window.requestAnimationFrame(medirRolagem);
  }, { passive: true });
 
  // ---------- Tempo na página: 30 s a 180 s, só com a aba visível ----------
  var segundosVisiveis = 0;
  var proximoMarco = 30;
  var relogio = setInterval(function () {
    if (document.visibilityState !== 'visible') return;
    segundosVisiveis++;
    if (segundosVisiveis >= proximoMarco) {
      ga('tempo_pagina', { segundos: proximoMarco });
      proximoMarco += 30;
      if (proximoMarco > 180) clearInterval(relogio);
    }
  }, 1000);
})();
