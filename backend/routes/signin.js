const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../client');

const { JWT_SECRET } = require('../config');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await client.query(
      `
    SELECT id, username, "passwordHash" FROM users
    WHERE username = $1
    `,
      [username]
    );

    const user = response.rows[0];
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect || !user) {
      return res.status(404).send({ error: 'Invalid credentials' });
    }

    const token = await jwt.sign({ id: user.id, username }, JWT_SECRET);

    res.send({ token, id: user.id, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;
