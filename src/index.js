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

const selectAll = rows => rows.map(setSelectedTo(true));
const selectNone = rows => rows.map(setSelectedTo(false));
const selectRows = filter => rows => ({
  rows: actOnMatching(setSelectedTo(true))(filter)(rows),
  selectedRows: actOnFiltered(returnRow)(filter)(rows)
});
const selectToggle = filter => rows => actOnMatching(toggleRow)(filter)(rows);

export { default as byArrowKeys } from './by-arrow-keys';
export {
  selectAll as all,
  selectNone as none,
  selectRows as rows,
  selectToggle as toggle
};
