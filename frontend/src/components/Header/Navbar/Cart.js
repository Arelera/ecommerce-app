import S from './Cart.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAmount } from '../../../reducers/cartReducer';

export default function Cart() {
  const dispatch = useDispatch();
  const productsInCart = useSelector((store) => store.cart);

  return (
    <div className={S.cart}>
      <div className={S.top}>
        <h2>My Cart</h2>
        <Link to="/checkout">Checkout</Link>
        <h2>
          {productsInCart.reduce(
            (acc, [prod, amount]) => acc + Number(prod.price) * amount,
            0
          )}
          $
        </h2>
      </div>

      {productsInCart.map(([prod, amount]) => (
        <div className={S.cartItem} key={prod.id}>
          <img className={S.prodImg} src={prod.images[0][0]} />
          <div className={S.prodInfo}>
            <Link to={`/products/${prod.id}`}>
              <h3 className={S.name}>{prod.name}</h3>
            </Link>
            <input
              onChange={(e) => dispatch(setAmount(prod.id, e.target.value))}
              className={S.amount}
              value={amount}
              type="text"
              placeholder="Amount"
            />
            <p className={S.price}>{prod.price * amount}$</p>
          </div>
        </div>
      ))}
    </div>
  );
}
