'use strict';

// 1st Party library
const http = require('http');
const fs = require('fs');
const cowsay = require('cowsay');

// Local Libraries
// requestParser will tear the URL apart and give us back an object with things like path, query params, etc.
const requestParser = require('./lib/parse-request');
// bodyParser reads in all of the post data in packets and puts the resulting JSON object (if it exists) on req.body
const bodyParser = require('./lib/parse-body');

const requestHandler = (req,res) => {

  // console.log(req.method);
  // console.log(req.headers);
  // console.log(req.url);

  requestParser.execute(req);
  console.log(req);

  if ( req.method === 'GET' && req.url.pathname === '/') {

    fs.readFile('./src/files/home.html',(err, data) => {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.statusMessage = 'OK';
      if (err) throw err;
      console.log(data.toString());
      console.log(req.url);
      let message = data.toString();
      res.write(data.toString());
      res.end();
      return;
    });

  }

  if ( req.method === 'GET'  && req.url.pathname === `/cowsay`) {

    let cowtalk = cowsay.say({text: req.url.query.text});

    fs.readFile('./src/files/cowsay.html',(err, data) => {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.statusMessage = 'OK';

      if (err) throw err;

      let arr = data.toString().split(' ');
      let indexToRender = arr.indexOf('insertHere\n');
      arr[indexToRender] = cowtalk;
      let rendered = arr.join(' ');

      res.write(rendered);

      res.end();
      return;
    });

  }

  // Here, we have a "POST" request which will always return a JSON object.  That object will either be
  // the JSON that you posted in (just spitting it back out), or an error object, formatted to look like JSON
  else if ( req.method === 'POST' ) {

    bodyParser.execute(req)
      .then( (req) => {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.write( JSON.stringify(req.body) );
        res.end();
        return;
      })
      .catch( (err) => {
        let errorObject = {error:err};
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 500;
        res.statusMessage = 'Server Error';
        res.write( JSON.stringify(errorObject) );
        res.end();
        return;
      });


  }
};

// Server callback
const app = http.createServer(requestHandler);

// Expose the start and stop methods.  index.js will call on these.
module.exports = {
  start: (port,callback) => app.listen(port,callback),
  stop: (callback) => app.close(callback),
};