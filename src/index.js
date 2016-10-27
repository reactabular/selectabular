const removeAttr = attr => (obj) => {
  // eslint-disable-next-line
  delete obj[attr];
  return obj;
};
const rmSelectedAttr = removeAttr('selected');

const actOnFiltered = actionFn => filter => rows => rows.filter(filter).map(actionFn);

const returnRow = row => row;
const toggleRow = (row) => {
  const s = row.selected || false;
  return { ...row, selected: !s };
};

const select = {
  all: rows => rows.map(r => ({ ...r, selected: true })),
  none: rows => rows.map(r => ({ ...r, selected: false })),
  nonefree: rows => rows.map(rmSelectedAttr),
  rows: filter => rows => ({
    rows,
    selectedRows: actOnFiltered(returnRow)(filter)(rows)
  }),
  toggle: filter => rows => actOnFiltered(toggleRow)(filter)(rows)
};

export default select;
