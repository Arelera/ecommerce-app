import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import CategoryPage from './components/CategoryPage/CategoryPage';
import Header from './components/Header/Header';
import SigninPage from './components/SigninPage/SigninPage';
import ProductPage from './components/ProductPage/ProductPage';
import AddProduct from './components/AddProduct/AddProduct';
import Checkout from './components/Checkout/Checkout';
import { initUser } from './reducers/userReducer';
import ProductGrid from './components/ProductGrid/ProductGrid';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      dispatch(initUser(JSON.parse(userJson)));
    }
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={CategoryPage} />
        <Route exact path="/sign-in" component={SigninPage} />
        <Route exact path="/add-product" component={AddProduct} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/search" component={CategoryPage} />

        <Route exact path="/products/user/:id" component={ProductGrid} />
        <Route exact path="/products/:category" component={CategoryPage} />
        <Route
          exact
          path="/products/:category/:subcategory"
          component={CategoryPage}
        />
        <Route exact path="/product/:id" component={ProductPage} />

        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
