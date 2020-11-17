import { useSelector } from 'react-redux';
import Rating from './Rating';
import RatingInput from './RatingInput';
import S from './Ratings.module.scss';
import RatingsSum from './RatingsSum';

export default function Ratings({ ratings }) {
  const user = useSelector((store) => store.user);
  const sorted = ratings.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <div className={S.ratingsBox}>
      <RatingsSum ratings={ratings} />
      <div className={S.ratingsList}>
        <RatingInput ratings={ratings} />
        {sorted.map((rating) => (
          <Rating key={rating.id} rating={rating} user={user} />
        ))}
      </div>
    </div>
  );
}
