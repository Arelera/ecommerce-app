const router = require('express').Router();
const client = require('../client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET } = require('../config');

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const response = await client.query(
      `
      INSERT INTO users (username, email, "passwordHash")
      VALUES ($1, $2, $3)
      RETURNING id, username
      `,
      [username, email, passwordHash]
    );
    const token = await jwt.sign(response.rows[0], JWT_SECRET);

    console.log('Returned user: ', response.rows[0]);
    res.send({ ...response.rows[0], token });
  } catch (error) {
    console.log('ERROR: ', error);
    res.status(400).send({ error });
  }
});

module.exports = router;
