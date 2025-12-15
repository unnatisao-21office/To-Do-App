import { Search } from "lucide-react";

function SearchComp({ taskProps }) {
  const { search, setSearch, category, setCategory } = taskProps;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">

      
      <div className="flex items-center border-black w-800 rounded-xl bg-gray-300 px-2">
        <Search className="mr-2 text-gray-600" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-black outline-none py-2 w-full"
        />
      </div>
         <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-xl px-3 w-32 py-2 bg-gray-300 text-black"
      >
        <option value="All">Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
        <option value="Workout">Workout</option>
      </select>

    </div>
  );
}

export default SearchComp;
