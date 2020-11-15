import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import S from './ProductPage.module.scss';
import starsToDisplay from '../stars/starsToDisplay';
import Ratings from './Ratings/Ratings';
import productService from '../../services/productService';
import Loading from '../Loading';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reducers/cartReducer';

export default function ProductPage() {
  const dispatch = useDispatch();
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
                <p>{ratings.length} ratings</p>
              </div>
              <p className={S.price}>{product.price}$</p>
              <p className={S.desc}>{product.description}</p>
              <button
                className={S.addCart}
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <Ratings ratings={ratings} setRatings={setRatings} />
        </>
      )}
    </div>
  );
}
