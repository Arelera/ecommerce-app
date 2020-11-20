import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CardInfo from './CardInfo';
import './ProductCard.scss';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="productCard">
      <Link
        onClick={() => dispatch({ type: 'START_LOADING' })}
        to={`/product/${product.id}`}
      >
        <img
          src={product.images[0]}
          className="productImg"
          alt=""
          loading="lazy"
        ></img>
        <CardInfo product={product} />
      </Link>
    </div>
  );
}
