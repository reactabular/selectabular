/* eslint-disable */
import selectabular from '../src/index';

const myrows = [
  { id: 10, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];

describe('select.all', () => {
  const allSelected = selectabular.all(myrows);
  const expected = [
    { id: 10, selected:true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
    { id: 11, selected:true, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
    { id: 12, selected:true, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
    { id: 13, selected:true, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
  ];
  it('returns all rows with selected=true', () => {
    expect(allSelected).toEqual(expected);
  });
});
describe('select.none', () => {
  const initRows = [
    { id: 10, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
    { id: 11, selected:true, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
    { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
    { id: 13, selected:false, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
  ];
  const expected = [
    { id: 10, selected:false, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
    { id: 11, selected:false, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
    { id: 12, selected:false, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
    { id: 13, selected:false, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
  ];
  const result = selectabular.none(initRows);
  it('returns all rows with selected=false', () => {
    expect(result).toEqual(expected);
  });
});
describe('select.rows', () => {
  const initRows = [
    { id: 10, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
    { id: 11,  product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
    { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
    { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
  ];
  const fil = row => row.price > 5
  const expected = [
    { id: 12,  product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
    { id: 13,  product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
  ];
  const expectedRows = [
    { id: 10, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
    { id: 11,  product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
    { id: 12, selected:true, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
    { id: 13, selected: true, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
  ];
  const {rows, selectedRows: result } = selectabular.rows(fil)(initRows);
  it('expect correct filtering of rows', () => {
    expect(result).toEqual(expected);
    expect(expectedRows).toEqual(rows);
  });
});
describe('select.toggle', () => {
  const initRows = [
    { id: 10, selected: false, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
    { id: 11, selected: true, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
    { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
    { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
  ];
  const fil = row => row.id < 12
  const expected = [
    { id: 10, selected: true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
    { id: 11, selected: false, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
    { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
    { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
  ];
  const result = selectabular.toggle(fil)(initRows);
  it('expect correct filering of rows', () => {
    expect(result).toEqual(expected);
  });
});




