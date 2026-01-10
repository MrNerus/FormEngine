[
    {
      id: 'schemaName',
      name: 'schemaName',
      label: 'Schema Name',
      type: 'text',
      placeholder: 'Enter Schema Name',
    },
    {
      id: 'title',
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter Title',
    },
    {
      id: 'apiEndPoint',
      name: 'apiEndPoint',
      label: 'API End Point',
      type: 'text',
      placeholder: 'Enter API End Point',
    },
    {
      id: 'mainTable',
      name: 'mainTable',
      label: 'Main Table',
      type: 'text',
      placeholder: 'Enter Main Table',
    },
    {
      id: 'keyColumn',
      name: 'keyColumn',
      label: 'Key Column',
      type: 'text',
      placeholder: 'Enter Key Column',
    },
    {
      id: 'columns',
      name: 'columns',
      label: 'Columns',
      type: 'subForm',
      count: 5,
      fields: [
        {
          id: 'key',
          name: 'key',
          label: 'Key',
          type: 'text',
          placeholder: 'Enter Key',
        },
        {
          id: 'dbKey',
          name: 'dbKey',
          label: 'DB Key',
          type: 'text',
          placeholder: 'Enter DB Key',
        },
        {
          id: 'title',
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter Title',
        },
        {
          id: 'hidden',
          name: 'hidden',
          label: 'Hidden',
          type: 'check',
        },
        {
          id: 'noSearch',
          name: 'noSearch',
          label: 'No Search',
          type: 'check',
        },
        {
          id: 'columnNgStyle',
          name: 'columnNgStyle',
          label: 'Column Ng Style',
          type: 'text',
          placeholder: 'Enter Column Ng Style',
        },
        {
          id: 'focusTo',
          name: 'focusTo',
          label: 'Focus To',
          type: 'text',
          placeholder: 'Enter Focus To',
        },
        {
          id: 'appliedDecimalPipe',
          name: 'appliedDecimalPipe',
          label: 'Applied Decimal Pipe',
          type: 'check',
        },
        {
          id: 'sourceTableAlias',
          name: 'sourceTableAlias',
          label: 'Source Table Alias',
          type: 'text',
          placeholder: 'Enter Source Table Alias',
        },
        {
          id: 'sourceTable',
          name: 'sourceTable',
          label: 'Source Table',
          type: 'text',
          placeholder: 'Enter Source Table',
        },
        {
          id: 'dataType',
          name: 'dataType',
          label: 'Data Type',
          type: 'text',
          placeholder: 'Enter Data Type',
        },
      ]
    },
    {
      id: 'relationalJoins',
      name: 'relationalJoins',
      label: 'Relational Joins',
      type: 'subForm',
      count: 5,
      fields: [
        {
          id: 'sourceTable',
          name: 'sourceTable',
          label: 'Source Table',
          type: 'text',
          placeholder: 'Enter Source Table',
        },
        {
          id: 'query',
          name: 'query',
          label: 'Query',
          type: 'text',
          placeholder: 'Enter Query',
        }
      ]
    },
    {
      id: 'whereClause',
      name: 'whereClause',
      label: 'Where Clause',
      type: 'subForm',
      count: 5,
      fields: [
        {
          id: 'query',
          name: 'query',
          label: 'Query',
          type: 'text',
        }
      ]
    }
  ]


  this is my json. it translates to:
  [
    IFormInput,
    IFormInput,
    IFormInput,
    IFormInput,
    IFormInput,
    IFormList = [
        [
            IFormInput,
            IFormInput,
            IFormInput,
            IFormInput,
            IFormInput,
            IFormInput,
            IFormInput,
            IFormInput,
            IFormInput,
            IFormInput,
            IFormInput
        ] (times 5)
    ],

    IFormList = [
        [
            IFormInput,
            IFormInput
        ] (times 5)
    ],
    IFormList = [
        [
            IFormInput
        ] (times 5)
    ]

  ]

  I want json object with their name as key.
  [
    schemaName: value
    title: value
    apiEndPoint: value
    mainTable: value
    keyColumn: value
    columns: [
        [
            key: value,
            dbKey: value,
            title: value,
            hidden: value,
            noSearch: value,
            columnNgStyle: value,
            focusTo: value,
            appliedDecimalPipe: value,
            sourceTableAlias: value,
            sourceTable: value,
            dataType: value
        ] (times 5)
    ],
    relationalJoins: [
        [
            sourceTable: value,
            query: value
        ] (times 5)
    ],
    whereClause: [
        [
            query: value
        ] (times 5)
    ]
  ]