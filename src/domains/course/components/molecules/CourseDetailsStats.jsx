import PropTypes from "prop-types";
import { RatingStars } from "../../../../shared/components/molecules/RatingStars";

export const CourseDetailsStats = ({
  rating = 0,
  raters = 0,
  students = 0,
}) => {
  return (
    <div className="flex flex-row gap-2 text-lg font-light flex-wrap">
      <RatingStars rating={rating}></RatingStars>
      <a
        href="#reviewsSection"
        className="text-primary-600 border-b border-primary-600 text-nowrap"
      >
        ({raters} Ratings)
      </a>

      <p className="text-nowrap">{`${students} Student${students === 1 ? "" : "s"}`}</p>
    </div>
  );
};

CourseDetailsStats.propTypes = {
  rating: PropTypes.number,
  raters: PropTypes.number,
  students: PropTypes.number,
};
