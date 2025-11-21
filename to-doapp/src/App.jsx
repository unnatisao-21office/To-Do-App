import { useState, useEffect } from 'react'

function App() {
  // State
  const [tasks, setTasks] = useState([]);          //array of task
  const [input, setInput] = useState("");          //current input value
  const [editingId, setEditingId] = useState(null); //id of task being edited
  const [hyd,setHyd] = useState(false); 
  
useEffect(() => {
  const saved = localStorage.getItem("tasks");
  console.log("Loaded from storage:", saved);
  if (saved) setTasks(JSON.parse(saved));
  setHyd(true);
}, []);

  useEffect(() => {
   if (hyd) localStorage.setItem("tasks", JSON.stringify(tasks));
   else return;
  }, [tasks]);

  
  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return; 

   
    if (editingId !== null) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingId ? { ...task, text: trimmed } : task
        )
      );
      setEditingId(null);
    } else {
    
      setTasks(prevTasks => [
        ...prevTasks,
        { id: Date.now(), text: trimmed }
      ]);
    }

    setInput(""); 
  }

  // Delete a task by id
  function deleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
  }

  // Start editing: populate input and set editingId
  function startEdit(task) {
    setInput(task.text);
    setEditingId(task.id);
  }

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-gray-600 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">TO-DO LIST</h1>

        {/* Input + Add/Update button */}
        <div className="flex gap-2 mb-6 ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 border rounded-xl px-5 py-2 text-gray-700"
          />
          <button
            onClick={() => addTask(input)}
            type="button"
            disabled={!input.trim()} // disable when empty
            className="px-8 py-7 bg-gray-800 border border-black rounded-xl"
          >
            {editingId !== null ? "Update" : "Add"}
          </button>
        </div>
        {/* Tasks list */}
        <div className="flex flex-col gap-2">
          {tasks.length === 0 ? (
            <div className="border">
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-700 text-white p-4 rounded-xl"
              >
                <span className="font-medium">{task.text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteTask(task.id)}
                    type="button"
                    className="px-3 py-1 bg-white text-gray-700 rounded-lg hover:bg-gray-500"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => startEdit(task)}
                    type="button"
                    className="px-3 py-1 bg-white text-gray-700 rounded-lg"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App;
