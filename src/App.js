import logo from './logo.svg';
import React, { useState, useEffect, useRef } from 'react'
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState ('');
  // const [isFirstLoad, setIsFirstLoad] = useState(true);// Add a flag for the first load
  let isFirstLoad = useRef(true);

  //startup code to load data
  useEffect(function() {
    let savedTaskList = localStorage.getItem("taskList");
    if (savedTaskList) {
      setTaskList(JSON.parse(savedTaskList));
      console.log("loaded list as:", savedTaskList);
    }
    // setIsFirstLoad(false);
    isFirstLoad.current = false;
  },[]); //empty brackets means this only runs on startup


  //save list when updated
  useEffect(function() {
    if (!isFirstLoad.current) return;
    let taskListString = JSON.stringify(taskList);
    localStorage.setItem("taskList", taskListString);
    console.log("saved list as:", taskListString);
  },[taskList]); //only run this when taskList updates.


  const addTask = function() {
    if (task.trim()) { //if string != ""
      let newTaskList = [...taskList, task]
      setTaskList(newTaskList);
      setTask('');
      // let taskListString = JSON.stringify(newTaskList);
      // localStorage.setItem("taskList", taskListString);
      // console.log("saved list as:", taskListString);
    }
  };


  const deleteTask = function(index) {
    const newTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(newTaskList);
    // let taskListString = JSON.stringify(newTaskList);
    // localStorage.setItem("taskList", taskListString);
    // console.log("saved list as:", taskListString);
  };


  return (
    <div className='App'>

      <img src={logo} className="App-logo" alt="logo" />

      <h1>To-Do List</h1>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {taskList.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );

}

export default App;
