const { Pool } = require('pg');

const { HOST, PORT, USER, PASSWORD, NAME } = require('./config');

const client = new Pool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  port: PORT,
  database: NAME,
});

module.exports = client;
