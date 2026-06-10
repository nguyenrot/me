import tailwindcss from '@tailwindcss/vite'

// Inline pre-hydration script. Reads the theme preference cookie and resolves
// `system` against matchMedia so the correct data-theme attributes are on
// <html> BEFORE Vue hydrates — without this, system-mode users would see a
// one-frame flash. Kept inline so it ships in the head before the JS bundle.
const PREBOOT = `(function(){try{
  function readCookie(name){var m=document.cookie.match(new RegExp('(?:^|; )'+name+'=([^;]+)'));return m?decodeURIComponent(m[1]):null;}
  var theme=readCookie('kn:theme')||'system';
  if(theme!=='dark'&&theme!=='light'&&theme!=='system')theme='system';
  var resolved=theme;
  if(theme==='system'){
    var dark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
    resolved=dark?'dark':'light';
  }
  var accent=readCookie('kn:accent')||'lime';
  if(['lime','amber','cyan','rose','violet'].indexOf(accent)<0)accent='lime';
  var density=readCookie('kn:density')||'cozy';
  if(['compact','cozy','roomy'].indexOf(density)<0)density='cozy';
  var lang=readCookie('kn:lang')||'en';
  if(lang!=='en'&&lang!=='vi')lang='en';
  var root=document.documentElement;
  root.setAttribute('data-theme',resolved);
  root.setAttribute('data-theme-pref',theme);
  root.setAttribute('data-accent',accent);
  root.setAttribute('data-density',density);
  root.setAttribute('lang',lang);
}catch(e){}})();`

export default defineNuxtConfig({
  compatibilityDate: '2026-05-26',

  // SSR + Nitro (universal). Plain per-request SSR — no ISR: the rendered
  // HTML is personalized by the `kn:lang` cookie, and ISR caches by URL only,
  // which poisoned the language cache for all visitors (and cached API-down
  // fallbacks for 5 minutes).
  ssr: true,

  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots'],

  // Public portfolio — emit an indexable robots.txt that points Google at the
  // sitemap. The single page ('/') is auto-discovered from the router.
  site: {
    url: 'https://me.kynguyen.cc',
    name: 'Phạm Kỷ Nguyên',
  },

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.kynguyen.cc',
    },
  },

  app: {
    head: {
      title: 'Phạm Kỷ Nguyên — Software Engineer',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content:
            'Phạm Kỷ Nguyên — Software Development Engineer at Workday, based in Đà Nẵng, Việt Nam.',
        },
        { name: 'theme-color', content: '#0a0a0a', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#f6f4ef', media: '(prefers-color-scheme: light)' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/kn-mark.svg' },
        { rel: 'shortcut icon', href: '/kn-mark.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap',
        },
      ],
      script: [
        {
          innerHTML: PREBOOT,
          tagPosition: 'head',
        },
      ],
    },
  },

  typescript: {
    strict: true,
  },
})
