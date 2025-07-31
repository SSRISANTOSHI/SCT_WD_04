import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !time) return;

    addTask({
      id: Date.now(),
      text,
      time,
      priority,
      completed: false,
    });

    setText("");
    setTime("");
    setPriority("low");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task name"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
