"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (config) {
  if (!fileSystem) fileSystem = new FileSystem(config);
  return fileSystem;
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import tessellateClient from './helpers/tessellate-client'

var FileSystem = function () {
  function FileSystem(config) {
    _classCallCheck(this, FileSystem);

    this.configStuff = config.stuff;
  }

  _createClass(FileSystem, [{
    key: "entity",
    value: function entity(path) {
      return new Entity();
    }
  }]);

  return FileSystem;
}();

var fileSystem = null;

module.exports = exports['default'];