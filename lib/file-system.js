'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return new FileSystem(config);
};

var _tessellateClient = require('./helpers/tessellate-client');

var _tessellateClient2 = _interopRequireDefault(_tessellateClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileSystem = function FileSystem(config) {
  _classCallCheck(this, FileSystem);

  this.configStuff = config.stuff;
};

module.exports = exports['default'];