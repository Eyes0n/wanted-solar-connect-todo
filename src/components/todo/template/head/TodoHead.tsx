import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDate } from 'utils/date';

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const TodoHead = (): ReactElement => {
  //@TODO 현재 시간을 표시해야합니다.
  const [date, setDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(getDate());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [dayString, ...dateString] = date.split(',');

  return (
    <TodoHeadBlock>
      <DayText>{dayString}</DayText>
      <DateText>{dateString.join(',').trim()}</DateText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
