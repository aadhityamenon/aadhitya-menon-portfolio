import express from "express";
import cors from "cors";
import dotenv from "dotenv"

//configuration of api keys
dotenv.config();

console.log("BACKEND IS RUNNING");

// Restrict CORS to the deployed frontend origin(s), set as a comma-separated
// list in FRONTEND_ORIGIN (e.g. "https://your-site.netlify.app"). Falls back
// to allowing any origin if unset, so local dev keeps working out of the box.
const allowedOrigins = process.env.FRONTEND_ORIGIN?.split(",").map(o => o.trim());
if (!allowedOrigins) {
  console.warn("Warning: FRONTEND_ORIGIN is not set. CORS is open to all origins.");
}

const app = express();
app.use(cors(allowedOrigins ? { origin: allowedOrigins } : undefined));
app.use(express.json());

// Port configuration
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is alive")
})