import { useEffect, useState } from "react";

function ApiDemo() {
  const [image, setImage] = useState<string>("")
  const [caption, setCaption] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchImageAndCaption = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch("https://portfolio-guov.onrender.com/generate")
      if (!res.ok) throw new Error("Backend request failed")
      const data = await res.json()

      setImage(data.image)
      setCaption(data.caption)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImageAndCaption()
  }, [])

  return (
    <main className="min-h-screen pt-14">
      <div className="max-w-5xl mx-auto px-8 py-24">

        {/* Header */}
        <div className="border-b border-stone-200 pb-8 mb-16">
          <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400 tracking-widest uppercase">
            Experiment
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl mt-4">
            AI Image Generator
          </h1>
          <p className="mt-4 text-stone-400 text-sm max-w-md">
            Pulls a random image from Pixabay and generates a caption using an
            AI language model.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Image */}
          <div className="relative bg-stone-100 aspect-[4/3] overflow-hidden">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400 animate-pulse">
                  Generating...
                </span>
              </div>
            )}
            {image && !loading && (
              <img
                src={image}
                alt="Generated"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Caption + controls */}
          <div className="flex flex-col justify-between h-full gap-8">
            <div>
              {error && (
                <p className="font-[family-name:var(--font-mono)] text-xs text-red-400 mb-4">
                  Error: {error}
                </p>
              )}
              {caption && !loading && (
                <>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400 uppercase tracking-widest">
                    Caption
                  </span>
                  <p className="font-[family-name:var(--font-display)] text-2xl mt-3 text-stone-800 italic leading-snug">
                    "{caption}"
                  </p>
                </>
              )}
            </div>

            <button
              onClick={fetchImageAndCaption}
              disabled={loading}
              className="self-start px-6 py-3 border border-stone-900 text-sm text-stone-900 hover:bg-stone-900 hover:text-stone-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Generate New"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


export default ApiDemo