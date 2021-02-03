# SLD - Search List Detail

SLD is a Vue plugin which acts as a wrapper around a variety of [PrimeVue]{https://www.primefaces.org/primevue/} widgets to provide a Search-List-Detail interface.

SLD takes in a `configuration` 'schema' (which defines the look and feel of the UI, and how data is presented), and `collections` data, which contains data items to be displayed.

SLD treats `collection` data as read-only. No changes are made to the passed-in object - instead, when data is edited, events are generated, containing the old and new data.

# Installation

First create a new Vue app:

vue create <my-app>

Edit `src/main.js` adding the following before `new Vue` is called:

```
import * as sld from 'sld'
Vue.use(sld)
```

# Demo

There is a `testapp` which demonstrates the use of SLD. This can be run by cloning this repository and then running:

```
# Install the package dependencies
yarn

# Run the demo
yarn serve
```

# Usage

## Configuration

### Data

SLD follows the convention of DataTable to expect data as an array of objects. These are referred to here as `collections` of `items`.

### Schema

SLD uses a configuration schema to configure the UI, and the presentation of the data. Where possible order in the schema will be preserved in the UI.

It takes the following structure:

```
{
  Collection_Name: {
    ListTable: {
      fields: [
        label: 'Column header label',
        field: 'fieldName', // Property in the data item containing the value for this column
      ],
      props: {
        // Properties to be passed direct to DataTable (for styling etc)
      },
    },
    DetailCard: {
      fields: [
        {
          label: 'Field label',
          field: 'fieldName', // Property in the data item containing the value for this field
          input: 'TextInput', // Input widget to be used to display this field.
        },
      ],
      props: {
        // Properties to be passed direct to DetailCard's child components/inputs (for styling etc)
      }
    }
  }
}
```

## Components

There are 2 components in SLD:

1. `RootPage` - A `TabView` where each tab is a `ListTable`.
2. `ListTable` - A `DataTable`.

### Common Properties

All components take the following common properties:

* `configuration` - A `Configuration` schema object.

### RootPage

The `RootPage` component takes the following properties:

* `collections` - An object containing collections, keyed by colelction name.
* `events` - An object where the key is an event, and the value a function to be called. This simplifies the process of registering callbacks for the various events SLD can generate.

### ListTable

The `ListTable` component takes the following properties:

* `name` - The name of the generated table. This is used to identify the table, for example in `RootPage` tab titles.
* `collection` - An array of 'data' items.

### DetailCard

The `DetailCard` component is not usually called directly, being used inside a `Dialog` launched when a row is clicked on.

It takes the following properties:

* `name` - The name of the item being displayed (used in `Dialog` title).
* `item` - The object containing all the item's data.

## Widgets

Fields displayed in the DetailCard can use a variety of widgets provided to display fields in different ways. The widget can be selected by setting `InputType` in the configuration schema.

The following widgets are available - mostly wrappers around PrimeVue components of the same/similar name:

* `BooleanInput`
* `ChipsInput`
* `DateInput`
* `DropdownInput`
* `TextInput`
* `TextareaInput`

## Events

SLD generates events at various points in the UI. These are all sent to SLD's own `Event Bus`, built using [mitt]{https://github.com/developit/mitt}

To provide global access to the bus in your Vue app, do the following:

```
Vue.prototype.$sldbus = sld.bus
```

You can then access the bus in your own components as `this.$sldbus` or `$sldbus` inside the template.

Events are sent using the `emit` method, and listened to using the `on` method:

```
// SLD component
this.$sldbus.emit('message', 'Hello World')

// Your component
this.$sldbus.on('message', (msg) => console.log(msg))
```

If you don't want to have access to the bus 'globally' you can instead do the following in a specific component:

```
import { bus } from 'sld'
```

### Event Scoping

Since components may be reused, events can be scoped by setting the `name` property on a component, for example:

```
<ListTable :name="people" />
<ListTable :name="blogs" />
```

This is the default behaviour for RootPage, which sets `name` to be the collection key from the passed-in data.

This name will then be prepended to the event label, separated by a `:`

You can either listen for events within a specific component, e.g:

```
this.$sldbus.on('people:message', (msg) => console.log(msg))
```

Or you can use the wildcard `*` to listen for all events, and then filter on event label, e.g:

```
this.$sldbus.on('*', (label, msg) => {
  if label.startsWith('people:') {
    console.log(msg))
  }
}
```

### RootPage Events

At present RootPage emits no events.

### ListTable Events

* _page_ - Pagination event. Event passes an object containing `offset` and `limit` values. Useful for dynamic data fetching/updating from an API.
* _reload_ - Page reload event. User has pressed the reload button, or part of the UI is requesting a refresh.
* _row-select_ - A row has ben selected. Event passes selected row's data object.

_Note_ - these may be prefixed with `name:` if set.

### DetailCard Events

* _input_ - Fires every time a field is updated (e.g. every keypress). Event is an array containing the original data object, and a new object containing the modified field.
* _blur_ - Field was updated, then lost focus (e.g. user clicked elsewhere). Event is an array containing original data object, and a new object containing the modified field.
* _save_ - Save button clicked. Event is an array containing the original data object, and a new object containing all modified properties.

_Note_ - these may be prefixed with `name:` of the parent ListTable if set.

These events allow for 3 different modes of operation when users edit your data. For example:

* Update a single field in your API on every keypress => _input_
* Update a single field in your API when the user switches to the next field => _blur_
* Update all changed fields in your API when the card is saved => _save_
