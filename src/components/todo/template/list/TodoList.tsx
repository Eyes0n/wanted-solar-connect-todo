import React, { ReactElement } from 'react';
import styled from 'styled-components';
import TodoItem from './item/TodoItem';
import { useTodoState } from 'context/TodoContext';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoList = (): ReactElement => {
  const todos = useTodoState();

  return (
    <TodoListBlock>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </TodoListBlock>
  );
};

export default React.memo(TodoList);
