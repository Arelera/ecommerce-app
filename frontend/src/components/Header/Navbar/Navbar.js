import { Link } from 'react-router-dom';
import Logo from './Logo';
import Menu from './Menu';
import SearchBar from './SearchBar';
import Cart from './NavCart';
import S from './Navbar.module.scss';
import { useState } from 'react';

export default function Navbar() {
  const [isSignedin, setIsSignedin] = useState(false);

  return (
    <nav className={S.navbar}>
      <Logo />
      <Menu />
      <SearchBar />
      <div className={S.signIn}>
        {isSignedin ? (
          <div className={S.signoutadd}>
            <Link to="/">Sign out</Link>
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
