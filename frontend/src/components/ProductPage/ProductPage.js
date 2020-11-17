import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import S from './ProductPage.module.scss';
import starsToDisplay from '../stars/starsToDisplay';
import Ratings from './Ratings/Ratings';
import productService from '../../services/productService';
import Loading from '../Loading';
import { addToCart } from '../../reducers/cartReducer';
import useComponentVisible from '../../hooks/useComponentVisible';
import Modal from '../Modal/Modal';
import { deleteOne } from '../../reducers/productsReducer';

export default function ProductPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams().id;

  const user = useSelector((store) => store.user);
  const myProduct = user?.products.includes(id);

  const [product, setProduct] = useState();
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [modalRef, isModal, setIsModal] = useComponentVisible();

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

  const handleDelete = () => {
    console.log('wadap');
    history.push('/');
    dispatch(deleteOne(id));
  };

  return (
    <div className={S.productPage}>
      {isModal && (
        <Modal
          modalRef={modalRef}
          message="Are you sure you want to delete this product?"
          setClose={() => setIsModal(false)}
          onClick={handleDelete}
        />
      )}
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
              {myProduct && (
                <button className={S.delBtn} onClick={() => setIsModal(true)}>
                  Delete product
                </button>
              )}
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
