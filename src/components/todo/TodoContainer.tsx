import { ReactElement, useEffect, useCallback } from 'react';
import TodoTemplate from './template/TodoTemplate';
import TodoHead from './template/head/TodoHead';
import TodoList from './template/list/TodoList';
import TodoCreate from './template/create/TodoCreate';
import TodoFooter from './template/footer/TodoFooter';
import { useTodoDispatch, useUserState } from 'context/TodoContext';
import { base64crypto } from 'utils/base64crypto';

const TodoContainer = (): ReactElement => {
  const todos = useUserState();
  const dispatch = useTodoDispatch();

  const loadData = useCallback((): void => {
    //TODO
    const data = localStorage.getItem('todos') || '[]';
    dispatch({ type: 'LOAD_USERS', todos: JSON.parse(data) });
  }, [dispatch]);

  const saveData = useCallback((): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    loadData();
    console.log(base64crypto('1234'));
  }, [loadData]);

  useEffect(() => {
    saveData();
  }, [saveData, todos]);

  return (
    <>
      <TodoTemplate>
        <TodoHead />
        <TodoCreate />
        <TodoList />
        <TodoFooter />
      </TodoTemplate>
    </>
  );
};

export default TodoContainer;
