import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import faker from 'faker';
import S from './ProductPage.module.scss';
import starsToDisplay from '../stars/starsToDisplay';
import Ratings from './Ratings/Ratings';
import productService from '../../services/productService';
import Loading from '../Loading';

export default function ProductPage() {
  const id = useParams().id;
  const [product, setProduct] = useState();
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productService
      .getById(id)
      .then(({ product, ratings }) => {
        setProduct(product);
        setRatings(ratings);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const productF = getFakeProducts(1)[0];
  // TODO: make the img display in to a carousel component
  return (
    <div className={S.productPage}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={S.productBox}>
            <img className={S.img} src={product.images[0][0]} />
            <div className={S.info}>
              <h2 className={S.name}>{product.name}</h2>

              <Link to="/" className={S.seller}>
                {product.username}
              </Link>
              <div className={S.ratings}>
                <p className={S.stars}>{starsToDisplay(4)}</p>
                <p>17 ratings</p>
              </div>
              <p className={S.price}>{product.price}$</p>
              <p className={S.desc}>{product.description}</p>
            </div>
          </div>
          <Ratings ratings={ratings} />
        </>
      )}
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
