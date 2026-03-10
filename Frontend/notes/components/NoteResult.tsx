"use client"

import { useState } from "react"

interface Props {
  result: any
  onClick: () => void
}

export default function NoteResult({ result, onClick }: Props) {

  const [copied, setCopied] = useState<"url" | "password" | null>(null)

  const copy = async (text: string, type: "url" | "password") => {
    await navigator.clipboard.writeText(text)

    setCopied(type)

    setTimeout(() => {
      setCopied(null)
    }, 2000)
  }

  return (

    <div className="space-y-4 py-5 w-full max-w-200 px-5 bg-[#00000010] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 rounded-md shadow-xl shadow-[#cccccc20]">

      <p className="text-xl font-semibold text-center">
        ✓ Note created successfully
      </p>

      {/* LINK */}

      <div>
        <label className="text-sm font-medium">Share Link</label>

        <div className="mt-1 flex gap-2">
          <input
            readOnly
            value={result.url}
            className="flex-1 rounded-md border p-2"
          />

          <button
            onClick={() => copy(result.url, "url")}
            className="rounded-md cursor-pointer bg-[#666] py-2 text-white hover:bg-[#555] px-4"
          >
            {copied === "url" ? "Copied!" : "Copy"}
          </button>
        </div>

        {copied === "url" && (
          <p className="text-green-600 text-xs mt-1">Link copied</p>
        )}
      </div>


      {/* PASSWORD */}

      <div>
        <label className="text-sm font-medium">Password</label>

        <div className="mt-1 flex gap-2">
          <input
            readOnly
            value={result.password}
            className="flex-1 rounded-md border p-2"
          />

          <button
            onClick={() => copy(result.password, "password")}
            className="rounded-md cursor-pointer bg-[#666] py-2 text-white hover:bg-[#555] px-4"
          >
            {copied === "password" ? "Copied!" : "Copy"}
          </button>
        </div>

        {copied === "password" && (
          <p className="text-green-600 text-xs mt-1">Password copied</p>
        )}
      </div>

      <button
        onClick={onClick}
        className="mt-4 w-full rounded-md cursor-pointer bg-[#666] py-2 text-white hover:bg-[#555]"
      >
        Create New Note
      </button>

    </div>
  )
}