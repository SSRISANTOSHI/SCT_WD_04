import React from "react";

function TaskItem({ task, updateTask, deleteTask }) {
  const toggleComplete = () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  const editTask = () => {
    const newText = prompt("Edit Task", task.text);
    if (newText && newText.trim() !== "") {
      updateTask(task.id, { ...task, text: newText.trim() });
    }
  };

  const priorityClass = `priority-${task.priority}`;

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <div>
        <strong>{task.text}</strong>
        <div className="task-meta">
          {new Date(task.time).toLocaleString()}{" "}
          <span className={priorityClass}>({task.priority})</span>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={toggleComplete}>✔️</button>
        <button onClick={editTask}>✏️</button>
        <button onClick={() => deleteTask(task.id)}>🗑️</button>
      </div>
    </div>
  );
}

export default TaskItem;
