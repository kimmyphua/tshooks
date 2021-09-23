import React, { FC, createContext, ChangeEvent, useState } from "react";
import "./App.css";
import { Person, HairColor } from "./Components/Person";
import Tasks from "./Components/Tasks";
import { ITask } from "./Interfaces";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UseState from "./Components/UseState";
import UseContextComponent from "./Components/UseContextComponent";
import UseReducer from "./Components/UseReducer";
import TodosWrapper from "./Components/Todos";
import TodoWrapper from "./Components/Redux/TodoRedux";

interface AppContextInterface {
  name?: string;
  age?: number;
  country?: string;
}
const AppContext = createContext<AppContextInterface | null>(null);

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [contextValue, setContext] = useState<AppContextInterface>({
    name: "Kim",
    age: 27,
    country: "Sg",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.name === "task"
      ? setTask(e.target.value)
      : setDeadline(Number(e.target.value));
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    console.log(todoList);
    setTask("");
    setDeadline(0);
  };

  const completedTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => task.taskName !== taskNameToDelete));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <div className="header">
              <div className="inputContainer">
                <input
                  name="task"
                  type="text"
                  placeholder="Add Task"
                  value={task}
                  onChange={handleChange}
                />

                <input
                  name="deadline"
                  type="number"
                  min={0}
                  value={deadline}
                  onChange={handleChange}
                />
              </div>
              <button onClick={addTask}> Add Task</button>
            </div>
            <div className="todoList">
              {todoList.map((task, i) => (
                <Tasks key={i} task={task} completedTask={completedTask} />
              ))}
            </div>
          </Route>

          <Route path="/person">
            <AppContext.Provider value={contextValue}>
              <Person
                name="Kim"
                age={27}
                email="kim@kim.com"
                haircolor={HairColor.Pink}
              />
            </AppContext.Provider>
          </Route>
          <Route path="/useState">
            <UseState />
          </Route>
          <Route path="/useContext">
            <UseContextComponent />
          </Route>
          <Route path="/useReducer">
            <UseReducer />
          </Route>
          <Route path="/todos">
            <TodosWrapper />
          </Route>
          <Route path="/redux">
            <TodoWrapper />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

    /* <AppContext.Provider value={contextValue}>
    <div className="App">
     <Person 
     name="Kim" age={27} email="kim@kim.com" haircolor={HairColor.Pink}/>
    </div>
    </AppContext.Provider> */
  );
};

export default App;
