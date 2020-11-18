import S from './ProductPage.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import Ratings from './Ratings/Ratings';
import Loading from '../Loading';
import Modal from '../Modal/Modal';
import productService from '../../services/productService';
import useComponentVisible from '../../hooks/useComponentVisible';
import { addToCart } from '../../reducers/cartReducer';
import { setRatings, deleteRating } from '../../reducers/ratingsReducer';
import ProductEditForm from './ProductEditForm';
import RatingMenu from './Ratings/RatingMenu';

export default function ProductPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams().id;

  const user = useSelector((store) => store.user);
  const ratings = useSelector((store) => store.ratings);
  const myProduct = user?.products.includes(id);

  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [modalRef, isModal, setIsModal] = useComponentVisible();

  useEffect(() => {
    productService
      .getById(id)
      .then(({ product, ratings }) => {
        setProduct(product);
        dispatch(setRatings(ratings));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = () => {
    history.push('/');
    dispatch(deleteRating(id));
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
            {isEditing ? (
              <ProductEditForm
                product={product}
                cancelEditing={() => setIsEditing(false)}
              />
            ) : (
              <div className={S.info}>
                <h2 className={S.name}>{product.name}</h2>
                <Link to="/" className={S.seller}>
                  {product.username}
                </Link>
                <p className={S.price}>{product.price}$</p>
                <p className={S.stock}>{product.stock} in stock</p>
                <p className={S.desc}>{product.description}</p>
                <button
                  className={S.addCart}
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </button>
                {myProduct && (
                  <RatingMenu
                    handleDelete={() => setIsModal(true)}
                    toggleEdit={() => setIsEditing(true)}
                  />
                )}
              </div>
            )}
          </div>
          <Ratings ratings={ratings} />
        </>
      )}
    </div>
  );
}
