'use strict';

const superagent = require('superagent');
const app = require('../src/app.js');

describe('Simple Web Server', () => {

  beforeAll( () => {
    app.start(3000);
  });

  afterAll( () => {
    app.stop();
  });

  it('handles a get request', () => {

    return superagent.get('http://localhost:3000/foo/bar/baz')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('h1'));
      })
      .catch(console.err);

  });

  it('handles a get request with a query string', () => {

    return superagent.get('http://localhost:3000?you=here')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('here'));
      })
      .catch(console.err);

  });

  it('handles a good post request', () => {
    let obj = {name:"Fred"};
    let expected = JSON.stringify(obj);
    return superagent.post('http://localhost:3000')
      .send(obj)
      .then(response => {
        expect(response.text).toEqual(expected);
      })
      .catch(console.err);
  });

});