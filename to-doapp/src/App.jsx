import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import ListComponent from "./ListComponent";
import SearchComp from "./SeacrhComp";
import { OPTIONS } from "./constants";
import ToggleState from "./ToggleState";

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
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteAllToggle, setDeleteAllToggle] = useState(false);

  
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
        completed: false,
      },
    ]);

    setInput("");
    setDescription("");
    setSelectedOption(null);
  }
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.text.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !category ||
      category.value === "All" ||
      task.category === category.value ||
      task.category === category;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && !task.completed) ||
      (statusFilter === "Completed" && task.completed);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const completedTasks = tasks.filter((task) => task.completed).length;

  function toggleComplete(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

const toggleDeleteAll = () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete all tasks? This action cannot be undone."
  );

  if (confirmDelete) {
    setTasks([]); 
  }
};


  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }

  function startEdit(task) {
    const trimmed = task.text.trim();
    if (!trimmed) return;
    setEditingId(task.id);
    setEditingText(task.text);
    setEditingDescription(task.description || "");
    const selectedOption = OPTIONS.find((opt) => opt.value === task.category);

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
        <SearchComp
          taskProps={{
            search,
            setSearch,
            category,
            setCategory,
            deleteAllToggle,
            toggleDeleteAll,
          }}
        />
        <ToggleState taskProps={{ statusFilter, setStatusFilter }} />
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
            setEditingCategory,
            statusFilter,
            setStatusFilter,
            completedTasks,
            toggleComplete,
          }}
        />
      </div>
    </div>
  );
}

export default App;
