"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return new User(config);
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import tessellateClient from './helpers/tessellate-client'

var User = function User(config) {
  _classCallCheck(this, User);

  this.configStuff = config.stuff;
};

module.exports = exports['default'];