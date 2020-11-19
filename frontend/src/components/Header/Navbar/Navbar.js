import S from './Navbar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Logo from './Logo';
import Menu from './Menu';
import SearchBar from './SearchBar';
import NavCart from './NavCart';
import DotMenu from '../../DotMenu/DotMenu';
import { signoutUser } from '../../../reducers/userReducer';

export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const signout = () => {
    dispatch(signoutUser());
    history.push('/');
  };

  return (
    <nav className={S.navbar}>
      <Logo />
      <Menu />
      <SearchBar />
      <div className={S.menuBox}>
        <DotMenu
          linked={true}
          size="big"
          choices={
            user?.username
              ? ['Add product', 'My products', 'Sign out']
              : ['Sign in']
          }
          funcs={
            user?.username
              ? [
                  () => history.push('/add-product'),
                  () => history.push(`/products/user/${user.id}`),
                  signout,
                ]
              : [() => history.push('/sign-in')]
          }
        />
      </div>
      <NavCart />
    </nav>
  );
}
