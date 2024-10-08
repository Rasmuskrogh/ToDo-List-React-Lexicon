import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<{ text: string; isChecked: boolean }[]>(
    []
  );
  const [counter, setCounter] = useState<{ amount: number; total: number }>({
    amount: 0,
    total: 0,
  });

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTask(e.target.value);
  };

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      const newTask = { text: task, isChecked: false };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const checkboxHandler = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isChecked: !task.isChecked } : task
    );

    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const removeTask = tasks.filter((task, i) => i !== index);
    setTasks(removeTask);
  };

  const updateAmount = () => {
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter((task) => task.isChecked).length;
    setCounter({ amount: doneTasks, total: totalTasks });
  };

  useEffect(() => {
    updateAmount();
  }, [tasks]);

  return (
    <>
      <form className="app-form">
        <h1>ToDo List</h1>
        <label htmlFor="new-item">Add new task:</label>
        <section>
          <input
            onChange={onChangeHandler}
            value={task}
            type="text"
            id="new-item"
            placeholder="Add task here..."
          />
          <button onClick={clickHandler}>Add task</button>
        </section>
      </form>
      <ul className="app-ul">
        <h2>Tasks:</h2>
        {tasks.map((task, i) => (
          <li key={i} className={task.isChecked ? "done" : ""}>
            <label htmlFor="">{task.text}</label>
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={() => checkboxHandler(i)}
            />
            <button
              className={!task.isChecked ? "hide" : ""}
              onClick={() => removeTask(i)}
            >
              Remove task
            </button>
          </li>
        ))}
      </ul>
      <h2>
        Remaing tasks: {counter.amount}/{counter.total}
      </h2>
    </>
  );
}

export default App;
