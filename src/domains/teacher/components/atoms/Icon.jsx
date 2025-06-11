import CertificationIcon from "../../../../assets/certification.svg?react";
import EditIcon from "../../../../assets/edit.svg?react";
import AddIcon from "../../../../assets/add.svg?react";
import CloseIcon from "../../../../assets/close.svg?react";
import PropTypes from "prop-types";

const icons = {
  certification: CertificationIcon,
  edit: EditIcon,
  add: AddIcon,
  close: CloseIcon,
};

export default function Icon({ icon, className }) {
  const SVGIcon = icons[icon];
  return <SVGIcon className={className} />;
}

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  className: PropTypes.string,
};
