# devshare

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][climate-image]][climate-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

[![Gitter][gitter-image]][gitter-url]

>Client library to simplify communication with the devShare service

## Features

* File system interaction
* Projects management
* Users management
* Cloud interface

## Getting Started

devShare is universal, so it can be used client-side or server-side.

### NPM
1. Install: `npm install --save devshare`

2. Include and use `devshare`:

  #### ES6
    ```javascript
  import devshare from 'devshare'
  devshare.login(auth)
    .then(user => console.log('Successful login', user))
    .catch(error => console.error('Error logging in', error))

    ```

  #### ES5
    ```javascript
  var devshare = require('devshare')
  devshare.login(auth)
    .then(function (user) {
      console.log('Successful login', user)
    })
    .catch(function (error) {
      console.error('Error logging in', error)
    })
    ```

### Browser (CDN)
  1. Add script tag to index.html:

      ```html
      <script src="http://cdn.kyper.io/js/devshare/latest/devshare.js"></script>
      ```

  2. Start using the library:

    ```javascript
    const username = 'scott'
    const password = 'testpassword'
    // Login in order to make Authenticated requests
    Devshare.login(username, password)
      .then(user => console.log('Successful login', user))
      .catch(error => console.error('Error logging in', error))
    ```

    ```javascript
    const username = 'scott'
    // Get a specific user
    Devshare.user(username)
      .get()
      .then(user => console.log('user loaded:', user))
      .catch(error => console.error('Error getting user', error))
    ```

### [API Documentation](https://kypertech.gitbooks.io/devshare/content/)


[npm-image]: https://img.shields.io/npm/v/devshare.svg?style=flat-square
[npm-url]: https://npmjs.org/package/devshare
[npm-downloads-image]: https://img.shields.io/npm/dm/devshare.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/KyperTech/devshare/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/KyperTech/devshare
[daviddm-image]: https://img.shields.io/david/KyperTech/devshare.svg?style=flat-square
[daviddm-url]: https://david-dm.org/KyperTech/devshare
[climate-image]: https://img.shields.io/codeclimate/github/KyperTech/devshare.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/KyperTech/devshare
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/KyperTech/devshare.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/KyperTech/devshare
[license-image]: https://img.shields.io/npm/l/devshare.svg?style=flat-square
[license-url]: https://github.com/KyperTech/devshare/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/

[gitter-image]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square
[gitter-url]: https://gitter.im/KyperTech/devshare
