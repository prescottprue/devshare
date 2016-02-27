'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = exports.project = undefined;

var _project2 = require('./project');

var _project3 = _interopRequireDefault(_project2);

var _user2 = require('./user');

var _user3 = _interopRequireDefault(_user2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export default class Devshare {
//   constructor (config) {
//     // TODO: Work on this logic for auth
//     this.auth = config
//     // TODO: fall back to cookie JWT token if no auth is provided
//   }
//
//   project (username, projectname) {
//     return project(username, projectname)
//   }
//
//   user (username) {
//     return new User(username)
//   }
// }

exports.default = {
  project: _project3.default,
  user: _user3.default
};
var project = exports.project = _project3.default;
var user = exports.user = _user3.default;