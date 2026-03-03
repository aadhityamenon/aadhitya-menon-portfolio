import {useEffect} from "react"


export default function Home() {
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => console.log("Backend says:", data))
      .catch(err => console.error("Error:", err))
  }, [])
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-2">Use the navigation bar to explore.</p>
    </main>
  );
}