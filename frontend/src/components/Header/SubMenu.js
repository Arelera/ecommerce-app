import { Link, useParams } from 'react-router-dom';
import S from './SubMenu.module.scss';
import categories from '../categories';
import cleanForUrl from '../cleanForUrl';

export default function SubMenu() {
  const urlCategory = useParams().category;

  const subcategories = categories.find(
    (cat) => cleanForUrl(cat.name) === urlCategory
  )?.subcategories;

  return (
    <div className={S.submenu}>
      {urlCategory
        ? subcategories.map((subcat, i) => (
            <Link
              key={i}
              to={`/products/${urlCategory}/${cleanForUrl(subcat)}`}
            >
              {subcat}
            </Link>
          ))
        : categories.map((cat, i) => (
            <Link key={i} to={`/products/${cleanForUrl(cat.name)}`}>
              {cat.name}
            </Link>
          ))}
      {}
    </div>
  );
}
