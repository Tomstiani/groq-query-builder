import { SliceProps } from '../types';

const createSliceString = ({start, end, inclusive}: SliceProps) => {
  if(start == null || undefined) return '';

  // wrap in square brackets before returning
  const wrapInBrackets = (str: string) => `[${str}]`;

  // create the slice string
  const createSlice = (start: number, end: number, inclusive: boolean) => {
    if(!end) return `${start}`;

    return `${start}${inclusive ? '..' : '...'}${end}`;
  };
  const sliceString = createSlice(start, end, inclusive);

  // Return the slice string
  return wrapInBrackets(sliceString);
};

export default createSliceString;