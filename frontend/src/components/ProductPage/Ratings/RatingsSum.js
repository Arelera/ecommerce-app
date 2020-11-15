import S from './RatingsSum.module.scss';
import starsToDisplay from '../../stars/starsToDisplay';

export default function RatingsSum({ ratings }) {
  const ratio =
    Math.round(
      (ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length) *
        10
    ) / 10;

  return (
    <div className={S.ratingsSum}>
      <h2>Ratings Summary</h2>
      <div className={S.stars}>{starsToDisplay(ratio)}</div>
      <h3 className={S.ratio}>
        {ratio}/5, {ratings.length} votes
      </h3>
    </div>
  );
}
