import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import ListComponent from "./ListComponent";
import SearchComp from "./SeacrhComp";
import { OPTIONS } from "./constants/Index";
function App() {
  const saved = localStorage.getItem("tasks");

  const [tasks, setTasks] = useState(JSON.parse(saved) || []);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    console.log("Adding task:", text);
    console.log("Selected Option:", selectedOption);
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        text: trimmed,
        description: description.trim(),
        category: selectedOption
          ? selectedOption.value || selectedOption
          : null,
      },
    ]);

    setInput("");
    setDescription("");
    setSelectedOption(null);
  }
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase()) || task.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !category ||
      category.value === "All" ||
      task.category === category.value ||
      task.category === category;
   

    return matchesSearch && matchesCategory;
  });
  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }

  function startEdit(task) {
    const trimmed = task.text.trim();
    if (!trimmed) return;
    setEditingId(task.id);
    setEditingText(task.text);
    setEditingDescription(task.description || "");
      const selectedOption = OPTIONS.find(
    (opt) => opt.value === task.category
  );

  setEditingCategory(selectedOption || null);
  }

function saveEdit() {
  setTasks(
    tasks.map((task) =>
      task.id === editingId
        ? {
            ...task,
            text: editingText,
            description: editingDescription,
            category: editingCategory ? editingCategory.value : null,
          }
        : task
    )
  );

  setEditingId(null);
  setEditingText("");
  setEditingDescription("");
  setEditingCategory(null);
}

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
    setEditingDescription("");
  }

  return (
    <div className="flex justify-center items-start min-h-screen min-w-screen bg-gray-600 px-4 py-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
          TO-DO LIST
        </h1>

        <AddTask
          taskProps={{
            addTask,
            setInput,
            input,
            description,
            setDescription,
            selectedOption,
            setSelectedOption,
          }}
        />
        <SearchComp taskProps={{ search, setSearch, category, setCategory }} />
        <ListComponent
          taskProps={{
            tasks: filteredTasks,
            editingId,
            editingText,
            setEditingText,
            saveEdit,
            cancelEdit,
            deleteTask,
            startEdit,
            editingDescription,
            setEditingDescription,
           editingCategory,
           setEditingCategory
          }}
        />
      </div>
    </div>
  );
}

export default App;
