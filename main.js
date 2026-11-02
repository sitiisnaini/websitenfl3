/* ============================================================
   INTERAKSI WEBSITE NFL
   Konten dan tautan utama dapat diedit di js/data.js.
   ============================================================ */
(() => {
  'use strict';
  const config = window.NFL_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Render data-driven parts so text, photos, quotes and FAQs are editable in data.js.
  const galleryTrackElement = $('#galleryTrack');
  if (galleryTrackElement && Array.isArray(config.gallery) && config.gallery.length) {
    galleryTrackElement.replaceChildren();
    config.gallery.forEach((item) => {
      const figure = document.createElement('figure');
      figure.className = 'gallery-slide';
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || item.caption || 'Dokumentasi NFL';
      const caption = document.createElement('figcaption');
      const label = document.createElement('span');
      label.textContent = item.label || 'DOKUMENTASI NFL';
      const title = document.createElement('b');
      title.textContent = item.caption || 'Momen NFL';
      caption.append(label, title);
      figure.append(img, caption);
      galleryTrackElement.append(figure);
    });
  }

  const quoteGridElement = $('#quoteGrid');
  if (quoteGridElement && Array.isArray(config.testimonials) && config.testimonials.length) {
    quoteGridElement.replaceChildren();
    config.testimonials.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = `quote-card reveal${index === 1 ? ' quote-card-featured' : ''}`;
      const mark = document.createElement('div');
      mark.className = 'quote-mark';
      mark.textContent = '“';
      const quote = document.createElement('p');
      quote.textContent = item.quote || '';
      const person = document.createElement('div');
      person.className = 'quote-person';
      const avatar = document.createElement('div');
      avatar.className = `avatar avatar-${['one', 'two', 'three'][index % 3]}`;
      if (item.image) {
        const portrait = document.createElement('img');
        portrait.src = item.image;
        portrait.alt = `Ilustrasi contoh ${item.name || 'peserta NFL'}`;
        avatar.append(portrait);
      } else {
        avatar.textContent = item.initials || 'NFL';
      }
      const details = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = item.name || 'Nama Peserta';
      const role = document.createElement('span');
      role.textContent = item.role || 'Peserta NFL 2025';
      details.append(name, role);
      person.append(avatar, details);
      const note = document.createElement('span');
      note.className = 'sample-note';
      note.textContent = 'CONTOH TESTIMONI';
      card.append(mark, quote, person, note);
      quoteGridElement.append(card);
    });
  }

  const faqListElement = $('#faqList');
  if (faqListElement && Array.isArray(config.faqs) && config.faqs.length) {
    faqListElement.replaceChildren();
    config.faqs.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = `faq-item${index === 0 ? ' is-open' : ''}`;
      const heading = document.createElement('h3');
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-expanded', String(index === 0));
      const question = document.createElement('span');
      question.textContent = item.question || 'Pertanyaan';
      const icon = document.createElement('i');
      icon.textContent = index === 0 ? '−' : '＋';
      button.append(question, icon);
      heading.append(button);
      const answerWrap = document.createElement('div');
      answerWrap.className = 'faq-answer';
      const answer = document.createElement('p');
      answer.textContent = item.answer || '';
      answerWrap.append(answer);
      article.append(heading, answerWrap);
      faqListElement.append(article);
    });
  }

  // Apply links from the editable configuration.
  const links = config.links || {};
  $$('[data-register-link]').forEach((el) => { if (links.registration) el.href = links.registration; });
  $$('[data-website-link]').forEach((el) => { if (links.website) el.href = links.website; });
  $$('[data-instagram-link]').forEach((el) => { if (links.instagram) el.href = links.instagram; });
  $$('[data-email-link]').forEach((el) => { if (links.email) el.href = `mailto:${links.email}`; });
  $$('[data-phone-link]').forEach((el) => { if (links.phoneTel) el.href = `tel:${links.phoneTel}`; });
  const phoneText = $('.footer-phone');
  if (phoneText && links.phoneDisplay) {
    const label = document.createTextNode(links.phoneDisplay);
    const arrow = phoneText.querySelector('span');
    phoneText.replaceChildren(label, arrow || document.createTextNode(' ↗'));
  }

  // Mobile navigation.
  const menuToggle = $('#menuToggle');
  const primaryNav = $('#primaryNav');
  const closeMenu = () => {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka navigasi');
    primaryNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Tutup navigasi' : 'Buka navigasi');
    primaryNav?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  $$('#primaryNav a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  // Scroll progress indicator.
  const progress = $('#scrollProgress');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Reveal on scroll (with a fallback for older browsers).
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Gallery carousel: auto-play, manual arrows, dots, keyboard and pause-on-hover.
  const gallery = $('#galleryFrame');
  const track = $('#galleryTrack');
  const slides = $$('.gallery-slide', track || document);
  const dotsWrap = $('#galleryDots');
  const count = $('#galleryCount');
  const prev = $('#galleryPrev');
  const next = $('#galleryNext');
  let galleryIndex = 0;
  let galleryTimer = null;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const updateGallery = () => {
    if (!track || !slides.length) return;
    track.style.transform = `translateX(-${galleryIndex * 100}%)`;
    if (count) count.innerHTML = `${String(galleryIndex + 1).padStart(2, '0')} <span>/ ${String(slides.length).padStart(2, '0')}</span>`;
    $$('.gallery-dots button', dotsWrap || document).forEach((dot, index) => dot.setAttribute('aria-current', String(index === galleryIndex)));
  };
  const goToSlide = (index) => {
    if (!slides.length) return;
    galleryIndex = (index + slides.length) % slides.length;
    updateGallery();
  };
  if (dotsWrap && slides.length) {
    slides.forEach((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Buka foto ${index + 1}`);
      dot.setAttribute('aria-current', String(index === 0));
      dot.addEventListener('click', () => { goToSlide(index); restartGalleryTimer(); });
      dotsWrap.append(dot);
    });
  }
  prev?.addEventListener('click', () => { goToSlide(galleryIndex - 1); restartGalleryTimer(); });
  next?.addEventListener('click', () => { goToSlide(galleryIndex + 1); restartGalleryTimer(); });
  gallery?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { goToSlide(galleryIndex - 1); restartGalleryTimer(); }
    if (event.key === 'ArrowRight') { goToSlide(galleryIndex + 1); restartGalleryTimer(); }
  });
  const stopGalleryTimer = () => { if (galleryTimer) window.clearInterval(galleryTimer); galleryTimer = null; };
  const startGalleryTimer = () => {
    stopGalleryTimer();
    if (!reducedMotion && slides.length > 1) galleryTimer = window.setInterval(() => goToSlide(galleryIndex + 1), 5000);
  };
  function restartGalleryTimer() { startGalleryTimer(); }
  gallery?.addEventListener('mouseenter', stopGalleryTimer);
  gallery?.addEventListener('mouseleave', startGalleryTimer);
  gallery?.addEventListener('focusin', stopGalleryTimer);
  gallery?.addEventListener('focusout', startGalleryTimer);
  document.addEventListener('visibilitychange', () => document.hidden ? stopGalleryTimer() : startGalleryTimer());
  updateGallery();
  startGalleryTimer();

  // Event phase detail accordion — only one phase is open at a time.
  const phaseButtons = $$('.phase-button');
  phaseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('aria-controls');
      const target = targetId ? document.getElementById(targetId) : null;
      const shouldOpen = button.getAttribute('aria-expanded') !== 'true';
      phaseButtons.forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        const panel = document.getElementById(other.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
      });
      if (shouldOpen && target) {
        button.setAttribute('aria-expanded', 'true');
        target.hidden = false;
      }
    });
  });

  // FAQ accordion.
  $$('.faq-item').forEach((item) => {
    const button = $('button', item);
    button?.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      $$('.faq-item').forEach((other) => {
        other.classList.remove('is-open');
        $('button', other)?.setAttribute('aria-expanded', 'false');
        const icon = $('button i', other);
        if (icon) icon.textContent = '＋';
      });
      if (willOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        const icon = $('i', button);
        if (icon) icon.textContent = '−';
      }
    });
  });
})();
