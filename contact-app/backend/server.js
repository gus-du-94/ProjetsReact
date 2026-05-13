const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const SECRET_KEY = "ma_cle_secrete";

app.use(cors());
app.use(express.json());

const user = {
  email: "admin@test.com",
  password: "1234",
};

let contacts = [
  {
    id: 1,
    firstName: "Thomas",
    lastName: "Durand",
    email: "thomas.durand@gmail.com",
    phone: "0601020304",
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Dupont",
    email: "marie.dupont@gmail.com",
    phone: "0677889900",
  },
  {
    id: 3,
    firstName: "Jean",
    lastName: "Martin",
    email: "jean.martin@gmail.com",
    phone: "0655443322",
  },
  {
    id: 4,
    firstName: "Sophie",
    lastName: "Bernard",
    email: "sophie.bernard@gmail.com",
    phone: "0622334455",
  },
  {
    id: 5,
    firstName: "Lucas",
    lastName: "Petit",
    email: "lucas.petit@gmail.com",
    phone: "0699887766",
  },
];

// Middleware JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token manquant",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({
      message: "Token invalide",
    });
  }
};

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({
      message: "Identifiants incorrects",
    });
  }

  const token = jwt.sign(
    { email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Connexion réussie",
    token,
  });
});

// GET contacts
app.get("/contacts", verifyToken, (req, res) => {
  res.json(contacts);
});

// POST contact
app.post("/contacts", verifyToken, (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({
      message: "Tous les champs sont obligatoires",
    });
  }

  const newContact = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    phone,
  };

  contacts.push(newContact);

  res.status(201).json(newContact);
});

// PUT contact
app.put("/contacts/:id", verifyToken, (req, res) => {
  const id = Number(req.params.id);

  const { firstName, lastName, email, phone } = req.body;

  const index = contacts.findIndex(
    (contact) => contact.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Contact introuvable",
    });
  }

  contacts[index] = {
    id,
    firstName,
    lastName,
    email,
    phone,
  };

  res.json(contacts[index]);
});

// DELETE contact
app.delete("/contacts/:id", verifyToken, (req, res) => {
  const id = Number(req.params.id);

  contacts = contacts.filter(
    (contact) => contact.id !== id
  );

  res.json({
    message: "Contact supprimé",
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});