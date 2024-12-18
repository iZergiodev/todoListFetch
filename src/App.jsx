import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Item from "./Item";

function App() {
  const [task, setTask] = useState([]);

  const fetchTasks = async () => {

    const response = await fetch(
      "https://playground.4geeks.com/todo/users/sergio",
      { method: "GET" }
    );
    if(response.status === 404) {
      await fetch('https://playground.4geeks.com/todo/users/sergio', {
        method: "POST"
      })
      return fetchTasks()
    }
    const data = await response.json();
    const todos = data.todos.map((e) => ({ taskElement: e.label, id: e.id }));
    setTask(todos);
  };

  useEffect(() => {
    fetchTasks();
  },[]);

  const addTask = async (name) => {
    const data = {
      label: `${name}`,
      is_done: false,
    };

    const response = await fetch(
      "https://playground.4geeks.com/todo/todos/sergio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    setTask([...task, { taskElement: name, id: result.id }]);
  };
//https://stackblitz.com/edit/vitejs-vite-p2iwb4mq?file=src%2FApp.jsx,src%2FApp.css
  const deleteTask = async (indexRemove, t) => {
    const updatedTask = task.filter((_, index) => index != indexRemove);
    setTask(updatedTask);

    await fetch(`https://playground.4geeks.com/todo/todos/${t.id}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      <div className=" lg:w-[60vw] min-h-[85vh] max-h-[85vh] lg:min-h-[60vh] lg:max-h-[60vh] mx-auto lg:my-auto rounded-lg pb-6 lg:overflow-y-auto w-[100vw] h-[100%]" id="hola"
      >
        <div className="w-full bg-black z-20">
          <Header addTask={addTask} task={task} />
        </div>
        {task.map((t, index) => (
          <Item
            key={index}
            task={t.taskElement}
            remove={() => {
              deleteTask(index, t);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
