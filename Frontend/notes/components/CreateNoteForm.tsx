"use client"

import { useState } from "react"
import { createNote } from "@/lib/api/notes"
import NoteResult from "./NoteResult" 
import { TextArea } from "@heroui/react"

export default function CreateNoteForm() {

  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<any | null>(null)

  const handleSubmit = async () => {

    setError("")

    if (!note.trim()) {
      setError("Note cannot be empty")
      return
    }

    if (note.length > 500) {
      setError("Note must be under 500 characters")
      return
    }

    try {

      setLoading(true)

      const data = await createNote(note)

      setResult(data)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setNote("")
    setResult(null)
    setError("")
  }

  if (result) {
    return <NoteResult result={result} onClick={handleReset} />
  }

  return (
    <div className="w-full">
      <TextArea
        id="textarea"
        name="textarea"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your private note..."
        className="w-full min-h-[50vh] rounded-md p-3 shadow-xl shadow-[#cccccc20] 
        bg-[#00000010] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 
        border-0 hover:border-0 focus:border-0 ring-0 hover:ring-0 focus:ring-0"
        rows={6}
      />
      <div className="flex items-center justify-between  rounded-full px-4">
        {error && <div className="text-md text-red-500 ">{error}</div>}
        <div className={  `mt-1 text-md text-right ${note.length > 500 ? "text-red-500 " : ""}`}>
          {note.length} / 500
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 w-full rounded-md cursor-pointer bg-[#666] py-2 text-white hover:bg-[#555] disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Note"}
      </button>
    </div>
  )
}