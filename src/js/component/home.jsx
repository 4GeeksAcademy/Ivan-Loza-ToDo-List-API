import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/IvanLoza"
      );
      const data = await response.json();
      const previousTasks = data.todos.map((task) => task.label);

      setTasks(previousTasks);
    } catch (e) {
      console.log(e);
    }
  }

  async function pushTasks() {
    const response = await fetch(
      "https://playground.4geeks.com/todo/todos/IvanLoza",
      {
        method: "POST",
        body: JSON.stringify({
          label: inputValue,
          is_done: false,
        }), // JSON.stringify() JS -> STRING
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const postData = await response.json();
      console.log(postData);
    } else {
      alert("Task not sent to server");
    }
    // Metodo post de quien
  }
  // async function deleteTasksServer(taskId) {
  //   const response = await fetch(
  //     `https://playground.4geeks.com/todo/todos/${taskId}`,
  //     {
  //       method: "DELETE",

  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     }
  //   );
  //   if (response.ok) {
  //     const postData = await response.json();
  //     console.log(postData);
  //   } else {
  //     alert("Task is not deleted from server");
  //   }
  //   // Metodo post de quien
  // }

  function addTask() {
    if (inputValue == "") {
      alert("The task field is empty!");
    }

    if (inputValue !== "") {
      const capitalizedTask =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      setTasks([...tasks, capitalizedTask]);
      setInputValue("");
      pushTasks();
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
