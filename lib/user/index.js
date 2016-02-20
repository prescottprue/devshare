"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import tessellateClient from './helpers/tessellate-client'

var User = function () {
  function User(config) {
    _classCallCheck(this, User);

    this.configStuff = config.stuff;
  }

  _createClass(User, [{
    key: "get",
    value: function get() {}
  }, {
    key: "projects",
    get: function get() {}
  }]);

  return User;
}();

exports.default = User;
module.exports = exports['default'];