import { useState } from 'react';
import S from './Carousel.module.scss';
import rightSvg from '../../svg/chevron-right-solid.svg';
import leftSvg from '../../svg/chevron-left-solid.svg';

export default function Carousel({ images }) {
  const [index, setIndex] = useState(0);
  const imagesArr = images.map((image) => image[0]);
  return (
    <div className={S.carousel}>
      <button
        className={S.leftBtn}
        onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}
      >
        <img className={S.svg} src={leftSvg} alt="" />
      </button>
      <img className={S.img} src={imagesArr[index]} alt="" />
      <button
        className={S.rightBtn}
        onClick={() => setIndex(index + 1 === images.length ? 0 : index + 1)}
      >
        <img className={S.svg} src={rightSvg} alt="" />
      </button>
    </div>
  );
}
