import { DATE_OPTIONS } from './constant';

export const getDate = (): string => {
  const date = new Date();
  return date.toLocaleString('en-US', DATE_OPTIONS);
};
