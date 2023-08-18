import { QueryProps } from './types';
import createFilterString from './utils/createFilterString';
import createOrderString from './utils/createOrderString';
import createPropertiesString from './utils/createPropertiesString';
import createSliceString from './utils/createSliceString';

const createGroqQuery = ({
  filter,
  includeDrafts = false,
  properties,
  slice,
  order,
}: QueryProps) => {

  const filterString = filter ? createFilterString({filter, includeDrafts}) : '';
  const propertiesString = properties ? createPropertiesString(properties): '';
  const sliceString = slice ? createSliceString(slice): '';
  const orderString = order ? createOrderString(order): '';
  let queryString = '';

  // create the query string
  if(order?.orderBeforeResult){
    // eslint-disable-next-line max-len
    queryString = `*${filterString}${propertiesString}${order.orderBeforeResult ? orderString + sliceString : sliceString + orderString}`;
  }
  queryString = `*${filterString}${propertiesString}${orderString}${sliceString}`;
    
  return queryString;
};

//export { createGroqQuery } as main;
export default createGroqQuery;