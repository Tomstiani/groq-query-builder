import { ExtendedPropertyType } from '../types';

const countProp = ({fieldName, target}: {fieldName: string, target: string | ExtendedPropertyType}): string => {
  if(typeof target === 'string'){
    return `"${fieldName}": count(${target})`;
  } else {
    return `"${fieldName}": count(${target.query()})`;
  }
};

export default countProp;