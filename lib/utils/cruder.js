'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkResponseError = function checkResponseError(body) {
  if (body.code >= 400) {
    var message = body.message;
    var status = body.status;

    return Promise.reject({ message: message, status: status });
  }
};

exports.default = function (url, types) {
  var methods = {
    get: function get() {
      return (0, _isomorphicFetch2.default)(url).then(function (response) {
        return response.json();
      }).then(function (body) {
        checkResponseError(body);
        return body;
      });
    },
    remove: function remove() {
      return (0, _isomorphicFetch2.default)(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (body) {
        checkResponseError(body);
        return body;
      });
    },
    update: function update(object) {
      return (0, _isomorphicFetch2.default)(url, {
        method: 'patch',
        body: object
      }).then(function (response) {
        return response.json();
      }).then(function (body) {
        checkResponseError(body);
        return body;
      });
    },
    create: function create(object) {
      return (0, _isomorphicFetch2.default)(url, {
        method: 'post',
        body: JSON.stringify(object)
      }).then(function (response) {
        return response.json();
      }).then(function (body) {
        checkResponseError(body);
        return body;
      });
    }
  };
  return types.reduce(function (returnedMethods, type) {
    var method = {};
    method[type] = methods[type];
    return Object.assign({}, returnedMethods, method);
  }, {});
};

module.exports = exports['default'];