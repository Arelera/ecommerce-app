import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useComponentVisible from '../../hooks/useComponentVisible';
import {
  clearCart,
  removeFromCart,
  setAmount,
} from '../../reducers/cartReducer';
import Modal from '../Modal/Modal';
import S from './Checkout.module.scss';

export default function Checkout() {
  const dispatch = useDispatch();
  const prods = useSelector((store) => store.cart);
  const [modalRef, checkedOut, setCheckedOut] = useComponentVisible(false);

  const handleCheckout = () => {
    setCheckedOut(true);
    dispatch(clearCart());
  };

  const totalPrice = prods.reduce(
    (acc, [{ price }, amount]) => acc + price * amount,
    0
  );
  // need this so i dont display "You just spent 0" after clearing cart
  const [lastPrice, setLastPrice] = useState();
  useEffect(() => {
    totalPrice && setLastPrice(totalPrice);
  }, [totalPrice]);

  return (
    <div className={S.checkout}>
      {checkedOut && (
        <Modal
          message={`You just spent ${lastPrice} imaginary dollars.`}
          setClose={() => setCheckedOut(false)}
          modalRef={modalRef}
        />
      )}
      <div className={S.header}>
        <h2>My Cart</h2>
        <h2>{totalPrice}$</h2>
      </div>
      {prods[0] ? (
        <>
          <ul>
            {prods.map(([prod, amount]) => (
              <li className={S.prod} key={prod.id}>
                <img
                  className={S.img}
                  loading="lazy"
                  src={prod.images[0][0]}
                  alt=""
                />
                <p className={S.name}>{prod.name}</p>
                <input
                  className={S.amount}
                  type="number"
                  value={amount}
                  onChange={(e) => dispatch(setAmount(prod.id, e.target.value))}
                />
                <p className={S.price}>{prod.price * amount}$</p>
                <button
                  className={S.removeBtn}
                  onClick={() => dispatch(removeFromCart(prod.id))}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <button className={S.checkoutBtn} onClick={handleCheckout}>
            Checkout
          </button>
        </>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}
