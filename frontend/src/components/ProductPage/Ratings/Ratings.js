import S from './Ratings.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating';
import RatingInput from './RatingInput';
import RatingsSum from './RatingsSum';
import { deleteRating } from '../../../reducers/ratingsReducer';
import { useState } from 'react';

export default function Ratings({ ratings, productCreator }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const sorted = ratings.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const [isEditing, setIsEditing] = useState(false);

  // don't show input if it's users product or if user rated before
  const [canSeeInput, setCanSeeInput] = useState(
    productCreator !== user?.id &&
      user &&
      !ratings.find((rating) => rating.creator === user.id)
  );
  const handleDelete = (id) => {
    dispatch(deleteRating(id));
  };
  const toggleEdit = () => {
    setCanSeeInput(!canSeeInput);
    setIsEditing(!isEditing);
  };

  return (
    <div className={S.ratingsBox}>
      <RatingsSum ratings={ratings} />
      <div className={S.ratingsList}>
        {canSeeInput && (
          <RatingInput
            ratings={ratings}
            isEditing={isEditing}
            setCanSeeInput={setCanSeeInput}
          />
        )}
        {sorted.map((rating) => (
          <Rating
            key={rating.id}
            rating={rating}
            user={user}
            handleDelete={() => handleDelete(rating.id)}
            toggleEdit={toggleEdit}
          />
        ))}
      </div>
    </div>
  );
}
