import React from "react";
import { Trash } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import { Save } from 'lucide-react';
import { Ban } from 'lucide-react';
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

  } = taskProps;

  return (
    <div className="flex flex-row sm:flex-col gap-2 max-h-64 md:max-h-80 overflow-auto">
      {tasks.length === 0 ? (
        <div className="border border-gray-300 "></div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-gray-600 text-white p-3 md:p-5 rounded-xl"
          >
            {editingId === task.id ? (
                <div className="flex-1 mr-3">
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                placeholder="Edit task"
                className="flex-1 mr-2 px-3 py-1 bg-white text-gray-700 rounded-sm"
              />
              <textarea
                value={editingDescription}
                onChange={(e)=> setEditingDescription(e.target.value)}
                placeholder="Edit Description"
                className="flex-1 px-3 py-1 mr-2 bg-white text-gray-700 rounded-sm mt-2"
              />
              </div>
            ) : (
              <div>
                <span className="font-medium  text-white break-words">
                            {task.text}
                        </span>
                        {task.description && (
                            <p className="mt-1 text-sm text-gray-300">
                                {task.description}
                            </p>
                        )}
                
                </div>
              )}

            <div className="flex  gap-2 ml-4 flex-shrink-0">
              {editingId === task.id ? (
                <>
                  <button
                    disabled={!editingText.trim()}
                    onClick={() => saveEdit(task.id)}
                    className="px-4 py-3 font-bold bg-black text-gray-400 rounded-lg text-sm disabled:cursor-not-allowed disabled:opacity-30"
                  >
                        <Save />

                  </button>

                  <button
                    onClick={cancelEdit}
                    className="px-4 py-3 bg-black font-bold text-gray-400 rounded-lg text-sm"
                  >
                    <Ban />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-3 bg-black font-semibold text-gray-400 rounded-lg"
                  >
                    <Trash />
                  </button>

                  <button
                    onClick={() => startEdit(task)}
                    className="px-3 py-3 bg-black font-semibold text-gray-400 rounded-lg "
                  >
                    <Pencil />
                  </button>
                       <button
                    onClick={() => startEdit(task)}
                    className="px-3 py-3 bg-black font-semibold text-gray-400 rounded-lg "
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
