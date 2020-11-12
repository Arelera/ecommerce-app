import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import faker from 'faker';

import CategoryPage from './components/CategoryPage/CategoryPage';
import Header from './components/Header/Header';
import SubMenu from './components/Header/SubMenu';
import ProductGrid from './components/ProductGrid/ProductGrid';
import SigninPage from './components/SigninPage/SigninPage';
import ProductPage from './components/ProductPage/ProductPage';
import AddProduct from './components/AddProduct/AddProduct';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <SubMenu />
            <ProductGrid products={getFakeProducts(10)} />
          </Route>

          <Route exact path="/sign-in" component={SigninPage} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route exact path="/product/:id" component={ProductPage} />

          <Route exact path="/:category" component={CategoryPage} />
          <Route
            exact
            path="/:category/:subcategory"
            component={CategoryPage}
          />
        </Switch>
      </div>
    </Router>
  );
}

const getFakeProducts = (num) => {
  const prods = [];
  while (prods.length < num) {
    prods.push({
      id: Math.round(Math.random() * 10000),
      imgUrl: faker.image.nature(),
      price: faker.commerce.price(),
      name: faker.commerce.productDescription(),
      rating: Math.floor(Math.random() * 5 * 100) / 100,
    });
  }
  return prods;
};

export default App;
