# GROQ Query Builder

Any questions or suggestions? Feel free to open an issue or PR, or send me a slack. I'm sure there are a lot of improvements to be made.

Should be added to a package later

# Example Queries
### Simple query
```ts
createGroqQuery({
  filter: [
    {
      field: '_type',
      operator: '==',
      value: 'landingPage',
    },
  ],
  includeDrafts: false,
  properties: [
    '_id',
    'title',
  ],
  slice: {
    start: 0,
    end: 10,
  },
  order: {
    rules: [
      {
        field: 'title',
        direction: 'asc',
      },
    ],
    orderBeforeResult: true,
  }
})
```
`*[_type == "landingPage" && !(_id in path("drafts.**"))]{_id, title} | order(title asc)[0...10]`

## createGroqQuery() options
### filter
```ts
filter([{
  field: string,
  operator: enum{
    'in' | '==' | '!=' | '<' | '<=' | '>' | '>=' | 'match' | 'dontMatch'
  },
  value: string,
}])

filter: [
  {
    field: "_type"
    operator: '=='
    value: 'landingPage'
  },
  {
    field: '_id'
    operator: '!='
    value: 'Esdg547'
  }
]
```
`[_type == "landingPage" && _id != 'Esdg547']`

### includeDrafts
Adds `!(_id in path("drafts.**"))` to the filters, not necessary if perspectives are implemented. 
```ts
includeDrafts: Boolean
```

### properties

More advanced properties can be added as objects, see [Advanced properties](#advanced-properties)
```ts
properties: Array<string | object>

properties: [
  '_id',
  'title',
  {
    query: () => {
      return 'Blah';
    },
  },
]
```
`{_id, title, Blah}`
```

### slice
```ts
slice({
  start: number,
  end: number,
  inclusive: boolean,
})

slice: {
  start: 0,
  end: 10,
  inclusive: true,
}
```
`[0..10]`

### order

When you dont order before the result, the slice will be applied before the order, and the query will use the default ordering of the dataset.

If you want let's say the first 10 results ordered by title alphabetically, you need to order before the slice. 

```ts
order({
  rules: [
    {
      field: string,
      direction: enum{
        'asc' | 'desc'
      }
    }
  ],
  orderBeforeResult: boolean,
})

order: {
  rules: [
    {
      field: 'title',
      direction: 'asc',
    },
  ],
  orderBeforeResult: true,
}
```
Order the query before or after the slice
- Order before slice: `| order(title asc)[0...10]`
- Order after slice: `[0...10] | order(title asc)`

## Advanced properties
### Nested Queries
```ts
createGroqQuery({
  properties: [
    '_id',
    'title',
    // Add an object with query prop
    {
      query: () => {
        return nestedQueryProp({
          filter: [
            {
              field: 'category',
              operator: '==',
              value: 'inspiration',
            }
          ],
          includeDrafts: true,
        },
        'categories');
      }
    }
  ],
  {...}
})
```
`*[_type == "landingPage" && !(_id in path("drafts.**"))]{_id, title, "categories": *[category == "inspiration"]}[0...10]`

### Array field
```ts
createGroqQuery({
  properties: [
    '_id',
    'title',
    // Add an object with query prop
    {
      query: () => {
        return arrayProp({
          targetName: 'world',
          targetFilter: [
            {
              field: 'slug.current',
              operator: '==',
              value: 'home',
            },
          ],
          targetProps: [
            'title',
            'slug',
            {
              query: () => {
                return 'Blah';
              },
            },
          ],
        })
      }
    }
  ],
  {...}
})
```
`*[_type == "landingPage" && !(_id in path("drafts.**"))]{_id, title, world[slug.current == "home"]{title, slug, Blah}}[0...10]`

### Rename fields
```ts
createGroqQuery({
  properties: [
    '_id',
    'title',
    // Add an object with query prop
    {
      query: () => {
        return namedProp({
          target: '_id',
          newName: 'categoryId',
        });
      }
    }
  ],
  {...}
})
```
`*[_type == "landingPage" && !(_id in path("drafts.**"))]{_id, title, "categoryId": _id}[0...10]`

### Count
```ts
createGroqQuery({
  properties: [
    '_id',
    'title',
    // Add an object with query prop
    {
      query: () => {
        return countProp({
          fieldName: 'nrOfCategories',
          target: {
            query: () => {
              return createGroqQuery({
                filter: [
                  {
                    field: '_type',
                    operator: '==',
                    value: 'category',
                  }
                ],
              });
            }
          }
        });
      }
    }
  ],
  {...}
})
```
`*[_type == "landingPage" && !(_id in path("drafts.**"))]{_id, title, "nrOfCategories": count(*[_type == "category" && !(_id in path("drafts.**"))])}[0...10]`

### References (WIP)
The reference query needs to be typed manually as a sting
```ts
createGroqQuery({
  properties: [
    '_id',
    'title',
    // Add an object with query prop
    {
      query: () => {
        return referenceProp({
          fieldName: 'landingPageImageUrl',
          query: 'heroImage.asset->url, ...}'
        });
      }
    }
  ],
  {...}
})
```
`*[_type == "landingPage" && !(_id in path("drafts.**"))]{_id, title, "landingPageImageUrl": heroImage.asset->url, ...}}`