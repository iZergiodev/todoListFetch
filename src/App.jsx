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
    if (!response.ok) throw new Error("Error al obtener las tareas");
    const data = await response.json();
    console.log(data);
    const todos = data.todos.map((t) => ({ taskElement: t.label, id: t.id }));
    console.log(todos);
    setTask(todos);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
    console.log("Repuesta:", result);
    setTask([...task, { taskElement: name, id: result.id }]);
  };

  const deleteTask = async (indexRemove, t) => {
    const updatedTask = task.filter((_, index) => index != indexRemove);
    setTask(updatedTask);

    await fetch(`https://playground.4geeks.com/todo/todos/${t.id}`, {
      method: "DELETE",
    });
    console.log(`La id: ${t.id} eliminada satisfactoriamente`);
  };

  return (
    <>
      <div className="bg-black w-[60vw] min-h-[60vh] max-h-[100vh] mx-auto my-auto rounded-lg pb-6 overflow-y-auto">
        <div className="sticky top-0 left-0 w-full bg-black z-20">
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
