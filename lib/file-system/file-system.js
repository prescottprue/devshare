"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  if (!fileSystem) fileSystem = new FileSystem(config);
  return fileSystem;
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import tessellateClient from './helpers/tessellate-client'

var FileSystem = function FileSystem(config) {
  _classCallCheck(this, FileSystem);

  this.configStuff = config.stuff;
};

var fileSystem = null;

module.exports = exports['default'];