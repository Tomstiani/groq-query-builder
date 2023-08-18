import { FilterProps } from '../types';

// Create the filter string
const createFilterString = ({filter, includeDrafts}: {filter: FilterProps | FilterProps[], includeDrafts: boolean}) => {

  // set default value for includeDrafts
  if(includeDrafts === undefined) includeDrafts = false;

  // wrap in square brackets before returning
  const wrapInBrackets = (str: string) => `[${str}]`;

  // create the filter string
  const createFilter = (filter: FilterProps | FilterProps[]) => {
    if (Array.isArray(filter)) {
      return filter.map((f) => createFilter(f)).join(' && ');
    }

    // if the value is an array, wrap each value in quotes
    if (Array.isArray(filter.value)) {
      const values = filter.value.map((value) => `"${value}"`);
      return `${filter.field} ${filter.operator} [${values.join(', ')}]`;
    }

    if(filter.operator === 'match') return `${filter.field} ${filter.operator}("*${filter.value}")`;
    if(filter.operator === 'dontMatch') return `!${filter.field} ${filter.operator} ("*${filter.value}")`;

    return `${filter.field} ${filter.operator} "${filter.value}"`;
  };
  const filterString = createFilter(filter);

  // add the includeDrafts filter
  const includeDraftsFilter = !includeDrafts ? ' && !(_id in path("drafts.**"))' : '';

  // return the filter string
  return wrapInBrackets(`${filterString}${includeDraftsFilter}`);
};

export default createFilterString;