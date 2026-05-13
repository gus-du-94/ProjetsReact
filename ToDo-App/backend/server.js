const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    text: "Apprendre React",
    completed: false,
  },
  {
    id: 2,
    text: "Créer une Todo List",
    completed: true,
  },
  {
    id: 3,
    text: "Connecter le frontend au backend",
    completed: false,
  },
];

// Récupérer toutes les tâches
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Ajouter une tâche
app.post("/tasks", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({
      message: "Le texte de la tâche est obligatoire",
    });
  }

  const newTask = {
    id: Date.now(),
    text,
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Compléter / annuler une tâche
app.patch("/tasks/:id/toggle", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Tâche introuvable",
    });
  }

  task.completed = !task.completed;

  res.json(task);
});

// Supprimer une tâche
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json({
    message: "Tâche supprimée",
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});