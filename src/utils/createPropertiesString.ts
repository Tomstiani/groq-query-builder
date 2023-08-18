import { PropertyType } from '../types';

// Create the properties string
const createPropertiesString = (properties?: PropertyType[]) => {
  if(!properties) return '';
  
  // create the properties array
  const createProperties = (properties: PropertyType[]) => {
    return properties.map((property) => {
      // if the property is a string, return it
      if(typeof property === 'string') return property;

      // if the property is an object, return the query
      if(typeof property === 'object') {
        return property.query();
      }
    });
  };
  
  const propertiesArray = createProperties(properties);


  // wrap in curly brackets before returning
  const wrapInCurlyBrackets = (str: string) => `{${str}}`;

  // create the properties string
  const propertiesString = propertiesArray.join(', ');

  // return the properties string
  return wrapInCurlyBrackets(propertiesString);
};

export default createPropertiesString;