import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import axios from "axios"
import OpenAI from "openai"


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
    "pickle", "branch", "space", "writing", "pie", "children", "alarm"
]
dotenv.config();

if (!process.env.OPENROUTER_API_KEY && !process.env.OPENAI_API_KEY) {
  console.warn("Warning: OPENROUTER_API_KEY or OPENAI_API_KEY is not set. AI calls will fail.");
}

// Helper that calls either OpenRouter or OpenAI chat completions endpoints using axios
async function getCaption(query) {
  const key = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
  if (!key) throw new Error('No AI API key configured (OPENROUTER_API_KEY or OPENAI_API_KEY).');

  const isOpenRouter = !!process.env.OPENROUTER_API_KEY;
  const url = isOpenRouter ? 'https://openrouter.ai/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions';
  const model = isOpenRouter ? 'google/gemma-3n-e4b-it:free' : 'gpt-4o-mini';

  const body = {
    model,
    messages: [{ role: 'user', content: `Generate a short creative caption for ${query}` }],
    max_tokens: 60
  };

  const headers = {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json'
  };

  const resp = await axios.post(url, body, { headers });

  // Try a few common response shapes
  const aiText = resp.data?.choices?.[0]?.message?.content || resp.data?.choices?.[0]?.text || resp.data?.output?.[0]?.content?.[0]?.text || '';
  return aiText;
}

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
})

function generateRandomQuery() {
  return queries[Math.floor(Math.random() * queries.length)]
}

app.get("/generate", async (req, res) => {
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

    console.log("PIXABAY RESPONSE:", response.data)

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



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is alive")
})