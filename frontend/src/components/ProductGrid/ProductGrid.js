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
} from '../../reducers/productsReducer';

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { category, subcategory } = useParams();
  const query = new URLSearchParams(useLocation().search).get('query');
  const products = useSelector((store) => store.products);

  useEffect(() => {
    if (subcategory) {
      dispatch(getBySubcategory(subcategory));
    } else if (category) {
      dispatch(getByCategory(category));
    } else if (query) {
      dispatch(getByQuery(query));
    } else {
      dispatch(getAll());
    }
  }, [category, subcategory, query]);

  return (
    <div className="productGrid">
      {products.map((prod, i) => (
        <ProductCard className="dog" product={prod} key={i.toString()} />
      ))}
    </div>
  );
}
