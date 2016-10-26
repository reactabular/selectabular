const select = {
  all: rows => rows.map(r => ({ ...r, selected: true })),
  none: rows => rows.map(r => ({ ...r, selected: false }))
};

export default select;
