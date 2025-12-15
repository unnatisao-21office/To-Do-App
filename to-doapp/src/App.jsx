import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import ListComponent from "./ListComponent";
import SearchComp from "./SeacrhComp";
function App() {
 const saved = localStorage.getItem("tasks");

  const [tasks, setTasks] = useState(JSON.parse(saved) || []);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [category, setCategory] = useState("All");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

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
        category: selectedOption ? selectedOption.value || selectedOption : null,
      },
    ]);

    setInput("");
    setDescription("");
    setSelectedOption(null);
  }
  const filteredTasks = tasks.filter((task) =>
    {const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = (category === "All" || task.category === category)

    return matchesSearch && matchesCategory;
    }
  );
  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }

  function startEdit(task) {
    const trimmed = task.text.trim();
    if (!trimmed) return;
    setEditingId(task.id);
    setEditingText(task.text);
    setEditingDescription(task.description || "");
  }



  function saveEdit(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: editingText ,
           description: editingDescription.trim(),
        } : task
      )
    );
    setEditingId(null);
    setEditingText("");
    setEditingDescription("");
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

        <AddTask taskProps={{ addTask, setInput, input , description , setDescription ,selectedOption,setSelectedOption}} />
        <SearchComp taskProps={{ search, setSearch,category, setCategory }} />
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
           }}
        />
      </div>
    </div>
  );
}

export default App;
