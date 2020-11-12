import Rating from './Rating';
import RatingInput from './RatingInput';
import S from './Ratings.module.scss';
import RatingsSum from './RatingsSum';

export default function Ratings() {
  return (
    <div className={S.ratingsBox}>
      <RatingsSum ratings={ratings1} />
      <div className={S.ratingsList}>
        <RatingInput />
        <Rating rating={rating()} />
        <Rating rating={rating()} />
      </div>
    </div>
  );
}

const rating = () => ({
  id: Math.round(Math.random() * 100),
  creator: 'Bobbeyyy Gobbebby',
  rating: Math.round(Math.random() * 500) / 100,
  comment: 'Dam bro this is some sick product, i recommend buying it IMMEDIATELY. Thank you. Dam bro this is some sick product, i recommend buying it IMMEDIATELY. Thank you.Dam bro this is some sick product, i recommend buying it IMMEDIATELY. Thank you.Dam bro this is some sick product, i recommend buying it IMMEDIATELY. Thank you.'.substring(
    0,
    Math.round(Math.random() * 300)
  ),
  createdAt: new Date().toISOString().substring(0, 20),
});
const ratings1 = [rating(), rating(), rating()];
