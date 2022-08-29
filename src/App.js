import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [ todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo] = useState("")
  const [newTodo, setNewTodo] = useState("")

  const deleteTodo = (id) => {
  const filteredTodos=todos.filter(item=>item.id !== id);
  setTodos(filteredTodos);
  }
  //  const editTodos=(id) => {
  //   console.log(id);
  //   setIsEdit(true);
  //   const searchedTodo = todos.find((item) => item.id === id);
  //   setTodoText(searchedTodo.text);
  //   };

   

  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Todo text can't be empty!");
      return;    
    }
    if (isEdit === true) {
      console.log(willUpdateTodo, "Todo yu guncelleyecegim.")
      const searchedTodo=todos.find(item=>item.id===willUpdateTodo)
      const updatedTodo={
        ...searchedTodo,
        text:todoText
      }
      const filteredTodos=todos.filter(item=>item.id !== willUpdateTodo)
      setTodos([...filteredTodos, updatedTodo])
      setTodoText("");
      setIsEdit(false);
      setWillUpdateTodo("");
    } else {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text:todoText,
        date:new Date(),
      };
      
    }
    const hasTodos = todos.find((item) => item.text === todoText);
    console.log(hasTodos);
    if (hasTodos !== undefined) {
      alert("You have the todo already");
      return;
    } 
  
    console.log("newtTodo", newTodo)
    setTodos([...todos, newTodo ]);
    setTodoText("");
  };  
  return (
    <div className="container">
      <h1 className=" text-center my-5">Todo App Ahmet </h1>
      <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
         <input 
         value={todoText}
         type="text" 
         className="form-control" 
         placeholder="Type Your Todo" 
         onChange={(event) => setTodoText(event.target.value)}/>
        
         <button className={`btn btn-${isEdit === true ? "success" : "primary"}`}
          type="submit" >
        {isEdit === true ? "Save" : "ADD"}
        
          </button>
      </div>        
      </form>

      {todos.length <= 0 ? (
        <p className="text-center my-5">You don t have todos yet.</p>
         ) : ( 
          <>
          {todos.map((item) => (
            <div className={`alert alert-${item.isDone===true ? "info" : "secondary"} 
            d-flex justify-content-between align-items-center`}>
            
            <p>{item.text}</p>
            <div>
              <button className="btn btn-danger mx-1" onClick={() => deleteTodo(item.id)}>Delete</button>
              <button 
               className="btn btn-sm btn-success me-1" 
              onClick={() => {
                setIsEdit(true)
                setWillUpdateTodo(item.id)
                setTodoText(item.text)
               
              }}
              >
                Edit</button>
              <button
                onClick={() => changeIsDone(item.id)}
                className="btn btn-sm btn-secondary"
              >
                {item.isDone === false ? "Done" : "Undone"}
              </button>
            </div>
            
            </div>
          ))}
          </>
          
         )}
    </div>
  );
}

export default App;
