const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { JWT_SECRET } = require('../config');

router.get('/', async (req, res) => {
  try {
    const response = await client.query(
      `
      SELECT p.id, name, description, images, price, category, subcategory, p."createdAt", avg(rating) rating FROM products p
      LEFT JOIN ratings r ON p.id = r.product
      GROUP BY p.id 
      `
    );
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await client.query(
      `
      SELECT p.id, name, description, images, price, category, subcategory, p."createdAt", avg(rating) rating FROM products p
      LEFT JOIN ratings r ON p.id = r.product
      WHERE name ILIKE ('%' || $1 || '%')
      GROUP BY p.id
      `,
      [query]
    );
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.get('/cat/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const response = await client.query(
      `
      SELECT p.id, name, description, images, price, category, subcategory, p."createdAt", avg(rating) rating FROM products p
      LEFT JOIN ratings r ON p.id = r.product
      WHERE p.category = $1
      GROUP BY p.id 
      `,
      [category]
    );
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.get('/subcat/:category/:subcategory/', async (req, res) => {
  try {
    const { category, subcategory } = req.params;
    const response = await client.query(
      `
      SELECT p.id, name, description, images, price, category, subcategory, p."createdAt", avg(rating) rating FROM products p
      LEFT JOIN ratings r ON p.id = r.product
      WHERE p.category = $1 AND p.subcategory = $2
      GROUP BY p.id 
      `,
      [category, subcategory]
    );
    console.log(response.rows);
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// get product by id, for the product page
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await client.query(
      `
      SELECT p.id, name, description, images, price, category, creator, p."createdAt", subcategory, stock, username 
      FROM products p
      JOIN users u ON p.creator = u.id
      WHERE p.id = $1
      `,
      [id]
    );
    // get ratings by products id
    const ratings = await client.query(
      `
      SELECT r.id, rating, comment, product, creator, r."createdAt", username
      FROM ratings r
      JOIN users u ON r.creator = u.id
      WHERE product = $1      
      `,
      [id]
    );

    if (!response.rows[0].id) {
      return res.status(404).send();
    }

    res.send({ product: response.rows[0], ratings: ratings.rows });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const creator = req.params.id;
    console.log('GETBYUSER', creator);
    const response = await client.query(
      `
      SELECT p.id, name, description, images, price, category, subcategory, p."createdAt", avg(rating) rating FROM products p
      LEFT JOIN ratings r ON p.id = r.product
      WHERE p.creator = $1
      GROUP BY p.id
      `,
      [creator]
    );
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// adding a product
router.post('/', async (req, res) => {
  const {
    name,
    description,
    images,
    price,
    stock,
    creator,
    category,
    subcategory,
  } = req.body;

  try {
    const response = await client.query(
      `      
      INSERT INTO products (creator ,name, description, images, price, category, subcategory, stock)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
      `,
      [creator, name, description, images, price, category, subcategory, stock]
    );

    // add the product into that users list of products
    const id = response.rows[0].id;
    await client.query(
      `
    UPDATE users
    SET products = array_append(products, $1)
    WHERE id = $2
    `,
      [id, creator]
    );

    res.status(201).send({ id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;

    // this throws an error if token is not verified
    jwt.verify(token, JWT_SECRET);

    const id = req.params.id;
    const response = await client.query(
      `
      DELETE FROM products
      WHERE id = $1
      `,
      [id]
    );
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET);
    const id = req.params.id;
    const { name, description, price, stock } = req.body;
    const response = await client.query(
      `
      UPDATE products
      SET name = $1,
          description = $2,
          price = $3,
          stock = $4
      WHERE id = $5
      RETURNING id, name, description, price, stock 
      `,
      [name, description, price, stock, id]
    );

    res.send(response.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// ratings
// rating a product
router.post('/:id', async (req, res) => {
  const id = req.params.id; // product id
  const { rating, comment, user } = req.body;

  try {
    // check if user rated that product before
    const rated = await client.query(
      `
      SELECT * FROM ratings
      WHERE creator = $1 AND product = $2
      `,
      [user, id]
    );
    // if a row comes back, it means the user rated that product before
    if (rated.rows[0]?.id) {
      return res.status(400).send();
    }

    const response = await client.query(
      `
      INSERT INTO ratings (creator, rating, comment, product)
      VALUES ($1, $2, $3, $4)
      RETURNING id, creator, rating, comment, product, "createdAt"
      `,
      [user, rating, comment, id]
    );
    // add into users ratings
    await client.query(
      `
      UPDATE users
      SET ratings = array_append(ratings, $1)
      WHERE id = $2
      `,
      [response.rows[0].id, user]
    );

    res.status(201).send({
      id,
      creator: user,
      rating: response.rows[0].rating,
      comment,
      createdAt: response.rows[0].createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.delete('/ratings/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET);

    const id = req.params.id;
    await client.query(
      `
      DELETE FROM ratings
      WHERE id = $1
      `,
      [id]
    );
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.put('/ratings/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const verifiedUser = jwt.verify(token, JWT_SECRET);

    const id = req.params.id; // ratings id
    const { rating, comment } = req.body;
    console.log('RATING: ', rating);
    console.log('COMT: ', comment);
    const response = await client.query(
      `
      UPDATE ratings
      SET rating = $1,
          comment = $2
      WHERE product = $3 AND creator = $4
      RETURNING id, creator, rating, comment, product, "createdAt"
      `,
      [rating, comment, id, verifiedUser.id]
    );
    res.send(response.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;
