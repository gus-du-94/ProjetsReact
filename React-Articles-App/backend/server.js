const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend Node.js fonctionne" });
});

app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});