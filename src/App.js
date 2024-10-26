import logo from './logo.svg';
import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import TaskCard from './components/TaskCard';

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
  let isFirstLoad = useRef(true);

  //LOAD LIST ON STARTUP
  useEffect(function() {
    // because no state variables are passed to this useEffect (in square brackets below),
    // we can only access state variables using a -closure-, that is, creating a function and calling it.
    const tryLoadingData = function() {
      console.log("log attempt to load");
      // if (typeof window !== 'undefined') {
      let savedTaskList = localStorage.getItem("taskList");
      if (savedTaskList) {
        setTaskList(JSON.parse(savedTaskList));
        console.log("loaded list as:", savedTaskList);
      }
      // }
    };

    tryLoadingData();
  },[]); //empty brackets means this only runs on startup


  //SAVE LIST ON LIST CHANGED
  useEffect(function() {
    // because taskList is being passed to this useEffect (in square brackets below),
    // we can access it and only it without a closure.
    console.log("log attempt to save");
    if (!isFirstLoad.current) {
    // if (typeof window !== 'undefined') {
      let taskListString = JSON.stringify(taskList);
      localStorage.setItem("taskList", taskListString);
      console.log("saved list as:", taskListString);
    // }
    } else {
      isFirstLoad.current = false;
    }

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
    <div className='app-container'>

      <img src={logo} className="App-logo" alt="logo" />

      <div className='task-column'>
        <h2 className='task-column-title'>To-Do List</h2>

        {/* {taskList.map((task_in, index) => (
          <div className='task-card' key={index}>
            {task_in}
            <button className='task-card-delete-btn' onClick={() => deleteTask(index)}>Delete</button>
          </div>          
        ))} */}

        {taskList.map( function(task_in, index) {
          return <TaskCard
            key={index}  
            task={task_in}
            index={index}
            onDelete={deleteTask}
          />;
        })}

        {/* <ul>
          {taskList.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul> */}

        <input
          className='add-task-input'
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button className='add-task-button' onClick={addTask}>Add Task</button>

      </div>



    </div>
  );

}

export default App;
