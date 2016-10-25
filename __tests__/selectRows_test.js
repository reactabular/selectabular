/* eslint-disable */
//import selectabular from '../dist/selectabular';
import selectabular from '../src/index';

const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = {
  flavor: 'grapefruit',
  ounces: 12,
};
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

/*
const myrows = [
  { id: 10, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },
  { id: 11, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },
  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },
  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }
];

describe('select.selectRow', function () {
  it('returns matching row by Id', function () {
    const myId = 12;
    const expecSel = [
      { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 }
    ];
    const result = selectRow({ rows: myrows, selectedRowId: myId });
    expect(result.selectedRows).to.deep.eq(expecSel);
  });
  it('returns nothing when not matching', function () {
    const myId = 1992;
    const expecSel = [];
    const result = selectRow({ rows: myrows, selectedRowId: myId });
    expect(result.selectedRows).to.deep.eq(expecSel);
  });
});
*/
