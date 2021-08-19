/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
};

let initialTodos: Itodo[] = [];

export const useTodo = (): any => {
  const [todoState, setTodoState] = useState(initialTodos);
  let nextIdState = 0;

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
    incrementNextId();
    console.log('nextIdState :>> ', nextIdState);
  };

  const loadData = () => {
    const data = localStorage.getItem('todos') || '[]';
    initialTodos = JSON.parse(data);
    console.log('initialTodos :>> ', initialTodos);
    if (initialTodos && initialTodos.length >= 1) {
      // TODO: todos 갯수가 0부터 시작하는거면 괜찬 but 여러개가 있는 경우면 문제가됨
      // TODO: 여러개로 load되는 부분 생각하여 작성
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
