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