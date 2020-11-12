import { Link, useParams } from 'react-router-dom';
import S from './ProductPage.module.scss';
import faker from 'faker';
import starsToDisplay from '../stars/starsToDisplay';
import Ratings from './Ratings/Ratings';

export default function ProductPage() {
  const id = useParams().id;
  // fetch product, owner and it's ratings by id
  // with some sql joins all at once

  const product = getFakeProducts(1)[0];
  // TODO: make the img display in to a carousel component
  return (
    <div className={S.productPage}>
      <div className={S.productBox}>
        <img className={S.img} src={product.imgUrl} />
        <div className={S.info}>
          <h2 className={S.name}>{product.name}</h2>

          <Link to="/" className={S.seller}>
            Some seller person
          </Link>
          <div className={S.ratings}>
            <p className={S.stars}>{starsToDisplay(4)}</p>
            <p>17 ratings</p>
          </div>
          <p className={S.price}>{product.price}$</p>
          <p className={S.desc}>{product.description}</p>
        </div>
      </div>
      <Ratings product={product} />
    </div>
  );
}

const getFakeProducts = (num) => {
  const prods = [];
  while (prods.length < num) {
    prods.push({
      id: Math.round(Math.random() * 10000),
      imgUrl: faker.image.nature(),
      price: faker.commerce.price(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      rating: Math.floor(Math.random() * 5 * 100) / 100,
    });
  }
  return prods;
};
