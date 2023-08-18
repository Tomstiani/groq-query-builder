import { ExtendedPropertyType, FilterProps } from '../types';
import createFilterString from './createFilterString';
import createPropertiesString from './createPropertiesString';

const arrayProp = ({targetName, targetFilter, targetProps}: {targetName: string, targetFilter?: FilterProps[], targetProps: Array<string | ExtendedPropertyType>}) => {
  let filterString = '[]';
  let properties = '';

  if(targetFilter) {
    filterString = createFilterString({filter: targetFilter, includeDrafts: true});
  }
  
  properties = createPropertiesString(targetProps);

  return `${targetName}${filterString}${properties}`;
};

console.log(arrayProp({
  targetName: 'world',
  targetFilter: [
    {
      field: 'slug.current',
      operator: '==',
      value: 'home'
    }
  ],
  targetProps: ['title', 'slug', {
    query: () => {
      return 'Blah';
    }
  }],
}));

export default arrayProp;