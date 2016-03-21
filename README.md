# devshare

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][climate-image]][climate-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

Client library to simplify communication with the devShare service which is built on the Tessellate application building platform.

## Getting Started

devShare is universal, so it can be used client-side or server-side.

### NPM
1. Install: `npm install --save devshare`

2. Include and use `devshare`:

    ```javascript
  import { createClient } from 'devshare';
  let devshare = createClient(auth);
    ```

### CDN
  1. Add script tag to index.html:

      ```html
      <script src="http://cdn.kyper.io/js/devshare/latest/devshare.js"></script>
      ```

  2. Create the client:

    ```javascript
    var devshare = Devshare.createClient(auth);
    ```

## Documentation

### [API Documentation](https://kypertech.github.com/devshare)


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
