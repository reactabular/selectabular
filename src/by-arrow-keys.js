import React from 'react';
import Select from './components/select';

const byArrowKeys = props => children => React.createElement(Select, props, children);

export default byArrowKeys;
