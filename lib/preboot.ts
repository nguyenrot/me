// Inline pre-hydration script. Reads the theme preference cookie and resolves
// `system` against matchMedia so the correct `data-theme` is on <html> BEFORE
// React hydrates. Without this, system-mode users would see a one-frame flash
// when the SSR fallback ("dark") doesn't match their OS preference.
//
// Kept as a string so it can be injected via dangerouslySetInnerHTML in
// app/layout.tsx without bundling React.
export const preboot = `(function(){try{
  var m=document.cookie.match(/(?:^|; )kn:theme=([^;]+)/);
  var pref=m?decodeURIComponent(m[1]):'system';
  if(pref!=='dark'&&pref!=='light'&&pref!=='system')pref='system';
  var resolved=pref;
  if(pref==='system'){
    var dark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
    resolved=dark?'dark':'light';
  }
  document.documentElement.setAttribute('data-theme',resolved);
  document.documentElement.setAttribute('data-theme-pref',pref);
}catch(e){}})();`;
