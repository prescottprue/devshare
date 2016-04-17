'use strict';

/*!
 * Module dependencies.
 */

import * as home from '../app/controllers/home';
import config from './config';

/**
 * Expose routes
 */

module.exports = function (app) {
  app.get('/', home.index);

  /**
   * Error handling
   */

  app.use((err, req, res, next) => {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    // res.status(500).render('500', { error: err.stack });

    // 500 Response
    res.status(500).json({
      message: 'Error.',
      stack: err.stack,
      code: 500
    });
  });

  // assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).json({
      message: 'Invalid request.',
      status: 'NOT_FOUND',
      code: 404
    });
  });
};
