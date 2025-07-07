import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RatingStars } from "../../../../shared/components/molecules/RatingStars";

export const CourseBannerInfo = ({ rating = 0, raters = 0, students = 0 }) => {
  return (
    <div className="flex flex-row gap-2 text-lg font-light">
      <RatingStars rating={rating}></RatingStars>
      <Link className="text-primary-600 border-b border-primary-600">
        {`(${raters} Ratings)`}
      </Link>
      <p>{`${students} Student${students === 1 ? "" : "s"}`}</p>
    </div>
  );
};

CourseBannerInfo.propTypes = {
  rating: PropTypes.number,
  raters: PropTypes.number,
  students: PropTypes.number,
};
