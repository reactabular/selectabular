(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["selectabular"] = factory();
	else
		root["selectabular"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var removeAttr = function removeAttr(attr) {
	  return function (obj) {
	    // eslint-disable-next-line
	    delete obj[attr];
	    return obj;
	  };
	};
	var rmSelectedAttr = removeAttr('selected');

	var actOnFiltered = function actOnFiltered(actionFn) {
	  return function (filter) {
	    return function (rows) {
	      return rows.filter(filter).map(actionFn);
	    };
	  };
	};

	var returnRow = function returnRow(row) {
	  return row;
	};
	var toggleRow = function toggleRow(row) {
	  var s = row.selected || false;
	  return _extends({}, row, { selected: !s });
	};

	var select = {
	  all: function all(rows) {
	    return rows.map(function (r) {
	      return _extends({}, r, { selected: true });
	    });
	  },
	  none: function none(rows) {
	    return rows.map(function (r) {
	      return _extends({}, r, { selected: false });
	    });
	  },
	  nonefree: function nonefree(rows) {
	    return rows.map(rmSelectedAttr);
	  },
	  rows: function rows(filter) {
	    return function (rows) {
	      return {
	        rows: rows,
	        selectedRows: actOnFiltered(returnRow)(filter)(rows)
	      };
	    };
	  },
	  toggle: function toggle(filter) {
	    return function (rows) {
	      return actOnFiltered(toggleRow)(filter)(rows);
	    };
	  }
	};

	exports.default = select;

/***/ }
/******/ ])
});
;