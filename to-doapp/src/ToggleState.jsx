function ToggleState({ taskProps }) {
  const { statusFilter, setStatusFilter } = taskProps;

  const baseBtn =
    "px-6 py-2 rounded-md font-bold w-900 transition-all flex items-center justify-center";

  const activeBtn = "bg-gray-700 text-black shadow";
  const inactiveBtn = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <div className="flex gap-3 mb-4 ">
      <button
        onClick={() => setStatusFilter("Active")}
        className={`${baseBtn} ${
          statusFilter === "Active" ? activeBtn : inactiveBtn
        }`}
      >
        Active
      </button>

      <button
        
        onClick={() => setStatusFilter("Completed")}
        className={`${baseBtn} ${
          statusFilter === "Completed" ? activeBtn : inactiveBtn
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default ToggleState;
