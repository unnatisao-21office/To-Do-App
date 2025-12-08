import { useState, useEffect } from 'react'

function App() {

  const [tasks, setTasks] = useState([]);          
  const [input, setInput] = useState("");          
  const [editingId, setEditingId] = useState(null); 
  const [editingText, setEditingText] = useState(""); 
  const [hyd, setHyd] = useState(false);    

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


  // ADD TASK
  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks(prevTasks => [
      ...prevTasks,
      { id: Date.now(), text: trimmed }
    ]);

    setInput("");
  }


  // DELETE TASK
  function deleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
  }


  // START EDIT INLINE
  function startEdit(task) {
    setEditingId(task.id);
    setEditingText(task.text);
  }


  // SAVE EDIT INLINE
  function saveEdit(id) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
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
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">TO-DO LIST</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 border rounded-xl px-4 py-2 text-gray-700"
          />
          <button
            onClick={() => addTask(input)}
            type="button"
            disabled={!input.trim()}
            placeholder="Add a new task"
            className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-gray-900 hover:bg-gray-800 text-black rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-64 md:max-h-80 overflow-auto">
          {tasks.length === 0 ? (
            <div className="border border-gray-300 ">
              
            </div>
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
                    className="flex-1 mr-2 px-3 py-1 text-white rounded-sm"
                  />
                ) : (
                  <span className="font-medium text-white break-words">{task.text}</span>
                )}

                <div className="flex gap-2 ml-4 flex-shrink-0">
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
  )
}

export default App;
