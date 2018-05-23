'use strict';

let requestParser = require('../../src/lib/parse-request.js');

describe('Request Parser', () => {

  describe('execute()', () => {

    it('requires a request object', () => {
      let req = undefined;
      requestParser.execute(req);
      expect(req).toBeUndefined();
    });

    it('requires a request object with a url', () => {
      let expected = {};
      let req = {};
      requestParser.execute(req);
      expect(req).toEqual(expected);
    });

    it('given a URL, returns an object', () => {
      let expected = {};
      let req = { url: 'http://www.here.com/path/to/foo' };
      requestParser.execute(req);
      expect(typeof req.url).toBe('object');
    });

    it('given a URL with a query string, returns an object on the url', () => {
      let req = { url: 'http://www.here.com/path/to/foo?a=b&c=d&e=f' };
      requestParser.execute(req);
      expect(typeof req.url.query).toBe('object');
    });

  });

});