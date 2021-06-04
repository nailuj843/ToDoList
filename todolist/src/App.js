import React from "react";
import './App.css';
import ToDoList from './ToDoList.js';
import Gif from './Gif.js';

function App() {

  return (
    <div className="App">
      
      <header className="App-header">
        <div class="titleBar">
      
          <ToDoList />
        
        </div>
      </header>
    </div>
  );
}

export default App;
