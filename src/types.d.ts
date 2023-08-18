export type SliceProps = {
  start: number;
  end?: number;
  inclusive?: boolean;
}

export type OrderProps = {
  rules: {
    field: string;
    direction: 'asc' | 'desc';
  }[] | {
    field: string;
    direction: 'asc' | 'desc';
  };
  orderBeforeResult?: boolean;
};

export type FilterProps = {
  field: string;
  operator: 'in' | '==' | '!=' | '<' | '<=' | '>' | '>=' | 'match' | 'dontMatch';
  value: string[] | string;
}

type QueryProps = {
  type?: string;
  filter?: FilterProps[] | FilterProps;
  includeDrafts?: boolean;
  properties?: PropertyType[];
  slice?: SliceProps;
  order?: OrderProps;
};

export type ExtendedPropertyType = {query: () => string};
export interface namedPropertyType extends ExtendedPropertyType {name: string}
export interface CountPropertyType extends ExtendedPropertyType {name: string}


export type PropertyType = string | ExtendedPropertyType | namedPropertyType | CountPropertyType;