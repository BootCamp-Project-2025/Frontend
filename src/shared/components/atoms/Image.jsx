import PropTypes from "prop-types";

export const Image = ({
  src,
  alt = "",
  width = "",
  height = "",
  styleType = "",
}) => {
  const variantsStyle = {
    profile: "rounded-full border border-black-500",
  };

  const variantClasses = variantsStyle[styleType]
    ? variantsStyle[styleType]
    : "";

  return (
    <img
      src={src}
      alt={alt}
      className={`${width} ${height} ${variantClasses}`}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  styleType: PropTypes.string,
};
