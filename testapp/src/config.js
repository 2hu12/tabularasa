export default {
  people: {
    SLDList: {
      fields: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'First Name',
          field: 'first_name.nested_first_name',
        },
        {
          label: 'Last Name',
          field: 'last_name',
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
          field: 'blogs',
        },
      ],
      props: {
        paginatorPosition: 'top',
      },
    },
    SLDDetail: {
      fields: [
        {
          label: 'ID',
          field: 'id',
          input: 'TextInput',
        },
        {
          label: 'First Name',
          field: 'first_name.nested_first_name',
          input: 'TextInput',
        },
        {
          label: 'Last Name',
          field: 'last_name',
          input: 'TextInput',
        },
        {
          label: 'Email',
          field: 'email',
          input: 'TextInput',
        },
        {
          label: 'City',
          field: 'city',
          input: 'TextareaInput',
        },
        {
          label: 'Blogs',
          field: 'blogs',
          input: 'ChipsInput',
        },
        {
          label: 'Articles',
          field: 'articles',
          input: 'ChipsInput',
        },
      ],
    },
  },
  blogs: {
    SLDList: {
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
        },
      ],
      props: {
        paginatorPosition: 'top',
      },
    },
    SLDDetail: {
      fields: [
        {
          label: 'ID',
          field: 'id',
          input: 'TextInput',
        },
        {
          label: 'Title',
          field: 'title',
          input: 'TextInput',
        },
        {
          label: 'Author',
          field: 'author',
          input: 'DropdownInput',
        },
        {
          label: 'Date created',
          field: 'date',
          input: 'DateInput',
        },
      ],
    },
  },
  articles: {
    SLDList: {
      fields: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Title',
          field: 'title',
        },
      ],
      props: {
        paginatorPosition: 'both',
      },
    },
    SLDDetail: {
      fields: [
        {
          label: 'ID',
          field: 'id',
          input: 'TextInput',
        },
        {
          label: 'Title',
          field: 'title',
          input: 'TextInput',
        },
        {
          label: 'Authors',
          field: 'authors',
          input: 'ChipsInput',
        },
      ],
    },
  },
}
