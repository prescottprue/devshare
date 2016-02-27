'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.update = exports.remove = exports.get = undefined;

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

var get = exports.get = function get(url) {
  return function (_) {
    return (0, _isomorphicFetch2.default)(url).then(function (response) {
      return response.json();
    }).then(function (body) {
      checkResponseError(body);
      return body;
    });
  };
};

var remove = exports.remove = function remove(url) {
  return function (_) {
    return (0, _isomorphicFetch2.default)(url, {
      method: 'delete'
    }).then(function (response) {
      return response.json();
    }).then(function (body) {
      checkResponseError(body);
      return body;
    });
  };
};

var update = exports.update = function update(url) {
  return function (object) {
    return (0, _isomorphicFetch2.default)(url, {
      method: 'patch',
      body: object
    }).then(function (response) {
      return response.json();
    }).then(function (body) {
      checkResponseError(body);
      return body;
    });
  };
};

var create = exports.create = function create(url) {
  return function (object) {
    return (0, _isomorphicFetch2.default)(url, {
      method: 'post',
      body: JSON.stringify(object)
    }).then(function (response) {
      return response.json();
    }).then(function (body) {
      checkResponseError(body);
      return body;
    });
  };
};

exports.default = function (url, types) {
  var methods = {
    get: get,
    remove: remove,
    update: update,
    create: create
  };

  return types.reduce(function (returnedMethods, type) {
    var method = {};
    method[type] = methods[type].call(undefined, url);
    return Object.assign({}, returnedMethods, method);
  }, {});
};