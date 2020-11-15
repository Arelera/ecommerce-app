import cartsvg from './svg/shopping-cart-solid.svg';
import S from './NavCart.module.scss';
import Cart from './Cart';
import { useState } from 'react';
import useComponentVisible from '../../../hooks/useComponentVisible';
export default function NavCart() {
  const [cartRef, cartVisible, setCartVisible] = useComponentVisible();

  return (
    <>
      <div className={S.cart}>
        <button onClick={() => setCartVisible(true)} className={S.button}>
          <img src={cartsvg} alt="Cart button" />
        </button>
      </div>
      {cartVisible && (
        <div ref={cartRef}>
          <Cart />
        </div>
      )}
    </>
  );
}
