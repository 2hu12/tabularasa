export default (store) => {
  let TRDetail = {
    people: {
      fields: [
        {
          label: 'ID',
          field: 'id',
          component: 'NumberInput',
          properties: {
            useGrouping: false,
          },
        },
        {
          label: 'First Name',
          field: 'firstName.nestedFirstName',
          component: 'TextInput',
        },
        {
          label: 'Last Name',
          field: 'lastName',
          component: 'TextInput',
        },
        {
          label: 'Email',
          field: 'email',
          component: 'TextInput',
        },
        {
          label: 'City',
          field: 'city',
          component: 'TextareaInput',
        },
        {
          label: 'Blogs',
          field: 'blogs[].title',
          component: 'AutocompleteInput',
          properties: {
            // Property to extract from objects returned by onComplete function
            field: 'title',
            multiple: true,
            // function to call for search completion
          },
          methods: {
            onComplete: (query) => {
              // FIXME: Lookup blogs in store
              return store.getters['search'](['blogs', 'title', query])
            },
          },
        },
        {
          label: 'Articles',
          field: 'articles[].title',
          component: 'AutocompleteInput',
          properties: {
            multiple: true,
          },
        },
      ],
    },
    blogs: {
      fields: [
        {
          label: 'ID',
          field: 'id',
          component: 'TextInput',
        },
        {
          label: 'Title',
          field: 'title',
          component: 'TextInput',
        },
        {
          label: 'Author',
          field: 'author.lastName',
          component: 'AutocompleteInput',
          methods: {
            onComplete: (query) => {
              console.log('CHANGED', query)
            },
          },
        },
        {
          label: 'Date created',
          field: 'date',
          component: 'DateInput',
          properties: {
            showTime: true,
            hourFormat: '12',
            dateFormat: 'dd-mm-yy',
          },
        },
        {
          label: 'Contributors',
          field: 'articles[].authors[].lastName',
          component: 'AutocompleteInput',
          properties: {
            multiple: true,
          },
        },
      ],
    },
    articles: {
      fields: [
        {
          label: 'ID',
          field: 'id',
          component: 'TextInput',
        },
        {
          label: 'Title',
          field: 'title',
          component: 'TextInput',
        },
        {
          label: 'Published?',
          field: 'published',
          component: 'BooleanInput',
        },
        {
          label: 'Authors',
          field: 'authors[].lastName',
          component: 'AutocompleteInput',
          properties: {
            multiple: true,
          },
        },
      ],
    },
  }

  let TRList = {
    people: {
      name: 'people',
      detail: TRDetail.people,
      properties: {
        lazy: false,
        paginatorPosition: 'top',
      },
      filters: {
        lastName: { operator: 'and', constraints: [{ matchMode: 'contains' }] },
      },
      fields: [
        {
          label: 'ID',
          field: 'id',
          properties: {
            sortable: true,
          },
        },
        {
          label: 'First Name',
          field: 'firstName.nestedFirstName',
        },
        {
          label: 'Last Name',
          field: 'lastName',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'City',
          field: 'city',
        },
        {
          label: 'Blogs',
          field: 'blogs[].title',
          component: 'ChipsDisplay',
        },
      ],
    },
    blogs: {
      name: 'blogs',
      detail: TRDetail.blogs,
      properties: {
        lazy: false,
        paginatorPosition: 'top',
      },
      fields: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Title',
          field: 'title',
        },
        {
          label: 'Date created',
          field: 'date',
          component: 'DateDisplay',
          properties: {
            showTime: true,
            dateFormat: 'dd MM yy',
          },
        },
        {
          label: 'Contributors',
          field: 'articles[].authors[].lastName',
          component: 'ChipsDisplay',
        },
        {
          label: 'Articles (via author)',
          field: 'author.articles[].title',
          component: 'ChipsDisplay',
        },
      ],
    },
    articles: {
      name: 'articles',
      detail: TRDetail.articles,
      properties: {
        lazy: false,
      },
      fields: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Title',
          field: 'title',
        },
        {
          label: 'Published?',
          field: 'published',
          component: 'BooleanDisplay',
        },
      ],
    },
  }

  let TRRoot = {
    People: {
      list: TRList.people,
      _custom: {},
    },
    Blogs: {
      list: TRList.blogs,
      _custom: {},
    },
    Articles: {
      list: TRList.articles,
      _custom: {},
    },
  }

  return {
    TRRoot: TRRoot,
    TRList: TRList,
    TRDetail: TRDetail,
  }
}
