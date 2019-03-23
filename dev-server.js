const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(requestHandler);
const io = require('socket.io')(server);

const port = 9001;
const root = path.join(__dirname, 'dist');

// Accepted file types
const fileTypes = {
  js: 'application/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8',
  html: 'text/html; charset=utf-8',
  ico: 'image/x-icon',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml; charset=utf-8',
  gif: 'image/gif',
  map: 'application/json',
  json: 'application/json',
};

/**
 * Inline script to be injected into index.html file.
 */
const inlineScript = () =>
`  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
  <script>
    (function(_io) {
      var socket = _io.connect('http://localhost:${port}');
      socket.on('reload', function() {
        location.reload();
      });
    })(io);
  </script>`;

/**
 * Debounce functions for the file change watcher
 * @param {*} fn 
 * @param {*} delay 
 */
const debounce = (fn, delay) => {
  let timer = 0;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), delay);
  };
};

/**
 * Watch handler - Will emit to all sockets on file change
 */
const watchHandler = debounce(() => {
  io.sockets.emit('reload');
}, 200);

// Watches the dist dir for file changes
fs.watch('./dist', (eventType, filename) => watchHandler());

/**
 * Request handler for the web server.
 * @param {*} req 
 * @param {*} res 
 */
function requestHandler(req, res) {
  const url = req.url.split('?')[0];
  const fileType = url.match(new RegExp(`\.(${Object.keys(fileTypes).join('|')})$`));

  if (fileType) {
    fs.readFile(path.join(root, url), (err, data) => {
      if (err) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end('File not found');
        console.log(`[GET] (not found) ${url}`);
      } else {
        res.writeHead(200, { 'Content-Type': fileTypes[fileType[1]] });
        res.end(data);
        console.log(`[GET] (file) ${url}`);
      }
    });

    return;
  }

  let indexFile = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  indexFile = indexFile.replace('</body>', `${inlineScript()}\n</body>`);

  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(indexFile);
  console.log(`[GET] (index) ${url}`);
};

// Start web server.
server.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }

  console.log(`Server running at http://localhost:${port}/`);
});
