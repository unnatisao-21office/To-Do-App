import { Search } from "lucide-react";
import Select from "react-select";
import React from "react";
import { OPTIONS } from "./constants/index.js";
function SearchComp({ taskProps }) {
  const { search, setSearch, category, setCategory } = taskProps;
 
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
      <div className="flex items-center border-black   rounded-xl bg-gray-300 px-2">
        <Search className="mr-2 text-gray-600" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-black outline-none px-2 py-2 w-full"
        />
      </div>
       <Select
        options={OPTIONS}
        value={category}
        onChange={setCategory}
        placeholder="All  Categories"
        isClearable
        className="flex-1  rounded-sm px-2 py-1 bg-gray-200 w-full text-gray-900"
      />
    </div>
  );
}

export default SearchComp;
