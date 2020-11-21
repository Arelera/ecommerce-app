# ecommerce-app

A PERN stack ecommerce app. [Live demo](https://wadapstore.herokuapp.com/).  
Users can create an account and login, once logged in, they can add products with images, name, description, price, stock, category and subcategory. After a product is added, they will be redirected to the product page. Products creator can edit or delete their products.

A user cannot rate and comment on their own products, and they can rate/comment on other products only once.  
Users can view products by their category/subcategory or search them by name, can view own products from the navbar menu, sort products by date and price.

Once a user clicks on a product they are taken to that products page where they can view more images and info about the product, add it to their cart, rate and comment on it. Users can edit ratings/comments or delete them.

Cart items are saved in the localstorage so the user won't lose their cart items on the same device. After a product is added to the cart, the user can view the cart by clicking on the cart icon on the navbar where they can view the total price, change item amounts or go to the checkout page.

On the checkout page users can remove the products, change products amount and checkout. _Checking out doesn't do anything other than displaying the total price and then clearing the cart_.

Products, cart, loading, ratings and user state is managed with Redux.

The PostgreSQL database is hosted on RDS and the database has 3 tables:  
Users: id, username, email, passwordHash, products, ratings, createdAt.  
Products: id, name, description, images, price, category, subcategory, creator, createdAt, stock.  
Ratings: id, creator, rating, comment, product, createdAt.

Product images are stored in Firebase storage. When a product is deleted, the images of the product get deleted with the product.

## Frontend

- ReactJS
- React router
- Redux
- Redux thunk
- Sass
- Axios

## Backend

- Express
- Pg
- Jsonwebtoken
- Bcrypt
