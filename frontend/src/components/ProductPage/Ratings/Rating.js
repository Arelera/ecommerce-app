import starsToDisplay from '../../stars/starsToDisplay';
import S from './Rating.module.scss';

export default function Rating({ rating }) {
  const cleanDate = (date) => `${date.slice(0, 10)} / ${date.slice(11, -4)}`;
  return (
    <div className={S.rating}>
      <div className={S.creator}>
        <div className={S.stars}>{starsToDisplay(rating.rating)}</div>
        <p>{rating.creator}</p>
      </div>
      <p className={S.date}>{cleanDate(rating.createdAt)}</p>
      <p>{rating.comment}</p>
    </div>
  );
}
