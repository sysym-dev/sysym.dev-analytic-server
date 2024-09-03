require('dotenv/config');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { routes } = require('./src/routes');
const { default: mongoose } = require('mongoose');

const server = express();

const port = process.env.PORT || 3000;

server.set('trust proxy', true);

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('tiny'));

routes.forEach((route) => server.use(route));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  server.listen(port, () => {
    console.log(`server listening at ${port}`);
  });
}

main();
