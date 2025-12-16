import Select from "react-select";
import React from "react";
import { OPTIONS } from "./constants/index.js";
function AddTask({ taskProps }) {
  const {
    addTask,
    setInput,
    input,
    selectedOption,
    setSelectedOption,
    description,
    setDescription,
  } = taskProps;
  
 
  const handleChange = (option) => {
    setSelectedOption(option);
    console.log(`Option selected:`, option);
  };
  return (
    <div className="flex flex-row sm:flex-col gap-2 mb-6">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 border rounded-xl px-4 py-2 text-gray-700"
      />
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={OPTIONS}
        placeholder="No Category Selected"
        className="flex-1 border rounded-xl px-4 py-2 text-gray-700"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        disabled={!input.trim()}
        className="flex-1 border rounded-xl px-4 py-2 text-gray-700"
      />
      <button
        onClick={() => addTask(input)}
        type="button"
        disabled={!input.trim()}
        className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </div>
  );
}
export default AddTask;
