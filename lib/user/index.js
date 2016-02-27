'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _cruder = require('../utils/cruder');

var _cruder2 = _interopRequireDefault(_cruder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (username) {
  var url = _config2.default.root + '/users/' + username;

  var methods = {
    createProject: function createProject(projectname) {
      return (0, _cruder2.default)(url + '/projects', ['create']).create({ name: projectname });
    }
  };

  return Object.assign({}, (0, _cruder2.default)(url, ['get', 'update']), methods);
};

module.exports = exports['default'];