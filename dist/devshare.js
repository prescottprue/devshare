/*! grout.js v0.0.1 | (c) Kyper Digital Inc. */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Grout"] = factory();
	else
		root["Grout"] = factory();
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
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cloud = __webpack_require__(1);

	var _cloud2 = _interopRequireDefault(_cloud);

	var _storage = __webpack_require__(2);

	var _storage2 = _interopRequireDefault(_storage);

	var _fileSystem = __webpack_require__(3);

	var _fileSystem2 = _interopRequireDefault(_fileSystem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Devshare = function () {
	  function Devshare(config) {
	    _classCallCheck(this, Devshare);

	    // TODO: Work on this logic for auth
	    this.auth = config;
	    // TODO: fall back to cookie JWT token if no auth is provided
	  }

	  _createClass(Devshare, [{
	    key: 'storage',
	    get: function get() {
	      return (0, _storage2.default)(this.auth);
	    }
	  }, {
	    key: 'cloud',
	    get: function get() {
	      return (0, _cloud2.default)(this.auth);
	    }
	  }, {
	    key: 'fileSystem',
	    get: function get() {
	      return (0, _fileSystem2.default)(this.auth);
	    }
	  }]);

	  return Devshare;
	}();

	exports.default = Devshare;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (config) {
	  return new Cloud(config);
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import tessellateClient from './helpers/tessellate-client'

	var Cloud = function () {
	  function Cloud(config) {
	    _classCallCheck(this, Cloud);

	    this.configStuff = config.stuff;
	  }

	  _createClass(Cloud, [{
	    key: "createWorker",
	    value: function createWorker(name) {}
	  }]);

	  return Cloud;
	}();

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (config) {
	  return new Storage(config);
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import devshareClient from './helpers/tessellate-client'

	var Storage = function () {
	  function Storage(config) {
	    _classCallCheck(this, Storage);

	    this.configStuff = config.stuff;
	  }

	  _createClass(Storage, [{
	    key: "createStore",
	    value: function createStore(name) {
	      return devshareClient.createStore();
	    }
	  }, {
	    key: "store",
	    value: function store(name) {
	      return new Store();
	    }
	  }]);

	  return Storage;
	}();

	var Store = function () {
	  function Store() {
	    _classCallCheck(this, Store);
	  }

	  _createClass(Store, [{
	    key: "createItem",
	    value: function createItem(name) {}
	  }, {
	    key: "getItem",
	    value: function getItem(id) {}
	  }]);

	  return Store;
	}();

	var Item = function () {
	  function Item() {
	    _classCallCheck(this, Item);
	  }

	  _createClass(Item, [{
	    key: "get",
	    value: function get() {}
	  }, {
	    key: "update",
	    value: function update(id, object) {}
	  }, {
	    key: "delete",
	    value: function _delete() {}
	  }]);

	  return Item;
	}();

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (config) {
	  return new FileSystem(config);
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import tessellateClient from './helpers/tessellate-client'

	var FileSystem = function FileSystem(config) {
	  _classCallCheck(this, FileSystem);

	  this.configStuff = config.stuff;
	};

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;