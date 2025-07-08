import CertificationIcon from "../../../assets/certification.svg?react";
import EditIcon from "../../../assets/edit.svg?react";
import AddIcon from "../../../assets/add.svg?react";
import CloseIcon from "../../../assets/close.svg?react";
import EmailIcon from "../../../assets/email.svg?react";
import DeleteIcon from "../../../assets/delete.svg?react";
import ArrowForward from "../../../assets/arrowForward.svg?react";
import Language from "../../../assets/language.svg?react";
import Star from "../../../assets/star.svg?react";
import Group from "../../../assets/group.svg?react";
import LiveTv from "../../../assets/liveTv.svg?react";
import PropTypes from "prop-types";

const icons = {
  certification: CertificationIcon,
  edit: EditIcon,
  add: AddIcon,
  close: CloseIcon,
  email: EmailIcon,
  delete: DeleteIcon,
  arrowForward: ArrowForward,
  language: Language,
  star: Star,
  group: Group,
  liveTv: LiveTv,
};

export function Icon({ icon, className }) {
  const SVGIcon = icons[icon];
  return <SVGIcon className={className} />;
}

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  className: PropTypes.string,
};
