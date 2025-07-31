import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskAnalytics from "./components/TaskAnalytics";
import TaskCalendar from "./components/TaskCalendar";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);

    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filtered = tasks.filter((t) => t.id !== id);
    setTasks(filtered);
  };

  const reorderTasks = (reordered) => {
    setTasks(reordered);
    localStorage.setItem("tasks", JSON.stringify(reordered));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  return (
    <div className="App">
      <h1>📝 Smart To-Do App</h1>
      <div className="filter">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <button onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <TaskForm addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        reorderTasks={reorderTasks}
      />
      <TaskAnalytics tasks={tasks} />
      <TaskCalendar tasks={tasks} />
    </div>
  );
}

export default App;
