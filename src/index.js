const select = {
  all: function(rows){
    return rows.map(r => ({...r, selected:true}) )
  },
  none: function(rows){
    return rows.map(r => ({...r, selected:false}) )
  }
};

export default select;
