# devshare

[![npm version](https://img.shields.io/npm/v/devshare.svg?style=flat-square)](https://www.npmjs.com/package/devshare)
[![npm downloads](https://img.shields.io/npm/dm/devshare.svg?style=flat-square)](https://www.npmjs.com/package/devshare)
[![build status](https://img.shields.io/travis/KyperTech/devshare/master.svg?style=flat-square)](https://travis-ci.org/KyperTech/devshare)
[![dependencies status](https://img.shields.io/david/KyperTech/devshare/master.svg?style=flat-square)](https://david-dm.org/KyperTech/devshare)
[![codeclimate](https://img.shields.io/codeclimate/github/KyperTech/devshare.svg?style=flat-square)](https://codeclimate.com/github/KyperTech/devshare)
[![coverage](https://img.shields.io/codeclimate/coverage/github/KyperTech/devshare.svg?style=flat-square)](https://codeclimate.com/github/KyperTech/devshare)
[![license](https://img.shields.io/npm/l/devshare.svg?style=flat-square)](https://github.com/KyperTech/devshare/blob/master/LICENSE)

Client library to simplify communication with the Devshare service which is built on the Tessellate application building platform.

## Getting Started

Devshare is isomorphic, so it can be used within a front-end or on a server. Below are options for setups:

### NodeJS
1. Install:
    `npm install --save devshare`

2. Include and use `devshare`:

    ```javascript
    var Devshare = require('devshare');
  var devshare = new Devshare();
    ```

### ES6
1. Install:
    `npm install --save devshare`

2. Include and use `devshare`:

    ```javascript
  import Devshare from 'devshare';
  let devshare = new Devshare();
    ```

### Browser
  1. Include the Devshare library using one of the following:
    #### CDN
    Add script tag to index.html:

      ```html
      <script src="http://cdn.kyper.io/js/devshare/latest/devshare.js"></script>
      ```

    #### Bower
    Run `bower install --save devshare`
    Then include the following in your index.html:
    ```html
    <script src="./bower_components/devshare/dist/devshare.js"></script>
    ```
  2. Begin using devshare:

    ```javascript
    var devshare = new Devshare();
    if(devshare.isLoggedIn){
      console.log('The currently logged in user is', devshare.currentUser);
    } else {
      console.warn('Not logged into devshare');
    }
    ```

## Documentation

### [API Documentation](https://github.com/KyperTech/devshare/wiki/API-Documentation)
