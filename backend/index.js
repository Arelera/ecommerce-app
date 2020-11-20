const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const productsRouter = require('./routes/products');

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/sign-up', signupRouter);
app.use('/api/sign-in', signinRouter);
app.use('/api/products', productsRouter);

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
