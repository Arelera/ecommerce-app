import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import S from './RatingInput.module.scss';
import starsToDisplay from '../../stars/starsToDisplay';
import { editRating, rateProduct } from '../../../reducers/ratingsReducer';

export default function RatingInput({ isEditing, setCanSeeInput }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const id = useParams().id;
  const user = useSelector((store) => store.user);

  const handleSubmitRating = (e) => {
    e.preventDefault();
    const fullRating = { rating, comment, user: user.id };
    isEditing
      ? dispatch(editRating(id, fullRating))
      : dispatch(rateProduct(id, fullRating));
    setCanSeeInput(false);
    setRating(5);
    setComment('');
  };

  return (
    <form className={S.form} onSubmit={handleSubmitRating}>
      <label>
        <div className={S.stars}>{starsToDisplay(rating)}</div>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={isEditing ? 'Edit review' : 'Add a review'}
          className={S.textarea}
        ></textarea>
      </label>
      <button className={S.button} type="submit">
        Submit
      </button>
      {isEditing && (
        <button
          className={S.button}
          type="button"
          onClick={() => setCanSeeInput(false)}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
