import faker from 'faker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CategoryPage from './components/CategoryPage/CategoryPage';
import Header from './components/Header/Header';
import ProductGrid from './components/ProductGrid/ProductGrid';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Route exact path="/:category" component={CategoryPage} />
            <Route
              exact
              path="/:category/:subcategory"
              component={CategoryPage}
            />
            <ProductGrid products={getFakeProducts(8)} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const getFakeProducts = (num) => {
  const prods = [];
  while (prods.length < num) {
    prods.push({
      imgUrl: faker.image.nature(),
      price: faker.commerce.price(),
      name: faker.commerce.productDescription(),
      rating: Math.floor(Math.random() * 5 * 100) / 100,
    });
  }
  return prods;
};

export default App;
