[![build status](https://secure.travis-ci.org/reactabular/selectabular.svg)](http://travis-ci.org/reactabular/selectabular) [![bitHound Score](https://www.bithound.io/github/reactabular/selectabular/badges/score.svg)](https://www.bithound.io/github/reactabular/selectabular) [![codecov](https://codecov.io/gh/reactabular/selectabular/branch/master/graph/badge.svg)](https://codecov.io/gh/reactabular/selectabular)

# Selectabular - Selection utilities

Common functionalities when dealing with table rows.
- (De)-Selecting
- Filtering
- Toggling

## API

```javascript
import * as select from 'selectabular';

// Or you can cherry-pick
import { all } from 'selectabular';
import { all as selectAll } from 'selectabular';
```

### `select.all(rows) => [<row>]`

- Returned `rows` is an array where each row has a `.selected=true` attribute

### `select.none(rows) => [<row>]`

- Returned `rows` is an array where each row has a `.selected=false` attribute

### `select.rows(filter)(rows) => { rows: [<row>], selectedRows: [<matchingRow>]}`

Given a filter, it will select the matching rows and return them:

```javascript
const initRows = [
  { id: 10, selected: true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];
const myfilter = row => row.price > 5
const {rows, selectedRows: result } = selectabular.rows(myfilter)(initRows);
>> result
[
  { id: 12,  product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13,  product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];
>> rows
[
  { id: 10, selected: true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, selected: true, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, selected: true, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];
```

**Important!**

- `rows` does *not* toggle the rows that do not match the filter; please use `select.none` a priori for that.
- As shown in the example, `rows`, and `selectedRows` are internal variable names, used in the implementation; which can be easily renamed inline (See example where `selectedRows` is renamed to `result`)

### `select.toggle(filter)(rows) => [<row>]`

- Input rows where each filter-matching row is toggled its `selected` attribute.

```javascript
const initRows = [
  { id: 10, selected: false, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11, selected: true, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];
const filter = row => row.id < 12
const result = selectabular.toggle(filter)(initRows);
 >> result
[
  { id: 10, selected: true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11, selected: false, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];
```

## React Helpers

### Selecting by Arrow Keys

There's a single React specific helper that makes it easier to track up/down arrows. The API consists of a single higher order function: `select.byArrowKeys({ rows: <rows>, selectedRowIndex: <number>, onSelectRow: (selectedRowIndex) => <any>})(<React element>) => <React element>`

If there is a selection (`selectedRowIndex`), then it triggers `onSelectRow` with the new `selectedRowIndex` which you can then use to update your selection state.

### How to Use?

The following example illustrates how to use the functionality with a Reactabular based table. You can select a row by clicking in the following example. If there's a selection, you can move up and down using the arrow keys.

```jsx
/*
import React from 'react';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { compose } from 'redux';
import * as Table from 'reactabular-table';
import * as select from 'selectabular';
*/

const rows = [
  {
    id: 100,
    name: 'Adam',
    age: 55
  },
  {
    id: 102,
    name: 'Joe',
    age: 12
  },
  {
    id: 101,
    name: 'Brian',
    age: 62
  },
  {
    id: 103,
    name: 'Mike',
    age: 22
  },
  {
    id: 104,
    name: 'Jack',
    age: 33
  }
];

const columns = [
  {
    property: 'name',
    header: {
      label: 'Name'
    }
  },
  {
    property: 'age',
    header: {
      label: 'Age'
    }
  }
];

class SelectionTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows,
      columns,
      selectedRows: []
    };

    this.onRow = this.onRow.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.getSelectedRowIndex = this.getSelectedRowIndex.bind(this);
  }
  render() {
    const { columns, rows, selectedRows } = this.state;
    const selectedRowIndex = this.getSelectedRowIndex(selectedRows);

    return select.byArrowKeys({
      rows,
      selectedRowIndex,
      onSelectRow: this.onSelectRow
    })(
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />

          <Table.Body
            rows={rows}
            rowKey="id"
            onRow={this.onRow}
          />

          <tfoot>
            <tr>
              <td>Selected: {selectedRows[0] && selectedRows[0].name}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table.Provider>
      </div>
    );
  }
  onRow(row, { rowIndex }) {
    return {
      className: classnames(
        rowIndex % 2 ? 'odd-row' : 'even-row',
        row.selected && 'selected-row'
      ),
      onClick: () => this.onSelectRow(rowIndex)
    };
  }
  onSelectRow(selectedRowIndex) {
    const { rows } = this.state;
    const selectedRowId = rows[selectedRowIndex].id;

    this.setState(
      compose(
        select.rows(row => row.id === selectedRowId),
        select.none
      )(rows)
    );
  }
  getSelectedRowIndex(selectedRows) {
    return findIndex(this.state.rows, {
      id: selectedRows[0] && selectedRows[0].id
    });
  }
}

<SelectionTable />
```

## License

MIT. See LICENSE for details.
