const express = require('express');

const server = express();

server.post('/pageview/visit', (req) => {
  console.log(req.body);
});

server.listen(3000, () => {
  console.log('listening 3000');
});
