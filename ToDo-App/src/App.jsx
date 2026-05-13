import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

const API_URL = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  // Charger les tâches au démarrage
  useEffect(() => {
    getTasks();
  }, []);

  // GET tasks
  const getTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des tâches :", error);
    }
  };

  // POST task
  const addTask = async (text) => {
    try {
      const response = await axios.post(API_URL, { text });

      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  // PATCH toggle task
  const toggleTask = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}/toggle`
      );

      setTasks(
        tasks.map((task) =>
          task.id === id ? response.data : task
        )
      );
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  // DELETE task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="app">
      <h1>Ma Todo List</h1>

      <TodoForm addTask={addTask} />

      <TodoList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;