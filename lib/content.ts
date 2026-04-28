const API_BASE = process.env.API_URL || 'https://api.pkn.io.vn'

export async function getContent<T>(app: string, section: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/content/${app}/${section}`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return fallback
    const json = await res.json()
    return (json.data ?? json) as T
  } catch {
    return fallback
  }
}
