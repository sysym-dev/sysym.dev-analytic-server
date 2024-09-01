require('dotenv/config');

const express = require('express');
const cors = require('cors');
const { routes } = require('./src/routes');

const server = express();

const port = process.env.PORT || 3000;

server.use(cors());

routes.forEach((route) => server.use(route));

server.listen(port, () => {
  console.log(`server listening at ${port}`);
});
