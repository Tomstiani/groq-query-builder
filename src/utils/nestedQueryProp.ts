import  createGroqQuery from '../index';
import { QueryProps } from '../types';

const nestedQueryProp = (queryProps: QueryProps, fieldName: string) => {
  const query = createGroqQuery(queryProps);
  return `"${fieldName}": ${query}`;
};

export default nestedQueryProp;