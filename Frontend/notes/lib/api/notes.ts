import { apiFetch } from "./client"

export async function createNote(text: string, expiresIn?: number) {
  return apiFetch("/notes", {
    method: "POST",
    body: JSON.stringify({
      content: text,
      expiry: expiresIn
    })
  })
}

export async function checkNote(noteId: string) {
  return apiFetch(`/notes/${noteId}`)
}

export async function unlockNote(noteId: string, password: string) {
  return apiFetch(`/notes/${noteId}/unlock`, {
    method: "POST",
    body: JSON.stringify({ password })
  })
}

export async function summarize(noteId: string) {
  return apiFetch(`/notes/summarize/${noteId}`)
}