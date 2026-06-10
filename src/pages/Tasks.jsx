import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import "../styles/tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input,
        done: false,
      },
    ]);

    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  return (
    <MainLayout>
      <div className="tasks-container">

        <h1>Tasks</h1>

        <div className="task-input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Create task..."
          />

          <button onClick={addTask}>Add</button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">

              <p className={`task-text ${task.done ? "done" : ""}`}>
                {task.text}
              </p>

              <button
                className={task.done ? "done" : ""}
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? "Undo" : "Done"}
              </button>

            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
}