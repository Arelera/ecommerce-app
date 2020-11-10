import { useState } from 'react';
import S from './Menu.module.scss';
import hamburger from './svg/bars-solid.svg';
import { useHistory } from 'react-router-dom';
import categories from '../../categories';

export default function Menu() {
  const history = useHistory();
  const [dropdown, setDropdown] = useState(false);
  const [visibleCat, setVisibleCat] = useState('');

  const cleanForUrl = (text) => {
    return text.toLowerCase().replaceAll('&', '').replaceAll(/ +/g, '-');
  };

  const goTo = (cat, subcat) => {
    console.log('CAT: ', cat);
    const cleanCat = cleanForUrl(cat);
    const cleanSubcat = subcat && cleanForUrl(subcat);
    subcat
      ? history.push(`/${cleanCat}/${cleanSubcat}`)
      : history.push(`/${cleanCat}`);
  };

  return (
    <div className={S.div}>
      <button className={S.menu} onClick={() => setDropdown(!dropdown)}>
        <img className={S.svg} src={hamburger} alt="" />
      </button>
      {dropdown && (
        <ul onMouseLeave={() => setDropdown(false)} className={S.dropdown}>
          {categories.map((cat, i) => (
            <li className={S.category} key={i}>
              <button
                onMouseEnter={() => setVisibleCat(cat.name)}
                onClick={() => goTo(cat.name)}
                className={S.button}
              >
                {cat.name}&rarr;
              </button>
              {visibleCat === cat.name && (
                <div
                  onMouseLeave={() => setVisibleCat('')}
                  className={S.subcategories}
                >
                  {cat.subcategories.map((subcat, j) => (
                    <button
                      key={j}
                      onClick={() => goTo(cat.name, subcat)}
                      className={S.button}
                    >
                      {subcat}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
