import S from './Rating.module.scss';
import { useDispatch } from 'react-redux';
import starsToDisplay from '../../stars/starsToDisplay';
import RatingMenu from './RatingMenu';
import { deleteRating } from '../../../reducers/productsReducer';

export default function Rating({ rating, user }) {
  const dispatch = useDispatch();
  const cleanDate = (date) => `${date.slice(0, 10)} / ${date.slice(11, -4)}`;
  const isMyRating = rating.creator === user.id;
  const handleDelete = () => {
    dispatch(deleteRating(rating.id));
  };

  return (
    <div className={S.rating}>
      <div className={S.creator}>
        <div className={S.stars}>{starsToDisplay(rating.rating)}</div>
        <p>{rating.username}</p>
      </div>
      <p className={S.date}>{cleanDate(rating.createdAt)}</p>
      <p>{rating.comment}</p>
      {isMyRating && <RatingMenu handleDelete={() => handleDelete()} />}
    </div>
  );
}
