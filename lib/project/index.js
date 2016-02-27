'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _cruder = require('../utils/cruder');

var _cruder2 = _interopRequireDefault(_cruder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (username, projectname) {
  var url = _config2.default.root + '/users/' + username + '/projects/' + projectname;

  var methods = {
    rename: function rename(newProjectname) {
      return (0, _cruder2.default)(url, ['update']).update({ name: newProjectname });
    }
  };

  return Object.assign({}, (0, _cruder2.default)(url, ['get', 'remove']), methods);
};

module.exports = exports['default'];