"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (config) {
  if (!storage) storage = new Storage(config);
  return storage;
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

var storage = null;

module.exports = exports['default'];