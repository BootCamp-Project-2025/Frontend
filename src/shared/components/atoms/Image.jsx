import PropTypes from "prop-types";

const BUTTON_STYLE_TYPES = {
  PROFILE: "profile",
};

export const Image = ({
  src,
  alt = "",
  width = "",
  height = "",
  styleType = "",
  classname = "",
}) => {
  const variantsStyle = {
    [BUTTON_STYLE_TYPES.PROFILE]: "rounded-full border border-black-500",
  };

  const variantClasses = variantsStyle[styleType]
    ? variantsStyle[styleType]
    : "";

  return (
    <img
      src={src}
      alt={alt}
      className={`${width} ${height} ${variantClasses} ${classname} `}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  styleType: PropTypes.oneOf(Object.values(BUTTON_STYLE_TYPES)),
  classname: PropTypes.string,
};
