const { WebSocketServer } = require('ws');
const { createServer } = require('http');
const { writeFileSync } = require('fs');
const IPv4 = require('any-ipv4');
const coincident = require('coincident/server');
const staticHandler = require('static-handler');

const PORT = process.env.PORT || 8080;
const ADDR = `${IPv4}:${PORT}`;

// allow the index to read the address to use as WebSocket
writeFileSync('ws.txt', `ws://${ADDR}/`);

coincident(
  new WebSocketServer({
    server: createServer(staticHandler(__dirname, {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'same-origin'
    }))
    .listen(PORT, () => console.log(`http://${ADDR}/`))
  }),
  {
    require,
    johnny: new Promise(resolve => {
      // there is one board to bootstrap per server session
      // but the truth is this could be done in the worker too
      // however the ready callback wasn't firing at all so ...
      const five = require('johnny-five');
      const { RaspiIO } = require('raspi-io');
      const board = new five.Board({io: new RaspiIO});
      board.on('ready', () => {
        resolve({board, five});
      });
    })
  }
);
