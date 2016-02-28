var chai = global.chai = require('chai')
var nock = global.nock = require('nock')
var expect = global.expect = chai.expect
var should = global.should = chai.should()
// var sinon = global.sinon = require('sinon')
var chaiAsPromised = require('chai-as-promised')
// var chaiProperties = require('chai-properties')

chai.use(chaiAsPromised)
// chai.use(chaiProperties);
// chai.use(sinon);
var Promise = require('es6-promise').Promise
global.Promise = Promise
