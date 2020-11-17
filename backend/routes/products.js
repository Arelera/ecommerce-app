const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { JWT_SECRET } = require('../config');

router.get('/', async (req, res) => {
  try {
    const response = await client.query(
      `
      SELECT p.id, name, description, images, price, category, subcategory, avg(rating) rating FROM products p
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
      SELECT p.id, name, description, images, price, category, subcategory, avg(rating) rating FROM products p
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
      SELECT p.id, name, description, images, price, category, subcategory, avg(rating) rating FROM products p
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
      SELECT p.id, name, description, images, price, category, subcategory, avg(rating) rating FROM products p
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

// adding a product
router.post('/', async (req, res) => {
  const {
    name,
    description,
    images,
    price,
    creator,
    category,
    subcategory,
  } = req.body;

  try {
    const response = await client.query(
      `      
      INSERT INTO products (creator ,name, description, images, price, category, subcategory)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
      `,
      [creator, name, description, images, price, category, subcategory]
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

    res.send({ id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// rating a product
router.post('/:id', async (req, res) => {
  const id = req.params.id;
  const { rating, comment, user } = req.body;

  try {
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

    res.send({
      id,
      user,
      rating,
      comment,
      createdAt: response.rows[0].createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send();
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

module.exports = router;
