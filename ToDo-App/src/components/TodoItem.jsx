function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="todo-item">
      <span className={task.completed ? "completed" : ""}>
        {task.text}
      </span>

      <div className="actions">
        <button
          className="btn-complete"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "Annuler" : "Compléter"}
        </button>

        <button
          className="btn-delete"
          onClick={() => deleteTask(task.id)}
        >
          Supprimer
        </button>
      </div>
    </li>
  );
}

export default TodoItem;