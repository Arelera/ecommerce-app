import CardInfo from './CardInfo';
import './ProductCard.scss';

export default function ProductCard({ product }) {
  return (
    <div className="productCard">
      <a href="/">
        <img src={product.imgUrl} className="productImg"></img>
        <CardInfo product={product} />
      </a>
    </div>
  );
}
