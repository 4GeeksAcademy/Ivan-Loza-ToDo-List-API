import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  async function handleSubmit(newTask) {
    const response = await fetch(
      "https://playground.4geeks.com/todos/IvanLoza",
      {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const postData = await response.json();
      console.log("data sent");
    } else {
      console.log("failed to send task to server");
    }
  }

  function addTask() {
    if (inputValue == "") {
      alert("The task field is empty!");
      return;
    }
    if (inputValue !== "") {
      const capitalizedTask =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      const newTask = { label: capitalizedTask, is_done: false };
      setTasks([...tasks, capitalizedTask]);

      setInputValue("");
      handleSubmit(newTask);
    }
  }

  function removeTask(indexToRemove) {
    setTasks(tasks.filter((task, index) => index !== indexToRemove));
  }

  function tasksLeft() {
    const tasksToDo = tasks.length;
    if (tasksToDo === 0) {
      return "Nothing to do...";
    }
    if (tasksToDo === 1) {
      return "Just " + tasksToDo + " task left to do!";
    }
    if (tasksToDo > 0) {
      return "Just " + tasksToDo + " tasks left to do!";
    }
  }

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="mt-5">
        <h1 className=" display-1 ">TO-DO LIST</h1>
        <div className="containter d-flex ">
          <input
            className="form-control"
            id="input"
            placeholder="What needs to be done?"
            type="text"
            value={inputValue}
            name="label"
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          ></input>
        </div>
        <ul className="list-group mt-2">
          {tasks.map((task, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center "
              key={index}
            >
              {task}
              <button
                type="sm-button"
                className="removeButton btn btn-ligth btn-sm"
                onClick={() => removeTask(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <p className="tasksLeft mt-1 ms-3">{tasksLeft()}</p>
      </div>
    </div>
  );
};

export default Home;
