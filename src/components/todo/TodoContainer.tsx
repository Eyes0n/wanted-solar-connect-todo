import { ReactElement, useEffect, useCallback } from 'react';
import TodoTemplate from './template/TodoTemplate';
import TodoHead from './template/head/TodoHead';
import TodoList from './template/list/TodoList';
import TodoCreate from './template/create/TodoCreate';
import TodoFooter from './template/footer/TodoFooter';
import { useTodoDispatch, useTodoState } from 'context/TodoContext';

const TodoContainer = (): ReactElement => {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();

  const loadData = useCallback((): void => {
    const data = localStorage.getItem('todos') || '[]';
    dispatch({ type: 'LOAD_TODOS', todos: JSON.parse(data) });
  }, [dispatch]);

  const saveData = useCallback((): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    loadData();
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
