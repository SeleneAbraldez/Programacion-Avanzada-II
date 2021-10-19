import './App.css';
import React from 'react';
import { useFetch } from "./hooks/useFetch";

function App() {

  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users", []);
  //tiene que si o si tener el mismo nombre
  const resultTodos = useFetch("https://jsonplaceholder.typicode.com/todos", []);

  return (
    <div className="App">
      <h1>Ejemplo Custom Hook</h1>
      <ul>
        {
          loading || data.map(user => <li key={user.id}>{user.name}</li>)
        }
      </ul>
      <ul>
        {
          resultTodos.loading || resultTodos.data.map(todo => <li key={todo.id}>{todo.title}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
