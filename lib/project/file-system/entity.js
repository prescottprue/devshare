"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(path) {
    _classCallCheck(this, Entity);

    this.path = path;
  }

  /** Get entity content and meta
  */


  _createClass(Entity, [{
    key: "get",
    value: function get() {}

    /** Add entity to file system
    */

  }, {
    key: "add",
    value: function add() {}

    /** Move entity within file system
    */

  }, {
    key: "move",
    value: function move() {}

    /** Update entity within file system
    */

  }, {
    key: "update",
    value: function update() {}

    /** Remove entity from file system
    */

  }, {
    key: "remove",
    value: function remove() {}

    /** Give entity a new name
    */

  }, {
    key: "rename",
    value: function rename() {}
  }]);

  return Entity;
}();

exports.default = Entity;
module.exports = exports['default'];