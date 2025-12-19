import { Search, Trash } from "lucide-react";
import Select from "react-select";
import React from "react";
import { OPTIONS } from "./constants/index.js";

function SearchComp({ taskProps }) {
  const { search, setSearch, category, setCategory,  toggleDeleteAll } = taskProps;

  return (
  <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 ">
    
      <div className="flex items-center border border-black rounded-xl bg-gray-300 px-3 w-full sm:w-64">
        <Search className="mr-2 text-gray-600" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-black outline-none py-2 w-full"
        />
      </div>

      
      <Select
        options={OPTIONS}
        value={category}
        onChange={setCategory}
        placeholder="All Categories"
        isClearable
        className="w-full sm:w-52 text-black"
      />

      
      <button
        onClick={toggleDeleteAll}
        className="flex items-center justify-center gap-2 px-4 py-2 
                   bg-gray-500 text-white font-semibold rounded-lg
                   hover:bg-gray-600 active:scale-95 transition-all"
         title="Delete All Tasks">
        <Trash size={20} />
        
      </button>
    </div>
  );
}

export default SearchComp;
