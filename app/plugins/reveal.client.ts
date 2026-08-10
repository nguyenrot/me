/**
 * Scroll-reveal + count-up driver for the "Sunny Studio" design.
 *
 * - Elements with [data-reveal] get .is-in when they enter the viewport;
 *   the transition itself lives in main.css and only applies under
 *   <html data-js> (stamped by the preboot script in nuxt.config.ts),
 *   so crawlers and no-JS visitors always see the full page.
 * - Elements with [data-countup] animate their text from 0 up to the
 *   number they were server-rendered with, the first time they scroll in.
 *
 * With prefers-reduced-motion everything is shown immediately.
 */
export default defineNuxtPlugin(() => {
  // onNuxtReady fires after hydration AND the page's Suspense have fully
  // resolved — mutating [data-countup] text any earlier (e.g. app:mounted)
  // races the async index page's hydration and triggers mismatch warnings.
  onNuxtReady(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const countTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-countup]'))

    if (reduced) {
      revealTargets.forEach((el) => el.classList.add('is-in'))
      return
    }

    if (revealTargets.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
      )
      revealTargets.forEach((el) => io.observe(el))
    }

    if (countTargets.length) {
      const runCount = (el: HTMLElement) => {
        const target = parseInt(el.dataset.countup || el.textContent || '0', 10)
        if (!Number.isFinite(target)) return
        const pad = (el.textContent || '').startsWith('0') ? (el.textContent || '').length : 0
        const dur = 1000
        const start = performance.now()
        const frame = (now: number) => {
          const p = Math.min(1, (now - start) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          const val = String(Math.round(target * eased))
          el.textContent = pad ? val.padStart(pad, '0') : val
          if (p < 1) requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)
      }
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            runCount(entry.target as HTMLElement)
            cio.unobserve(entry.target)
          })
        },
        { threshold: 0.4 },
      )
      countTargets.forEach((el) => {
        // Remember the SSR-rendered final value, then zero the display so
        // the number always counts up when it scrolls into view.
        const rendered = (el.textContent || '').trim()
        if (!el.dataset.countup) el.dataset.countup = rendered
        el.textContent = rendered.startsWith('0') ? '0'.padStart(rendered.length, '0') : '0'
        cio.observe(el)
      })
    }
  })
})
