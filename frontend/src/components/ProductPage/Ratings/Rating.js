import S from './Rating.module.scss';
import starsToDisplay from '../../stars/starsToDisplay';
import RatingMenu from './RatingMenu';
import Modal from '../../Modal/Modal';
import useComponentVisible from '../../../hooks/useComponentVisible';

export default function Rating({ rating, user, handleDelete, toggleEdit }) {
  const cleanDate = (date) => `${date.slice(0, 10)} / ${date.slice(11, -4)}`;
  const isMyRating = rating.creator === user.id;
  const [modalRef, modalOpen, setModalOpen] = useComponentVisible();

  return (
    <div className={S.rating}>
      {modalOpen && (
        <Modal
          modalRef={modalRef}
          setClose={() => setModalOpen(false)}
          onClick={handleDelete}
          message="Are you sure you want to delete this review?"
        />
      )}
      <div className={S.creator}>
        <div className={S.stars}>{starsToDisplay(rating.rating)}</div>
        <p>{rating.username}</p>
      </div>
      <p className={S.date}>{cleanDate(rating.createdAt)}</p>
      <p>{rating.comment}</p>
      {isMyRating && (
        <RatingMenu
          handleDelete={() => setModalOpen(true)}
          toggleEdit={toggleEdit}
        />
      )}
    </div>
  );
}
