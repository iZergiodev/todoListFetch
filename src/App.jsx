import "./App.css";
import { useState } from "react";
import Header from "./Header";
import Item from "./Item";

function App() {
  const [task, setTask] = useState([]);

  const addTask = (name) => {
    setTask([...task, { taskElement: name }]);
  };

  const deleteTask = (indexRemove) => {
    const updatedTask = task.filter((_, index) => index != indexRemove);
    setTask(updatedTask);
  };

  return (
    <>
      <div className="bg-black w-[60vw] min-h-[60vh] max-h-[100vh] mx-auto my-auto rounded-lg pb-6 overflow-y-auto">
        <div className="sticky top-0 left-0 w-full bg-black z-20">
          <Header addTask={addTask} task = {task} />
        </div>
        {task.map((t, index) => (
          <Item
            key={index}
            task={t.taskElement}
            remove={() => {
              deleteTask(index);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
