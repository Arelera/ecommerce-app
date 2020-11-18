import useComponentVisible from '../../../hooks/useComponentVisible';
import ellipsisSvg from '../../../svg/ellipsis-h-solid.svg';
import S from './RatingMenu.module.scss';

export default function RatingMenu({ handleDelete, toggleEdit, small }) {
  const [menuRef, open, setOpen] = useComponentVisible();

  return (
    <div className={S.container}>
      <button className={S.btn} onClick={() => setOpen(!open)}>
        <img src={ellipsisSvg} className={small ? S.svgSmall : S.svgBig} />
      </button>
      {open && (
        <ul ref={menuRef} className={S.menu}>
          <li>
            <button className={S.choice} onClick={handleDelete}>
              delete
            </button>
            <button className={S.choice} onClick={toggleEdit}>
              edit
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
