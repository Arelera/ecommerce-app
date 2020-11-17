import fullStar from '../../svg/star.svg';
import halfStar from '../../svg/star-half.svg';
import emptyStar from '../../svg/star-outline.svg';

const starsToDisplay = (rating) => {
  const decimal = rating % 1;
  const fullStars = rating - decimal;
  const emptyStars = decimal > 0 ? 5 - fullStars - 1 : 5 - fullStars;
  const halfStars = 5 - fullStars - emptyStars;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <img className="star" src={fullStar} alt="" key={stars.length} />
    );
  }
  for (let i = 0; i < halfStars; i++) {
    stars.push(
      <img className="star" src={halfStar} alt="" key={stars.length} />
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <img className="star" src={emptyStar} alt="" key={stars.length} />
    );
  }
  return stars;
};

export default starsToDisplay;
