"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  // Logic for auth

  return {
    storage: storage(auth),
    cloud: cloud(auth),
    fileSystem: fileSystem(auth)
  };
};

module.exports = exports['default'];