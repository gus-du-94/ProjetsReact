const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const SECRET_KEY = "secret_jwt_key";
const usersFile = path.join(__dirname, "../data/users.json");

function readUsers() {
  return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  const users = readUsers();

  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: "Utilisateur déjà existant" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "Inscription réussie" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Connexion réussie",
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
});

module.exports = router;