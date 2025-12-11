import React from "react";
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
  } = taskProps;

  return (
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
                    disabled={!editingText.trim()}
                    onClick={() => saveEdit(task.id)}
                    className="px-4 py-3 font-bold bg-white text-gray-700 rounded-lg text-sm disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Save
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="px-4 py-3 bg-white font-bold text-gray-700 rounded-lg text-sm"
                  >
                    Cancel 
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-4 py-3 bg-white font-bold text-gray-700 rounded-lg text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => startEdit(task)}
                    className="px-4 py-3 bg-white font-bold text-gray-700 rounded-lg text-sm"
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
  );
}

export default ListComponent;
