import S from './Cart.module.scss';
import faker from 'faker';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Cart() {
  // will get products and amount from store
  // const productsInCart = useSelector(state => state.productsInCart)
  const [cartProducts, setCartProducts] = useState(getFakeProducts(4));

  return (
    <div className={S.cart}>
      <div className={S.top}>
        <h2>My Cart</h2>
        <Link to="checkout">Checkout</Link>
        <h2>
          {cartProducts.reduce((acc, { price }) => acc + Number(price), 0)}$
        </h2>
      </div>

      {cartProducts.map((prod, i) => (
        <div className={S.cartItem} key={i}>
          <img className={S.prodImg} src={prod.imgUrl} />
          <div className={S.prodInfo}>
            <Link to="">
              <h3>{faker.commerce.productDescription()}</h3>
            </Link>
            <input className={S.amount} type="text" placeholder="Amount" />
            <p className={S.price}>{prod.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
const getFakeProducts = (num) => {
  const prods = [];
  while (prods.length < num) {
    prods.push({
      imgUrl: faker.image.nature(),
      price: faker.commerce.price(),
      name: faker.commerce.productDescription(),
      rating: Math.floor(Math.random() * 5 * 100) / 100,
    });
  }
  return prods;
};
