/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
};

let initialTodos: Itodo[] = [];
let nextIdState = 0;

export const useTodo = (): any => {
  const [todoState, setTodoState] = useState(initialTodos);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    nextIdState = nextIdState + 1;
  };

  const toggleTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) => prevState.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo) => {
    const nextId = nextIdState + 1;

    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId,
      })
    );
  };

  const loadData = () => {
    const data = localStorage.getItem('todos') || '[]';
    initialTodos = JSON.parse(data);

    if (initialTodos && initialTodos.length >= 1) {
      nextIdState = initialTodos[initialTodos.length - 1].id;
      incrementNextId();
    }
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem('todos', JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
  };
};
