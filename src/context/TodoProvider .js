"use client";
import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  return (
    <TodoContext.Provider value={{ selectedTodo, setSelectedTodo,todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);