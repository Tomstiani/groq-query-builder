import { OrderProps } from '../types';

const createOrderString = (order: OrderProps) => {
  if(!order.rules) return '';

  let orderString = '';

  //if rules is an array, create the order string
  if(Array.isArray(order.rules)) {
    orderString = order.rules.map((rule) => {
      return createOrderString({
        rules: rule,
      });
    }).join(' ');
    return orderString;
  }

  orderString = ` | order(${order.rules.field} ${order.rules.direction})`;

  return orderString;
};

export default createOrderString;