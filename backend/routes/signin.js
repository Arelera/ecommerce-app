const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pg = require('pg');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const response = await pg.query(
    `
    SELECT username, "passwordHash" FROM users
    WHERE username === $1
    `,
    [username]
  );

  const user = response.rows[0];
  const passwordCorrect = await bcrypt.compare(password, passwordHash);

  if (!passwordCorrect || !user) {
    return res.status(404).send({ error: 'Invalid credentials' });
  }
  // this is not done yet
});
