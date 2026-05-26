/**
 * SSR-friendly content fetcher. Wraps `$fetch` with `useAsyncData` so the
 * payload is serialized into the rendered HTML and re-hydrated on the
 * client. Falls back to typed defaults if the API is unreachable.
 *
 * The 300s revalidation that the previous Next.js setup got from
 * `next: { revalidate: 300 }` is reproduced by the Nitro route rule
 * `routeRules: { '/': { isr: 300 } }` in `nuxt.config.ts` — the rendered
 * HTML (including this payload) is cached at the edge for 5 minutes.
 */
export async function fetchContent<T>(app: string, section: string, fallback: T): Promise<T> {
  const { public: { apiBase } } = useRuntimeConfig()
  const key = `content:${app}:${section}`

  const { data } = await useAsyncData<T>(key, async () => {
    try {
      const res = await $fetch<{ data?: T } | T>(
        `${apiBase}/api/v1/content/${app}/${section}`,
      )
      const payload = (res as { data?: T })?.data ?? (res as T)
      return (payload ?? fallback) as T
    } catch {
      return fallback
    }
  }, {
    default: () => fallback,
  })

  return (data.value ?? fallback) as T
}
