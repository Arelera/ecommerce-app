import { useState } from 'react';
import starsToDisplay from '../../stars/starsToDisplay';
import S from './RatingInput.module.scss';

export default function RatingInput() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const handleSubmitRating = (e) => {
    e.preventDefault();
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
          placeholder="Add a review"
          className={S.textarea}
        ></textarea>
      </label>
      <button className={S.button} type="submit">
        Submit
      </button>
    </form>
  );
}
