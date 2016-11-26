const actOnFiltered = actionFn => filter => rows => rows.filter(filter).map(actionFn);

const applyWhenPredicate = actionFn => predicate => row => (predicate(row) ? actionFn(row) : row);

const actOnMatching = actionFn => filter => rows => rows.map(applyWhenPredicate(actionFn)(filter));

const returnRow = row => row;
const setAttrTo = attr => val => row => ({ ...row, [attr]: val });
const setSelectedTo = setAttrTo('selected');
const toggleRow = (row) => {
  const s = row.selected || false;
  return { ...row, selected: !s };
};

export { default as byArrowKeys } from './by-arrow-keys';
export const all = rows => rows.map(setSelectedTo(true));
export const none = rows => rows.map(setSelectedTo(false));
export const rows = filter => rows => ({
  rows: actOnMatching(setSelectedTo(true))(filter)(rows),
  selectedRows: actOnFiltered(returnRow)(filter)(rows)
});
export const toggle = filter => rows => actOnMatching(toggleRow)(filter)(rows);
