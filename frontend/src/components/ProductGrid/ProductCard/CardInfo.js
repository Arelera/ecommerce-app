import starsToDisplay from '../../stars/starsToDisplay';
import './CardInfo.scss';

export default function CardInfo({ product }) {
  return (
    <div className="cardInfo">
      <p className="price">
        <span>$</span>
        {product.price}
      </p>
      <h3>{product.name}</h3>
      <div>
        {starsToDisplay(product.rating)} {product.rating}
      </div>
    </div>
  );
}
