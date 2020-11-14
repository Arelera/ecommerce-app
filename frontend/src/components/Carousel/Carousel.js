// import { useState } from 'react';
// import S from './Carousel.module.scss'; WORK IN PROGRESS

// export default function Carousel({ images, imgS }) {
//   const [index, setIndex] = useState(0);
//   const imagesArr = images.map((image) => image[0]);
//   return (
//     <div className={S.carousel}>
//       <button
//         className={S.leftBtn}
//         onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}
//       >
//         &lt;
//       </button>
//       <img src={imagesArr[index]} className={imgS.img} />
//       <button
//         className={S.rightBtn}
//         onClick={() => setIndex(index + 1 === images.length ? 0 : index + 1)}
//       >
//         &gt;
//       </button>
//     </div>
//   );
// }
