/**
 * SSR-friendly content fetcher. Wraps `$fetch` with `useAsyncData` so the
 * payload is serialized into the rendered HTML and re-hydrated on the
 * client. Falls back to typed defaults if the API is unreachable.
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
    } catch (err) {
      // Keep the typed fallback, but make the outage visible in pm2 logs.
      console.error(`[useContent] fetch failed for ${app}/${section}:`, err)
      return fallback
    }
  }, {
    default: () => fallback,
  })

  return (data.value ?? fallback) as T
}
