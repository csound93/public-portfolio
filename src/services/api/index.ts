const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`)
  if (!res.ok) throw new Error("API error")
  return res.json()
} 