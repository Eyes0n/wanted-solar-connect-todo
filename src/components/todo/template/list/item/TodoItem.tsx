import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { Modal } from 'antd';
import { CheckOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Itodo } from 'components/todo/TodoService';
import { useTodoDispatch } from 'context/TodoContext';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const CompletedDateText = styled(Text)`
  flex: 0.5;
`;

interface TodoItemProps {
  todo: Itodo;
}

const TodoItem = ({ todo }: TodoItemProps): ReactElement => {
  const dispatch = useTodoDispatch();

  const handleToggle = (): void => {
    dispatch({ type: 'TOGGLE', id: todo.id });
  };

  const { confirm } = Modal;

  function showConfirm(): void {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'incomplete items',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch({ type: 'REMOVE', id: todo.id });
      },
      onCancel() {
        return;
      },
    });
  }

  const handleRemove = (): void => {
    todo.done ? dispatch({ type: 'REMOVE', id: todo.id }) : showConfirm();
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={todo.done} onClick={handleToggle}>
        {todo.done && <CheckOutlined />}
      </CheckCircle>
      <Text done={todo.done}>{todo.text}</Text>
      {todo.completedDate && (
        <CompletedDateText done={todo.done}>
          {`complete: ${todo.completedDate.substring(5)}`}
        </CompletedDateText>
      )}
      <Remove onClick={handleRemove}>
        <DeleteOutlined />
      </Remove>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
