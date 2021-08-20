import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { PlusCircleOutlined } from '@ant-design/icons';
import { DatePicker, Modal } from 'antd';
import { useTodoDispatch } from 'context/TodoContext';

const CircleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #33bb77;
  color: white;
  font-size: 60px;
  transform: translate(50%, 0%);
  outline: none;
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

  input {
    color: #119955;
    font-weight: 600;
  }
`;

const TodoCreate = (): ReactElement => {
  const [value, setValue] = useState('');
  const [completedDate, setCompletedDate] = useState(moment().format('YYYY-MM-DD'));
  const dispatch = useTodoDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setValue(e.target.value);

  function error(): void {
    Modal.error({
      title: 'Please fill in with no blanks',
      content: 'The todo entry or completion target date is empty.',
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!value || !completedDate) return error();

    dispatch({ type: 'CREATE', text: value, completedDate: completedDate });

    setValue('');
    setCompletedDate(moment().format('YYYY-MM-DD'));
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

          <CircleButton>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
