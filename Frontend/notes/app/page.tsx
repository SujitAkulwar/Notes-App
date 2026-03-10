"use client"
import CreateNoteForm from "@/components/CreateNoteForm"

import { useState } from "react"

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center px-4 flex-1 min-h-full w-full max-w-200 m-auto">
        <h1 className="mb-6 text-center opacity-90 text-3xl font-semibold text-shadow-2xs text-shadow-[#00eeff20] ">
          Create Note
        </h1>
        <CreateNoteForm />
    </div>
  )
}