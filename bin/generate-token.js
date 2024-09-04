require('dotenv/config');

const { connect } = require('../src/cores/db');
const { createToken } = require('../src/features/token/token.service');

async function generateToken() {
  await connect();

  console.log(await createToken());

  process.exit(0);
}

generateToken();
