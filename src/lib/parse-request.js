'use strict';

// First Party Modules
const url = require('url');
const queryString = require('querystring');

// Expose our interface
let parser = module.exports = {};

parser.execute = (req) => {

  if ( !req || !req.url ) { return; }

  // Before, req.url is just a string (the actual URL that the user connected through)
  // console.log('Before', req.url);

  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  // After you parse the URL and the queryString, req.url is an object, with key/value pairs associated with each part of the URL schema.
  // Additionally, any query string parameters are now in key/value pairs on the req.url.query object.
  // console.log('After', req.url);
};
