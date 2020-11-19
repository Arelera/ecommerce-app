import useComponentVisible from '../../hooks/useComponentVisible';
import ellipsisSvg from '../../svg/ellipsis-h-solid.svg';
import S from './DotMenu.module.scss';

export default function DotMenu({ size, choices, funcs, linked }) {
  const [menuRef, open, setOpen] = useComponentVisible();
  return (
    <div className={S.container}>
      <button className={S.btn} onClick={() => setOpen(!open)}>
        <img
          src={ellipsisSvg}
          alt=""
          className={
            size === 'small' ? S.svgSmall : size === 'big' ? S.svgBig : S.svgMed
          }
        />
      </button>
      {open && (
        <ul ref={menuRef} className={S.menu}>
          {choices.map((choice, i) => (
            <li key={i}>
              <button className={S.choice} onClick={funcs[i]}>
                {choice}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
