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

const select = {
  all: rows => rows.map(setSelectedTo(true)),
  none: rows => rows.map(setSelectedTo(false)),
  rows: filter => rows => ({
    rows: actOnMatching(setSelectedTo(true))(filter)(rows),
    selectedRows: actOnFiltered(returnRow)(filter)(rows)
  }),
  toggle: filter => rows => actOnMatching(toggleRow)(filter)(rows)
};

export default select;
