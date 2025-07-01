import CertificationIcon from "../../../assets/certification.svg?react";
import EditIcon from "../../../assets/edit.svg?react";
import EditBlackIcon from "../../../assets/editBlack.svg?react";
import AddIcon from "../../../assets/add.svg?react";
import CloseIcon from "../../../assets/close.svg?react";
import SyllabusAlertIcon from "../../../assets/syllabusAlert.svg?react";
import TrashCanIcon from "../../../assets/trashCan.svg?react";
import VectorPointerIcon from "../../../assets/vectorPointer.svg?react";
import PropTypes from "prop-types";

const icons = {
  certification: CertificationIcon,
  edit: EditIcon,
  editBlack: EditBlackIcon,
  add: AddIcon,
  close: CloseIcon,
  syllabusAlert: SyllabusAlertIcon,
  trashCan: TrashCanIcon,
  vectorPointer: VectorPointerIcon,
};

export function Icon({ icon, className }) {
  const SVGIcon = icons[icon];
  return <SVGIcon className={className} />;
}

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  className: PropTypes.string,
};
