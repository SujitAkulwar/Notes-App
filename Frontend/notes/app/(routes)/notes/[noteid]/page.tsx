"use client"
import { use, useEffect, useState } from "react"
import { checkNote, unlockNote, summarize } from "@/lib/api/notes"
import Loading from "@/components/Loading"
import { Paper, Typography } from "@mui/material"
import { TypeAnimation } from "react-type-animation"

export default function NotePage({
  params
}: {
  params: Promise<{ noteid: string }>
}) {

  const { noteid } = use(params)

  const [loading, setLoading] = useState(true)
  const [exists, setExists] = useState(false)
  const [password, setPassword] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  const [summary, setSummary] = useState<string | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [summaryError, setSummaryError] = useState<string | null>(null)

  const [copiedContent, setCopiedContent] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)

  const copyContent = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedContent(true)
    setTimeout(() => {
      setCopiedContent(false)
    }, 2000)
  }

  const copySummary = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedSummary(true)
    setTimeout(() => {
      setCopiedSummary(false)
    }, 2000)
  }

  useEffect(() => {

    async function load() {

      try {
        await checkNote(noteid)
        setExists(true)
      } catch {
        setExists(false)
      }

      setLoading(false)
    }

    load()

  }, [noteid])


  const handleUnlock = async () => {

    setError("")

    try {
      const data = await unlockNote(noteid, password)
      setContent(data.content)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const getSummary = async () => {

    setSummaryLoading(true)
    setSummaryError(null)
    setSummary(null)

    try {
      const data = await summarize(noteid)
      setSummary(data.summary)
    } catch (err: any) {
      setSummaryError(err.message || "Failed to summarize note")
    }

    setSummaryLoading(false)
  }


  if (loading) {
    return <div className="p-10 text-center">Loading...</div>
  }

  if (!exists) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-4 w-full max-w-150 mx-auto
           space-y-4 rounded-md shadow-xl shadow-[#cccccc20]  min-h-[50vh] max-h-[50vh]
          bg-[#00000010] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 
          text-shadow-2xs text-shadow-[#00000080] font-semibold text-3xl
          border-0 hover:border-0 focus:border-0 ring-0 text-[#ff5555] hover:ring-0 focus:ring-0 mt-10">
        Note not found
      </div>
    )
  }

  if (content) {
    return (
      <div className="flex flex-col items-center justify-center xl:flex-row gap-4 xl:gap-6 mb-10">

        {/* NOTE CONTENT */}

        <div className="flex flex-col items-start justify-between flex-1 p-4 w-full max-w-150
             space-y-4 rounded-md shadow-xl shadow-[#cccccc20]  min-h-[50vh] max-h-[50vh]
            bg-[#00000010] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 
            border-0 hover:border-0 focus:border-0 ring-0 hover:ring-0 focus:ring-0 mt-10">

          <h2 className="text-xl text-center w-full font-semibold mb-4">
            Note Content
          </h2>

          <p className="text-start h-full flex-1 scroll-auto overflow-y-auto">
            {content}
          </p>

          {copiedContent && (
            <p className="text-green-500 text-sm">Copied to clipboard!</p>
          )}

          <div className="flex w-full gap-4">

            <button
              onClick={() => copyContent(content)}
              className="rounded-md cursor-pointer w-full bg-[#666] py-2 text-white hover:bg-[#888] px-4"
            >
              Copy
            </button>

            <button
              onClick={getSummary}
              disabled={summaryLoading}
              className="rounded-md cursor-pointer w-full bg-[#555] py-2 text-white hover:bg-[#777] px-4 disabled:bg-gray-400"
            >
              Summarize
            </button>

          </div>

        </div>

        {summaryLoading && (
          <div className="flex flex-col items-center justify-center flex-1 p-4 w-full max-w-150
                space-y-4 rounded-md shadow-xl shadow-[#cccccc20] min-h-[50vh] max-h-[50vh]
                bg-[#00000010] backdrop-blur-md mt-10 overflow-y-auto">
            <Loading />
          </div>
        )}


        {summaryError && (
          <div className="flex flex-col items-center justify-center flex-1 p-4 w-full max-w-150
                space-y-4 rounded-md shadow-xl shadow-[#cccccc20] min-h-[50vh] max-h-[50vh]
                bg-[#00000010] backdrop-blur-md mt-10 text-red-500 text-center">
            {summaryError}
          </div>
        )}



        {summary && (
          <div className="flex flex-col items-start justify-between flex-1 p-4 w-full max-w-150
                space-y-4 rounded-md shadow-xl shadow-[#cccccc20] min-h-[50vh] max-h-[50vh]
                bg-[#00000010] backdrop-blur-md mt-10 overflow-y-auto">

            <h2 className="text-xl text-center w-full font-semibold">
              AI Summary
            </h2>

            <Paper
              elevation={0}
              sx={{
                flex: 1,
                width: "100%",
                p: 2,
                overflowY: "auto",
                background: "transparent"
              }}
            >
              <Typography variant="body1">

                <TypeAnimation
                  sequence={[
                    summary || "",
                  ]}
                  wrapper="span"
                  speed={70}
                  cursor={true}
                />

              </Typography>
            </Paper>

            {copiedSummary && (
              <p className="text-green-500 text-sm">Summary copied!</p>
            )}

            <button
              onClick={() => copySummary(summary)}
              className="rounded-md cursor-pointer w-full bg-[#666] py-2 text-white hover:bg-[#888] px-4"
            >
              Copy Summary
            </button>

          </div>
        )}

      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 flex-1 max-w-150 
         space-y-4 mx-auto w-full  rounded-md p-3 shadow-xl shadow-[#cccccc20] 
        bg-[#00000010] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 
        border-0 hover:border-0 focus:border-0 ring-0 hover:ring-0 focus:ring-0 mt-10">

      <h2 className="text-xl font-semibold text-center">
        Enter Password
      </h2>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded p-2"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        onClick={handleUnlock}
        disabled={loading}
        className="mt-4 w-full rounded-md cursor-pointer bg-[#666] py-2 text-white hover:bg-[#555] disabled:bg-gray-400"
      >
        Unlock Note
      </button>

    </div>
  )
}