const referenceProp = ({fieldName, query}: {fieldName: string, query: string}) => {
  return `"${fieldName}": ${query}`;
};

export default referenceProp;