'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloud = require('./cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _fileSystem = require('./file-system');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetcher = function fetcher(state) {
  return {
    get: function get() {
      return new Promise(function (resolve, reject) {
        (0, _isomorphicFetch2.default)('http://tessellate.elasticbeanstalk.com/users/' + state.username + '/projects/' + state.projectname).then(function (response) {
          if (response.status >= 400) {
            var _response$body$json = response.body.json();

            var message = _response$body$json.message;
            var status = _response$body$json.status;

            return reject({ message: message, status: status });
          }
          return response.json();
        }).then(function (body) {
          resolve(body);
        });
      });
    }
  };
};

var project = function project(username, projectname) {
  var state = {
    username: username,
    projectname: projectname,
    endpoint: _config2.default.root + '/username/projectname'
  };

  return Object.assign({}, fetcher(state));

  // Promise that return the fetch of content and meta data

  remove: (function () {
    // Promise that returns successful removal event
  });

  rename: (function (name) {
    // Promise that returns successful rename event

  });

  storage: (function () {
    return storage(state.auth);
  });

  cloud: (function () {
    return cloud(state.auth);
  });

  fileSystem: (function () {
    return fileSystem(state.auth);
  });
};

exports.default = project;
module.exports = exports['default'];