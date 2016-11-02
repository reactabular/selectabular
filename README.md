[![build status](https://secure.travis-ci.org/reactabular/selectabular.svg)](http://travis-ci.org/reactabular/selectabular) [![bitHound Score](https://www.bithound.io/github/reactabular/selectabular/badges/score.svg)](https://www.bithound.io/github/reactabular/selectabular) [![codecov](https://codecov.io/gh/reactabular/selectabular/branch/master/graph/badge.svg)](https://codecov.io/gh/reactabular/selectabular)

# Selectabular - Selection utilities

Common functionalities when dealing with table rows. 
- (De)-Selecting
- Filtering
- Toggling

## API

### `select.all(rows)`

#### Returns:

- `rows` array where each row has a `.selected=true` attribute

### `select.none(rows)`

#### Returns:

- `rows` array where each row has a `.selected=false` attribute



### `select.rows(filter)(rows)`

Given a filter, it will select the matching rows and return them

```javascript
const initRows = [
  { id: 10, selected:true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];
const myfilter = row => row.price > 5
const {rows, selectedRows: result } = selectabular.rows(myfilter)(initRows);
//  >> result 
//  [{ id: 12,  product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
//   { id: 13,  product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }];
//  >> result 
//  >> rows
//  { id: 10, selected:true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
//  { id: 11, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
//  { id: 12, selected:true, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
//  { id: 13, selected:true, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
//];
```

#### Returns:

- `rows`: original rows, where each row's `.selected` is set to `true` if it matches the filter.
- `selectedRows`: array containing *only* those rows matching the filter.

#### Notes:

- `rows` does *not* toggle the rows that do not match the filter; please use `select.none` a priori for that.
- As shown in the example, `rows`, and `selectedRows` are internal variable names, used in the implementation; which can be easily renamed inline (See example where `selectedRows` is renamed to `result`)




### `select.toggle(filter)(rows)`

#### Returns:

- Input rows where each filter-matching row is toggled its `selected` attribute.

```javascript
const initRows = [
  { id: 10, selected: false, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11, selected: true, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];
const fil = row => row.id < 12
const result = selectabular.toggle(fil)(initRows);
// >> result
//[
//  { id: 10, selected: true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
//  { id: 11, selected: false, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
//  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
//  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
//];
```
## License

MIT. See LICENSE for details.
