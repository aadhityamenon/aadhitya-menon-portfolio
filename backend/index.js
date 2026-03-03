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
      "https://api.pexels.com/v1/search",
      {
        params: { query, per_page: 1 },
        headers: {
          Authorization: process.env.PEXELS_API_KEY
        }
      }
    )

    const imageUrl = response.data.photos[0].src.original

    const aiResponse = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct:free",
      messages: [
        { role: "user", content: `Generate a short creative caption for ${query}` }
      ]
    })

    const caption = response.choices[0].message.content

    res.json({
      image: imageUrl,
      caption
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "AI failed" })
  }
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is alive")
})