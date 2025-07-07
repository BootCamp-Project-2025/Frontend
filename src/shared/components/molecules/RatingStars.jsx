import PropTypes from "prop-types";
import { useId } from "react";

const Star = ({ fill = 0, startSize = "1.25rem" }) => {
  const gradientId = `starGradient-${useId()}`;

  return (
    <svg
      height={startSize}
      width={startSize}
      viewBox="0 -960 960 960"
      className="inline-block mx-0.5"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset={`${fill * 100}%`} stopColor="#FFD82B" />
          <stop offset={`${fill * 100}%`} stopColor="#e3e3e3" />
        </linearGradient>
      </defs>
      <path
        d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

Star.propTypes = {
  fill: PropTypes.number,
  startSize: PropTypes.string,
};

export const RatingStars = ({
  rating = 0,
  startSize = "1.25rem",
  numberText = true,
}) => {
  const totalStars = 5;

  const safeRating = Math.min(Math.max(rating, 0), totalStars);

  return (
    <div className="flex items-center space-x-2">
      {numberText == true && (
        <span className="text-lg font-bold text-[#FFD82B]">
          {safeRating.toFixed(1)}
        </span>
      )}

      <div className="flex">
        {Array.from({ length: totalStars }, (_, i) => {
          const fill = Math.max(0, Math.min(1, safeRating - i));
          return <Star key={i} fill={fill} startSize={startSize} />;
        })}
      </div>
    </div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number,
  startSize: PropTypes.string,
  numberText: PropTypes.bool,
};
