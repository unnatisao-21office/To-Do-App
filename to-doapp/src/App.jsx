import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import ListComponent from "./ListComponent";
function App() {
  const saved = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState(JSON.parse(saved) || []);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    console.log("Adding task:", text);
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: trimmed }]);

    setInput("");
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }

  function startEdit(task) {
    const trimmed = task.text.trim();
    if (!trimmed) return;
    setEditingId(task.id);
    setEditingText(task.text);
  }

  function saveEdit(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  return (
    <div className="flex justify-center items-start min-h-screen min-w-screen bg-gray-600 px-4 py-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
          TO-DO LIST
        </h1>

        <AddTask taskProps={{ addTask, setInput, input }} />
        <ListComponent
          taskProps={{
            tasks,
            editingId,
            editingText,
            setEditingText,
            saveEdit,
            cancelEdit,
            deleteTask,
            startEdit,
          }}
        />
      </div>
    </div>
  );
}

export default App;
