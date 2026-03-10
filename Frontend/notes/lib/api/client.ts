const API_BASE_URL = "http://localhost:5000/api"

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    }
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || "API Error")
  }
  return data
}