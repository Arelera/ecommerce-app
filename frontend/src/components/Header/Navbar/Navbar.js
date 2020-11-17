import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Menu from './Menu';
import SearchBar from './SearchBar';
import Cart from './NavCart';
import S from './Navbar.module.scss';
import { signoutUser } from '../../../reducers/userReducer';

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <nav className={S.navbar}>
      <Logo />
      <Menu />
      <SearchBar />
      <div className={S.signIn}>
        {user?.username ? (
          <div className={S.signoutadd}>
            <Link to="/" onClick={() => dispatch(signoutUser())}>
              Sign out
            </Link>
            <Link to="/add-product">Add product</Link>
          </div>
        ) : (
          <Link to="/sign-in">
            <p>Sign in</p>
          </Link>
        )}
      </div>
      <Cart />
    </nav>
  );
}
