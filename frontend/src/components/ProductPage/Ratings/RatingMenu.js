import { useState } from 'react';
import useComponentVisible from '../../../hooks/useComponentVisible';
import ellipsisSvg from '../../../svg/ellipsis-h-solid.svg';
import S from './RatingMenu.module.scss';

export default function RatingMenu({ handleDelete }) {
  // const [open, setOpen] = useState(false);
  const [menuRef, open, setOpen] = useComponentVisible();

  return (
    <div className={S.container}>
      <button className={S.btn} onClick={() => setOpen(!open)}>
        <img src={ellipsisSvg} className={S.svg} />
      </button>
      {open && (
        <ul ref={menuRef} className={S.menu}>
          <li>
            <button className={S.choice} onClick={handleDelete}>
              delete
            </button>
            <button className={S.choice}>edit</button>
          </li>
        </ul>
      )}
    </div>
  );
}
