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

  // Fetch on load
  useEffect(() => {
    fetchImageAndCaption()
  }, [])

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Random AI Image + Caption</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {image && <img src={image} alt="Random" className="mx-auto mb-4" />}
      {caption && <p className="text-xl italic">{caption}</p>}

      <button
        onClick={fetchImageAndCaption}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate New
      </button>
    </div>
  )
}

export default ApiDemo