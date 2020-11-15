import ProductCard from './ProductCard/ProductCard';
import './ProductGrid.scss';
import productService from '../../services/productService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAll,
  getByCategory,
  getBySubcategory,
} from '../../reducers/productsReducer';

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { category, subcategory } = useParams();
  const products = useSelector((store) => store.products);

  useEffect(() => {
    if (subcategory) {
      dispatch(getBySubcategory(subcategory));
    } else if (category) {
      dispatch(getByCategory(category));
    } else {
      dispatch(getAll());
    }
  }, [category, subcategory]);

  return (
    <div className="productGrid">
      {products.map((prod, i) => (
        <ProductCard className="dog" product={prod} key={i.toString()} />
      ))}
    </div>
  );
}
