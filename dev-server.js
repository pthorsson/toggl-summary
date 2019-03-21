const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const root = path.join(__dirname, 'dist');

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

const server = http.createServer((req, res) => {
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
  } else {
    const indexFile = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(indexFile);
    console.log(`[GET] (index) ${url}`);
  }
});

server.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }

  console.log(`Server running at http://localhost:${port}/`);
});
