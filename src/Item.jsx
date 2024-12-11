function Item({ task, remove }) {
  return (
    <>
      <div className="w-[90%] min-h-[10%] rounded-2xl p-5 flex flex-row justify-between bg-slate-100 mx-auto mt-3 text-black font-bold text-2xl items-center">
        <h1 className="ml-8">{task}</h1>
        <button
          onClick={remove}
          className="fa-solid fa-trash text-red-400 mr-10 hover:text-red-500 ml-5"
        ></button>
      </div>
    </>
  );
}

export default Item;
