import React from "react";
function List({ input, setInput, addTask }) {
  return (
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
  );
}
export default List;
