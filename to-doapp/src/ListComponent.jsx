import React from "react";
import { Trash, Pencil, CircleCheckBig, Save, X } from "lucide-react";
import Select from "react-select";
import { OPTIONS } from "./constants/index.js";
function ListComponent({ taskProps }) {
  const {
    tasks,
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
    toggleComplete,
  } = taskProps;

  return (
    <div className="flex flex-row sm:flex-col gap-2 max-h-64 md:max-h-80 overflow-auto">
      {tasks.length === 0 ? (
        <div className="border border-gray-300 "></div>
      ) : (
        tasks.map((task) => ( 
          <div
            key={task.id}
            className="flex items-center justify-between bg-gray-600 hover:bg-gray-700 transition-colors text-white p-3 md:p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        active:bg-gray-800
        transition duration-150 ease-in-out"
          >
            {editingId === task.id ? (
              <div className="flex-1 mr-3">
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  placeholder="Edit task"
                  className="flex-1 mr-4 px-3 py-1 bg-white text-gray-700 rounded-sm"
                />
                <Select
                  options={OPTIONS}
                  value={editingCategory}
                  onChange={(option) => setEditingCategory(option)}
                  placeholder="Edit category"
                  className="flex-1 mr-14 py-1 bg-gray-200 text-gray-700  rounded-sm mt-2"
                />

                <textarea
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  placeholder="Edit Description"
                  className="flex-1 px-5 py-1 mr-4 bg-white text-gray-700 rounded-sm mt-2"
                />
              </div>
            ) : (
              <div>
                <div>
                  <p
                   
                  >
                    {task.text}
                  </p>

                  {task.category && (
                    <p className="mt-1 text-sm text-gray-300 italic">
                      Category: {task.category}
                    </p>
                  )}

                  {task.description && (
                    <p className="mt-1 text-sm text-gray-200">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex  gap-2 ml-4 flex-shrink-0">
              {editingId === task.id ? (
                <>
                  <button
                    disabled={!editingText.trim()}
                    onClick={() => saveEdit(task.id)}
                    className="px-4 py-3 font-bold bg-black text-gray-400 rounded-lg text-sm disabled:cursor-not-allowed disabled:opacity-30 active:scale-95 transition-all"
                  >
                    <Save />
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="px-4 py-3 bg-black font-bold text-gray-400 rounded-lg text-sm active:scale-95 transition-all"
                  >
                    <X />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-3 bg-black font-semibold text-gray-400 rounded-lg active:scale-95 transition-all"
                  >
                    <Trash />
                  </button>
                   {!task.completed && (
                  <button
                    
                    onClick={() => startEdit(task.id)}
                    className="px-3 py-3 bg-black font-semibold text-gray-400 rounded-lg
             disabled:opacity-40 disabled:trasition-all active:scale-95 transition-all"
                  >
                    <Pencil />
                  </button>
                  )}

                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`px-3 py-3 rounded-lg active:scale-95 transition-all
                    ${
                      task.completed
                        ? "bg-green-600 text-white"
                        : "bg-black text-gray-400"
                    }`}
                    title={
                      task.completed ? "Mark as active" : "Mark as completed"
                    }
                  >
                    <CircleCheckBig />
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListComponent;
