import PropTypes from "prop-types";
import { ExpandableText } from "../../../../shared/components/molecules/ExpandableText";
import { RatingStars } from "../../../../shared/components/molecules/RatingStars";

export const CourseReview = ({
  avatarURL = "avatar url",
  name = "Name reviewer",
  rating = "0",
  comment = "comment",
  dateReview = "00/00/00",
}) => {
  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded-lg px-3 py-4">
      <div className=" flex flex-row gap-4">
        <div className="w-[3.1rem] h-[3.1rem] min-w-[3.1rem] min-h-[3.1rem] rounded-full overflow-hidden bg-gray-200">
          <img src={avatarURL} alt="teacher image" className="w-full" />
        </div>
        <div>
          <p className="text-lg font-bold">{name}</p>
          <div className="flex  flex-row gap-1.5 text-sm font-medium text-gray-500 items-center">
            <RatingStars
              startSize="1.1rem"
              numberText="false"
              rating={rating}
            ></RatingStars>
            <p>{dateReview}</p>
          </div>
        </div>
      </div>
      <ExpandableText text={comment} maxLines={3}></ExpandableText>
    </div>
  );
};

CourseReview.propTypes = {
  avatarURL: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  comment: PropTypes.string,
  dateReview: PropTypes.string,
};
