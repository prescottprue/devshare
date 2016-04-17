'use strict';

/**
 * Module dependencies.
 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import config from './config';

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function(app, passport) {

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride(req => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  app.use(cors());

  app.use((err, req, res, next) => {
    console.error('Error:');
    console.error(err.stack);
    console.error(err.toString());
  });

};
