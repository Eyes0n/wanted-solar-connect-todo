import React, { useReducer, createContext, useContext, Dispatch } from 'react';
import { ReactElement } from 'react';

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  completedDate: string;
};

export interface IUser {
  id?: number;
  email: string;
  password?: string;
  isLogged?: boolean;
  todos?: Itodo[];
}

const initialTodos: IUser[] = [];

type Action =
  | { type: 'SIGN_UP'; info: IUser }
  | { type: 'SIGN_OUT'; email: string }
  | { type: 'LOG_IN'; info: IUser }
  | { type: 'LOG_OUT'; email: string }
  | { type: 'CREATE_TODO'; text: string; completedDate: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'REMOVE_TODO'; id: number }
  | { type: 'LOAD_USERS'; users: IUser[] };

function todoReducer(state: IUser[] = initialTodos, action: Action): IUser[] | undefined {
  switch (action.type) {
    case 'SIGN_UP':
      return state.concat({
        ...action.info,
        isLogged: false,
      });
    case 'SIGN_OUT':
      return state.filter((user: IUser) => user.email !== action.email);
    case 'LOG_IN':
      return state.map((user: IUser) =>
        user.email === action.info.email && user.password === action.info.password
          ? { ...user, isLogged: !user.isLogged }
          : user
      );
    case 'LOG_OUT':
      return state.map((user: IUser) =>
        user.email === action.email ? { ...user, isLogged: !user.isLogged } : user
      );
    case 'LOAD_USERS':
      return state.concat(action.users);
    case 'CREATE_TODO':
      const nextId = state.todos.length ? Math.max(...state.map((todo) => todo.id)) + 1 : 1;
      return state.concat({
        id: nextId,
        text: action.text,
        done: false,
        completedDate: action.completedDate,
      });
    case 'TOGGLE_TODO':
      return state.map((todo: Itodo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE_TODO':
      return state.filter((todo: Itodo) => todo.id !== action.id);
    default:
      return state;
  }
}

type userDispatch = Dispatch<Action>;

const TodoStateContext = createContext<IUser[] | null>(null);
const UserDispatchContext = createContext<userDispatch | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }): ReactElement {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);

  return (
    <TodoStateContext.Provider value={state || []}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useUserState(): IUser[] {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch(): userDispatch {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
