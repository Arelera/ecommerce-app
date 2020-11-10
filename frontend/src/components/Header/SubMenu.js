import { Link, useParams } from 'react-router-dom';
import S from './SubMenu.module.scss';
import categories from '../categories';

export default function SubMenu() {
  const urlCategory = useParams().category;
  const cleanCategory = (c) => c.toLowerCase().replaceAll(/ +/g, '-');

  const subcategories = categories.find(
    (cat) => cleanCategory(cat.name) === urlCategory
  ).subcategories;

  return (
    <div className={S.submenu}>
      {subcategories.map((subcat) => (
        <Link to={`/${urlCategory}/${subcat}`}>{subcat}</Link>
      ))}
    </div>
  );
}
