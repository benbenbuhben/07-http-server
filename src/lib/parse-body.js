'use strict';

// Expose our interface
const bodyParser = module.exports = {};

bodyParser.execute = (req) => {

  // Because we will be receiving an unknown number of packets/buffers over an unknown period of time,
  // this is going to be an asynchronous action.  So, we will be returning back a "Promise"
  // What's important here is that whatever ends up being "resolved" is the parameter to the "then()" in the
  // calling block, and similarly, whatever is "rejected" ends up in the "catch()" block.
  return new Promise((resolve, reject) => {
    let text = '';

    // This event will fire for each packet of data.  You can assume that it's always going to be
    // incomplete, so we just build up the "text" string each time this event fires.
    req.on('data', (buffer) => {
      text = text + buffer.toString();
    });

    // When the last packet of information comes in (the last buffer), the "end" event fires, giving us the
    // opportunity to turn "text" into a JSON object.  If that works, we resolve with that object stuck onto req.body
    // If not, we reject with an error message.
    req.on('end', () => {
      try {
        req.body = JSON.parse(text);
        resolve(req);
      }
      catch (err) {
        reject(err);
      }

    });

  });
};
