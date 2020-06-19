import React from 'react';

import SideBar from './components/SideBar'
import TodoList from './components/Todo'
import TodoListProvider from './store/context';

import './App.css';


function App() {
  return (
    <TodoListProvider>
      <div className="Todo">
          <SideBar />
          <TodoList />
      </div>
    </TodoListProvider>
  );
}

export default App;
