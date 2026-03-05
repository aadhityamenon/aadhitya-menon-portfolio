import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import axios from "axios"

dotenv.config();

const queries = [
    "sheep", "suggestion", "woman", "cellar", "trail", "smell", "year",
    "education", "zebra", "chance", "bat", "spot", "friction", "hydrant",
    "beds", "side", "scale", "circle", "calculator", "afterthought",
    "plastic", "wind", "bee", "button", "nest", "lettuce", "hair",
    "tree", "vest", "birth", "relation", "tail", "join", "doll", "milk",
    "produce", "squirrel", "money", "test", "office", "brick", "hour",
    "breath", "umbrella", "cause", "rifle", "sugar", "field", "leg",
    "straw", "jam", "waste", "sea", "peace", "chicken", "earth", "tray",
    "toys", "coil", "advice", "bulb", "pear", "reward", "blow", "birds",
    "cart", "berry", "scissors", "cats", "apparatus", "coat", "change",
    "thunder", "route", "soda", "day", "skirt", "jeans", "legs",
    "hammer", "attraction", "pigs", "turn", "lake", "sheet", "army",
    "crook", "kettle", "cough", "partner", "smile", "record", "twig",
]

console.log("BACKEND IS RUNNING");
if (!process.env.OPENROUTER_API_KEY) {
  console.warn("Warning: OPENROUTER_API_KEY is not set. AI calls will fail.");
}

async function getCaption(query) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('No AI API key configured (REACT_APP_OPENROUTER_API_KEY).');

  const isOpenRouter = !!process.env.OPENROUTER_API_KEY;
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const headers = {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
  };
  const payload = {
    "model": "openai/gpt-oss-120b:free",
    "messages": [
      {
        "role": "user",
        "content": `Write ONE sentence describing a photo of ${query}. Do not include lists, bullet points, explanations, or multiple options.`
      }
]
};
  const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
  return data.choices[0].message.content;
}

const app = express();
app.use(cors());
app.use(express.json());


function generateRandomQuery() {
  return queries[Math.floor(Math.random() * queries.length)]
}

app.get("/generate", async (req, res) => {
  console.log("GENERATE ROUTE HIT");
  try {
    const query = generateRandomQuery()

    const response = await axios.get(
      "https://pixabay.com/api/",
      {
        params: {
          key: process.env.PIXABAY_API_KEY,
          q: query,
          image_type: "photo",
          per_page: 3
        }
      }
    )

    const hits = response.data?.hits || []

    const imageUrl =
      hits.length > 0
        ? hits[0].largeImageURL
        : "https://cdn.pixabay.com/photo/2016/11/29/03/53/adult-1867665_1280.jpg"

    const caption = await getCaption(query)

    res.json({
      image: imageUrl,
      caption
    })

  } catch (err) {
    console.error("FULL ERROR:", err.response?.data || err.message)
    res.status(500).json({ error: "Failed", details: err.response?.data || err.message })
  }
})



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is alive")
})