import S from './ProductPage.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import Ratings from './Ratings/Ratings';
import Modal from '../Modal/Modal';
import productService from '../../services/productService';
import useComponentVisible from '../../hooks/useComponentVisible';
import { addToCart } from '../../reducers/cartReducer';
import { setRatings } from '../../reducers/ratingsReducer';
import ProductEditForm from './ProductEditForm';
import Loader from '../Loader/Loader';

import Carousel from '../Carousel/Carousel';
import DotMenu from '../DotMenu/DotMenu';
import { deleteOne } from '../../reducers/productsReducer';

export default function ProductPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams().id;

  const user = useSelector((store) => store.user);
  const ratings = useSelector((store) => store.ratings);
  const loading = useSelector((store) => store.loading);
  const myProduct = user?.products.includes(id);

  const [product, setProduct] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const [modalRef, isModal, setIsModal] = useComponentVisible();

  useEffect(() => {
    productService
      .getById(id)
      .then(({ product, ratings }) => {
        setProduct(product);
        dispatch(setRatings(ratings));
        dispatch({ type: 'STOP_LOADING' });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, dispatch]);

  const handleDelete = () => {
    history.push('/');
    dispatch(deleteOne(product));
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={S.productBox}>
            <Carousel images={product.images} />
            {isEditing ? (
              <ProductEditForm
                product={product}
                cancelEditing={() => setIsEditing(false)}
              />
            ) : (
              <div className={S.info}>
                <h2 className={S.name}>{product.name}</h2>
                <Link
                  to={`/products/user/${product.creator}`}
                  className={S.seller}
                >
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
                  <DotMenu
                    choices={['edit', 'delete']}
                    size="big"
                    funcs={[() => setIsEditing(true), () => setIsModal(true)]}
                  />
                )}
              </div>
            )}
          </div>
          <Ratings ratings={ratings} productCreator={product.creator} />
        </>
      )}
    </div>
  );
}
