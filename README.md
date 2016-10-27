[![build status](https://secure.travis-ci.org/reactabular/selectabular.svg)](http://travis-ci.org/reactabular/selectabular) [![bitHound Score](https://www.bithound.io/github/reactabular/selectabular/badges/score.svg)](https://www.bithound.io/github/reactabular/selectabular) [![codecov](https://codecov.io/gh/reactabular/selectabular/branch/master/graph/badge.svg)](https://codecov.io/gh/reactabular/selectabular)

# Selectabular - Selection utilities

Common functionalities when dealing with table rows. 
- (De)-Selecting
- Filtering
- Toggling

## API

### `select.all(rows)`
Returns:
- `rows` array where each row has a `.selected=true` attribute

### `select.none(rows)`
Returns:
- `rows` array where each row has a `.selected=false` attribute

### `select.rows(filter)(rows)`
Given a filter, it will select the matching rows and return them
```javascript
const initRows = [
  { id: 10, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11,  product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];
const myfilter = row => row.price > 5
const {rows, selectedRows: result } = selectabular.rows(myfilter)(initRows);
console.log(result)
//=> Returns rows with price > 5
//  [{ id: 12,  product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
//   { id: 13,  product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }];
```

Returns:
- `rows`: original rows
- `selectedRows`: array containing all filter-matching rows

Notes:
As shown in the example, `rows`, and `selectedRows` are internal variable names, used in the implementation; which can be easily renamed inline (See example where `selectedRows` is renamed to `result`)


### `select.toggle(filter)(rows)`
Returns:
- Input rows where each filter-matched row is toggled its `selected` attribute.
```javascript
const initRows = [
  { id: 10, selected: false, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11, selected: true, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];
const fil = row => row.id < 12
//Returns matched ones inverting 'selected'
const result = selectabular.toggle(fil)(initRows);
//=>
//[
//  { id: 10, selected: true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
//  { id: 11, selected: false, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 }
//];
```
## License

MIT. See LICENSE for details.
