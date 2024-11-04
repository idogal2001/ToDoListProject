import { useState, useEffect } from "react";

const Tasks = () => {

  let [taskList, setTaskList] = useState<string[]>([]);
  let [tasksCompleted, setTasksCompleted] = useState<string[]>([]);
  let [counter, setCounter] = useState(0);

  const saveInput = (info: React.KeyboardEvent<HTMLInputElement>) => {
    if(info.key === 'Enter'){
      if((info.currentTarget.value).length >= 250){
        alert("Please choose a smaller task")
      }
      else if((info.currentTarget.value).length === 0){
        alert("Please enter a task!")
      }
      else{
        if(!taskList.includes((info.currentTarget.value).trim())){
          setTaskList([...taskList, (info.currentTarget.value).trim()]);
          setCounter(counter + 1);
        }
        else{
          alert("Please choose a different task :)")
        }
      }
      }
  }

  const taskCompleted = (task: string) => {
    if(!tasksCompleted.includes(task)){
      setTasksCompleted([...tasksCompleted, task]);
      setCounter(counter - 1);
    }
  };

  const taskFinished = (task: string) => {
    setTaskList(taskList.filter((e: string) => e !== task));
    if(tasksCompleted.includes(task)){
      setTasksCompleted(tasksCompleted.filter((e: string) => e !== task));
    }
    else{
      setCounter(counter - 1);
    }
  };
  

  return (
    <div className="taskBoxContainer">
      <h1 className="pendingTasks">Pending Tasks ({counter})</h1>
      <div className="taskListContainer">
      {taskList.map((task: string) => (
          <li className="taskBox">
            <span
              className={
                tasksCompleted.includes(task) ? "taskCompleted" : "taskIsNotCompleted"
              }
            >
              {task}
            </span >
            <span className="completeButtonPadding">
            <button
              onClick={() => taskCompleted(task)}
              className="completeButton"
            >
              Complete
            </button>
            </span>
            <span className="deleteButtonPadding">
            <button onClick={() => taskFinished(task)} className="deleteButton">
              X
            </button>
            </span>
          </li>
      ))}
      </div>
      <span className="taskInputPadding"><input className="taskInput" type="text"  placeholder="Add a new task" onKeyDown={saveInput}></input></span>
    </div>
  );
}

export default Tasks;