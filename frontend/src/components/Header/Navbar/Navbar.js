import { Link } from 'react-router-dom';
import Logo from './Logo';
import Menu from './Menu';
import SearchBar from './SearchBar';
import Cart from './NavCart';
import S from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={S.navbar}>
      <Logo />
      <Menu />
      <SearchBar />
      <div className={S.signIn}>
        <Link to="/sign-in">
          <p>Sign in</p>
        </Link>
      </div>
      <Cart />
    </nav>
  );
}
