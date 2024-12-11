import { useState } from "react";

function Header({ addTask, task }) {
  const [name, setName] = useState("");

  const inputValue = (e) => {
    setName(e.target.value);
  };

  const handleButtonClick = () => {
    if (name.trim() !== "") {
      addTask(name);
      setName("");
    }
  };

  return (
    <>
      <div className="min-h-[15%] flex flex-row p-5 w-full bg-slate-200 text-black justify-around items-center rounded-lg">
        <h1 className="text-3xl font-bold scale-125">TODO LIST</h1>
        <h2>{task.length} tareas pendientes</h2>
        <div className="flex gap-10">
          <input
            onChange={inputValue}
            value={name}
            type="text"
            className="bg-slate-100 text-black border-black border rounded-xl p-2"
          />
          <button
            onClick={handleButtonClick}
            className="fa-solid fa-plus text-3xl p-2 scale-125 font-bold hover:bg-slate-300 hover:rounded-lg"
          ></button>
        </div>
      </div>
    </>
    
  );
}

export default Header;
