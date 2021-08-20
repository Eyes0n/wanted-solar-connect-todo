import { useCallback } from 'react';
import { useState, useEffect } from 'react';

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  completedDate: string;
};

interface IUseTodo {
  todoState: Itodo[];
  nextIdState: number;
  incrementNextId(): void;
  toggleTodo(id: number): void;
  removeTodo(id: number): void;
  createTodo(todo: Itodo): void;
}

let initialTodos: Itodo[] = [];
let nextIdState = 0;

export const useTodo = (): IUseTodo => {
  const [todoState, setTodoState] = useState(initialTodos);

  const loadData = useCallback((): void => {
    const data = localStorage.getItem('todos') || '[]';
    initialTodos = JSON.parse(data);

    if (initialTodos && initialTodos.length >= 1) {
      nextIdState = initialTodos[initialTodos.length - 1].id;
      incrementNextId();
    }
    setTodoState(initialTodos);
  }, []);

  const saveData = useCallback((): void => {
    localStorage.setItem('todos', JSON.stringify(todoState));
  }, [todoState]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    saveData();
  }, [saveData, todoState]);

  const incrementNextId = (): void => {
    nextIdState = nextIdState + 1;
  };

  const toggleTodo = (id: number): void => {
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const removeTodo = (id: number): void => {
    setTodoState((prevState) => prevState.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo): void => {
    const nextId = nextIdState + 1;

    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId,
      })
    );
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
