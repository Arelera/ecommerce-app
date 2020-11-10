import S from './Cart.module.scss';
import faker from 'faker';
import { Link } from 'react-router-dom';

export default function Cart() {
  // will get products and amount from store
  // const productsInCart = useSelector(state => state.productsInCart)

  return (
    <div className={S.cart}>
      <div className={S.top}>
        <h2>My Cart</h2>
        <Link to="checkout">Checkout</Link>
        <h2>523$</h2>
      </div>

      {getFakeProducts(6).map((prod) => (
        <div className={S.cartItem}>
          <img className={S.prodImg} src={faker.image.nature()} />
          <div className={S.prodInfo}>
            <Link to="">
              <h3>{faker.commerce.productDescription()}</h3>
            </Link>
            <input className={S.amount} type="text" placeholder="Amount" />
            <p className={S.price}>1502$</p>
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
