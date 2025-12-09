import { useState, useEffect } from "react";
import List from "./assets/list";
function App() {
  const saved = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState(JSON.parse(saved) || []);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ADD TASK
  function addTask(text) {
    console.log("Adding task:", text);
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: trimmed }]);

    setInput("");
  }

  // DELETE TASK
  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }

  // START EDIT INLINE
  function startEdit(task) {
    setEditingId(task.id);
    setEditingText(task.text);
  }

  // SAVE EDIT INLINE
  function saveEdit(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  }

  // CANCEL EDIT
  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  return (
    <div className="flex justify-center items-start min-h-screen min-w-screen bg-gray-600 px-4 py-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          TO-DO LIST
        </h1>
      
      //Add Task
      <List input={input} setInput={setInput} addTask={addTask} />


        <div className="flex flex-col gap-2 max-h-64 md:max-h-80 overflow-auto">
          {tasks.length === 0 ? (
            <div className="border border-gray-300 "></div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-600 text-white p-4 md:p-5 rounded-xl"
              >
                {editingId === task.id ? (
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    placeholder="Edit task"
                    className="flex-1 mr-2 px-3 py-1 bg-white text-gray-700 rounded-sm"
                  />
                ) : (
                  <span className="font-medium  text-white break-words">
                    {task.text}
                  </span>
                )}

                <div className="flex  gap-2 ml-4 flex-shrink-0">
                  {editingId === task.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="px-2 py-1 bg-white text-gray-700 rounded-sm text-sm"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="px-2 py-1 bg-white text-gray-700 rounded-sm text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-2 py-1 bg-white text-gray-700 rounded-sm text-sm"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => startEdit(task)}
                        className="px-2 py-1 bg-white text-gray-700 rounded-sm text-sm"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
