'use strict';

const http = require('node:http');
const fs = require('node:fs');

require('./schema.js').load('./schema/');
const api = require('./api.js').load('./api/');

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

http
  .createServer(async (req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;
    const [first, second] = url.substring(1).split('/');
    if (first === 'api') {
      const method = api.get(second);
      const args = await receiveArgs(req);
      try {
        const result = await method(...args);
        if (!result) {
          httpError(res, 500, 'Server error');
          return;
        }
        res.end(JSON.stringify(result));
      } catch (err) {
        console.dir({ err });
        httpError(res, 500, 'Server error');
      }
    } else {
      const path = `./static/${first}`;
      try {
        const data = await fs.promises.readFile(path);
        res.end(data);
      } catch {
        httpError(res, 404, 'File is not found');
      }
    }
  })
  .listen(8000);
