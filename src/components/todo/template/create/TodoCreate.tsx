import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { PlusCircleOutlined } from '@ant-design/icons';
import { DatePicker, Modal } from 'antd';
import { Itodo } from 'components/todo/TodoService';

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #dddddd;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const SDatePicker = styled(DatePicker)`
  flex: 0.25;
`;
interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({ nextId, createTodo, incrementNextId }: TodoCreateProps): ReactElement => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [completedDate, setCompletedDate] = useState(moment().format('YYYY-MM-DD'));

  const handleToggle = () => setOpen(!open);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  function error() {
    Modal.error({
      title: 'Please fill in with no blanks',
      content: 'The todo entry or completion target date is empty.',
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    if (!value || !completedDate) return error();

    createTodo({
      id: nextId,
      text: value,
      done: false,
      completedDate: completedDate,
    });
    incrementNextId(); // nextId 하나 증가

    setValue(''); // input 초기화
    setOpen(false); // open 닫기
    setCompletedDate('');
  };

  const onChange = (_date: any, dateString: string): void => {
    setCompletedDate(dateString);
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
          />
          <SDatePicker
            value={completedDate !== '' ? moment(completedDate) : moment()}
            disabledDate={(current) => current && current < moment.min(moment().subtract(1, 'd'))}
            onChange={onChange}
          />

          <CircleButton onClick={handleToggle} open={open}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
