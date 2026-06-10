/**
 * Zero-dependency sanitizer for CMS-provided rich text rendered via v-html.
 *
 * Strategy: escape EVERYTHING first, then re-enable an exact allowlist of
 * tags the CMS actually uses (`<br>`/`<br/>`, `<strong>`, `<em>`, and
 * `<span class="...">` with a class allowlist). No other tag, attribute or
 * event handler can survive — script/style/onclick etc. stay escaped.
 */

const SAFE_SPAN_CLASSES = new Set(['muted', 'dim'])

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function sanitizeHtml(input: unknown): string {
  if (typeof input !== 'string' || input.length === 0) return ''

  let out = escapeHtml(input)

  // <br> / <br/> / <br />
  out = out.replace(/&lt;br\s*\/?\s*&gt;/gi, '<br/>')

  // <strong> / <em> open + close (no attributes allowed)
  out = out.replace(/&lt;(strong|em)&gt;/gi, '<$1>')
  out = out.replace(/&lt;\/(strong|em)&gt;/gi, '</$1>')

  // <span class="..."> where every class is in the allowlist
  out = out.replace(
    /&lt;span class=&quot;([a-zA-Z0-9_\- ]+)&quot;&gt;/g,
    (match, cls: string) => {
      const classes = cls.trim().split(/\s+/)
      if (classes.length > 0 && classes.every((c) => SAFE_SPAN_CLASSES.has(c))) {
        return `<span class="${classes.join(' ')}">`
      }
      return match
    },
  )
  out = out.replace(/&lt;\/span&gt;/gi, '</span>')

  return out
}

/**
 * Allow only http:, https:, mailto: and relative paths starting with `/`
 * for CMS-controlled URLs bound to :href. Everything else (javascript:,
 * data:, vbscript:, protocol-relative //…) collapses to '#'.
 */
export function safeUrl(u: unknown): string {
  if (typeof u !== 'string') return '#'
  const url = u.trim()
  if (url.startsWith('/') && !url.startsWith('//')) return url
  if (/^https?:\/\//i.test(url)) return url
  if (/^mailto:/i.test(url)) return url
  return '#'
}
