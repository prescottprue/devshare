# devshare

[![npm version](https://img.shields.io/npm/v/devshare.svg?style=flat-square)](https://www.npmjs.com/package/devshare)
[![npm downloads](https://img.shields.io/npm/dm/devshare.svg?style=flat-square)](https://www.npmjs.com/package/devshare)
[![build status](https://img.shields.io/travis/KyperTech/devshare/master.svg?style=flat-square)](https://travis-ci.org/KyperTech/devshare)
[![dependencies status](https://img.shields.io/david/KyperTech/devshare/master.svg?style=flat-square)](https://david-dm.org/KyperTech/devshare)
[![codeclimate](https://img.shields.io/codeclimate/github/KyperTech/devshare.svg?style=flat-square)](https://codeclimate.com/github/KyperTech/devshare)
[![coverage](https://img.shields.io/codeclimate/coverage/github/KyperTech/devshare.svg?style=flat-square)](https://codeclimate.com/github/KyperTech/devshare)
[![license](https://img.shields.io/npm/l/devshare.svg?style=flat-square)](https://github.com/KyperTech/devshare/blob/master/LICENSE)

Client library to simplify communication with the devShare service which is built on the Tessellate application building platform.

## Getting Started

devShare is universal, so it can be used client-side or server-side.

### NPM
1. Install:
    `npm install --save devshare`

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

### [API Documentation](https://github.com/KyperTech/devshare/wiki/API-Documentation)
