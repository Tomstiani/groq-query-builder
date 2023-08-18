import { ExtendedPropertyType } from '../types';

const namedProp = ({target, newName}: {target: string | ExtendedPropertyType, newName: string}) => {
  return `"${newName}": ${target}`;
};

export default namedProp;