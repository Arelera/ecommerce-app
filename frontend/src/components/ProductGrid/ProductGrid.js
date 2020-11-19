import ProductCard from './ProductCard/ProductCard';
import './ProductGrid.scss';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAll,
  getByCategory,
  getByQuery,
  getBySubcategory,
  getByUser,
} from '../../reducers/productsReducer';
import Loader from '../Loader/Loader';

export default function ProductGrid() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { category, subcategory, id } = useParams();

  const query = new URLSearchParams(location.search).get('query');
  const loading = useSelector((store) => store.loading);
  const products = useSelector((store) =>
    store.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );

  useEffect(() => {
    dispatch({ type: 'START_LOADING' });
    if (subcategory) {
      dispatch(getBySubcategory(category, subcategory));
    } else if (category) {
      dispatch(getByCategory(category));
    } else if (query) {
      dispatch(getByQuery(query));
    } else if (location.pathname.split('/')[2] === 'user') {
      dispatch(getByUser(id));
    } else {
      dispatch(getAll());
    }
  }, [category, subcategory, query, dispatch, id, location.pathname]);

  return (
    <div className="productGrid">
      {loading ? (
        <Loader />
      ) : (
        products.map((prod, i) => (
          <ProductCard className="dog" product={prod} key={i.toString()} />
        ))
      )}
    </div>
  );
}
