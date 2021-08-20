import React, { useReducer, createContext, useContext, Dispatch } from 'react';
import { ReactElement } from 'react';

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  completedDate: string;
};

const initialTodos: Itodo[] = [];

type Action =
  | { type: 'CREATE'; text: string; completedDate: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number }
  | { type: 'LOAD_TODOS'; todos: Itodo[] };

type todoDispatch = Dispatch<Action>;

function todoReducer(state: Itodo[] = initialTodos, action: Action): Itodo[] | undefined {
  switch (action.type) {
    case 'LOAD_TODOS':
      return state.concat(action.todos);
    case 'CREATE':
      const nextId = state.length ? Math.max(...state.map((todo) => todo.id)) + 1 : 1;

      return state.concat({
        id: nextId,
        text: action.text,
        done: false,
        completedDate: action.completedDate,
      });
    case 'TOGGLE':
      return state.map((todo: Itodo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter((todo: Itodo) => todo.id !== action.id);
    default:
      return state;
  }
}

const TodoStateContext = createContext<Itodo[] | null>(null);
const TodoDispatchContext = createContext<todoDispatch | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }): ReactElement {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);

  return (
    <TodoStateContext.Provider value={state || []}>
      <TodoDispatchContext.Provider value={dispatch}>{children}</TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState(): Itodo[] {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch(): todoDispatch {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
