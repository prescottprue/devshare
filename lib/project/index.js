'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cloud = require('./cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _fileSystem = require('./file-system');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Project = function () {
  function Project(username, projectname, config) {
    _classCallCheck(this, Project);
  }

  _createClass(Project, [{
    key: 'get',
    value: function get() {
      // Promise that return the fetch of content and meta data
    }
  }, {
    key: 'remove',
    value: function remove() {
      // Promise that returns successful removal event
    }
  }, {
    key: 'rename',
    value: function rename(name) {
      // Promise that returns successful rename event

    }
  }, {
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

  return Project;
}();

exports.default = Project;
module.exports = exports['default'];