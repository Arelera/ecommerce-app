import { Link } from 'react-router-dom';
import S from './Logo.module.scss';

export default function Logo() {
  return (
    <h1 className={S.mainLogo}>
      <Link to="/">WADAP!</Link>
    </h1>
  );
}
