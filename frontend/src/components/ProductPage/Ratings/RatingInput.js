import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import S from './RatingInput.module.scss';
import starsToDisplay from '../../stars/starsToDisplay';
import productService from '../../../services/productService';

export default function RatingInput() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const id = useParams().id;
  const user = useSelector((state) => state.user);

  const handleSubmitRating = (e) => {
    e.preventDefault();
    const obj = { rating, comment, user: user.id };
    productService.rateProduct(id, obj).then((res) => {
      console.log('Rated product: ', res);
    });
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
