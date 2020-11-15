import { Link } from 'react-router-dom';
import CardInfo from './CardInfo';
import './ProductCard.scss';

export default function ProductCard({ product }) {
  return (
    <div className="productCard">
      <Link to={`/product/${product.id}`}>
        <img src={product.images[0]} className="productImg" alt=""></img>
        <CardInfo product={product} />
      </Link>
    </div>
  );
}
