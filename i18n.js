// i18n.js — TR (varsayılan) / EN dil yönetimi.
// Tüm metin [data-i18n="key"] taşıyan elemanlardan okunur; sözlük
// translations.js'te. Seçim localStorage'da saklanır.

import { I18N, JSONLD } from './translations.js';

// Arama motorları için yapısal veri (dilden bağımsız).
function injectJsonLd() {
  if (document.getElementById('jsonld-org')) return;
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.id = 'jsonld-org';
  s.textContent = JSON.stringify(JSONLD);
  document.head.appendChild(s);
}

const STORAGE_KEY = 'cryapim-lang';
const DEFAULT_LANG = 'tr';
const SUPPORTED = ['tr', 'en'];

function getInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved)) return saved;
  // Tarayıcı dili İngilizce ise EN, aksi halde TR (varsayılan).
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  return nav === 'en' ? 'en' : DEFAULT_LANG;
}

function apply(lang) {
  const dict = I18N[lang] || I18N[DEFAULT_LANG];

  // 1) Tüm metin düğümleri
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key in dict) el.textContent = dict[key];
  });

  // 2) <html lang> + belge başlığı + açıklama
  document.documentElement.lang = lang;
  if (dict['meta.title']) document.title = dict['meta.title'];
  const desc = document.querySelector('meta[name="description"]');
  if (desc && dict['meta.description']) desc.setAttribute('content', dict['meta.description']);

  // 3) Toggle butonu durumu
  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    const isActive = btn.getAttribute('data-lang-btn') === lang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  localStorage.setItem(STORAGE_KEY, lang);
}

function init() {
  injectJsonLd();
  let current = getInitialLang();
  apply(current);

  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang-btn');
      if (lang !== current) {
        current = lang;
        apply(current);
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
