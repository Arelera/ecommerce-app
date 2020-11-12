const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const signupRouter = require('./routes/signup');

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/sign-up', signupRouter);

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.js'), (err) => {
    if (err) {
      res.status(500).send();
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
