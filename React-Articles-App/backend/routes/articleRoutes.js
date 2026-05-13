const express = require("express");
const fs = require("fs");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const articlesFile = path.join(__dirname, "../data/articles.json");

function readArticles() {
  return JSON.parse(fs.readFileSync(articlesFile, "utf-8"));
}

function writeArticles(articles) {
  fs.writeFileSync(articlesFile, JSON.stringify(articles, null, 2));
}

router.get("/", (req, res) => {
  const articles = readArticles();
  res.json(articles);
});

router.get("/my-articles", authMiddleware, (req, res) => {
  const articles = readArticles();

  const myArticles = articles.filter(
    (article) => article.authorId === req.user.id
  );

  res.json(myArticles);
});

router.get("/:id", (req, res) => {
  const articles = readArticles();

  const article = articles.find((article) => article.id === req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article introuvable" });
  }

  res.json(article);
});

router.post("/", authMiddleware, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Titre et contenu requis" });
  }

  const articles = readArticles();

  const newArticle = {
    id: Date.now().toString(),
    title,
    content,
    authorId: req.user.id,
    authorEmail: req.user.email,
    createdAt: new Date().toISOString()
  };

  articles.push(newArticle);
  writeArticles(articles);

  res.status(201).json(newArticle);
});

router.put("/:id", authMiddleware, (req, res) => {
  const { title, content } = req.body;

  const articles = readArticles();

  const articleIndex = articles.findIndex(
    (article) => article.id === req.params.id
  );

  if (articleIndex === -1) {
    return res.status(404).json({ message: "Article introuvable" });
  }

  if (articles[articleIndex].authorId !== req.user.id) {
    return res.status(403).json({ message: "Action interdite" });
  }

  articles[articleIndex] = {
    ...articles[articleIndex],
    title,
    content,
    updatedAt: new Date().toISOString()
  };

  writeArticles(articles);

  res.json(articles[articleIndex]);
});

router.delete("/:id", authMiddleware, (req, res) => {
  const articles = readArticles();

  const article = articles.find((article) => article.id === req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article introuvable" });
  }

  if (article.authorId !== req.user.id) {
    return res.status(403).json({ message: "Action interdite" });
  }

  const updatedArticles = articles.filter(
    (article) => article.id !== req.params.id
  );

  writeArticles(updatedArticles);

  res.json({ message: "Article supprimé" });
});

module.exports = router;