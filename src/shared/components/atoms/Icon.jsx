import CertificationIcon from "../../../assets/certification.svg?react";
import EditIcon from "../../../assets/edit.svg?react";
import EditBlackIcon from "../../../assets/editBlack.svg?react";
import AddIcon from "../../../assets/add.svg?react";
import PlusIcon from "../../../assets/plus.svg?react";
import CloseIcon from "../../../assets/close.svg?react";
import SyllabusAlertIcon from "../../../assets/syllabusAlert.svg?react";
import TrashCanIcon from "../../../assets/trashCan.svg?react";
import VectorUpIcon from "../../../assets/vectorPointer.svg?react";
import VectorDownIcon from "../../../assets/vectorDown.svg?react";
import SaveIcon from "../../../assets/save.svg?react";
import EmailIcon from "../../../assets/email.svg?react";
import DeleteIcon from "../../../assets/delete.svg?react";
import LogoutIcon from "../../../assets/logout.svg?react";
import MenuIcon from "../../../assets/menu.svg?react";
import HomeIcon from "../../../assets/home.svg?react";
import MessageIcon from "../../../assets/message.svg?react";
import UserIcon from "../../../assets/user.svg?react";
import CourseIcon from "../../../assets/course.svg?react";
import DashboardIcon from "../../../assets/dashboard.svg?react";
import TeacherIcon from "../../../assets/teacher.svg?react";
import PropTypes from "prop-types";

const icons = {
  certification: CertificationIcon,
  edit: EditIcon,
  editBlack: EditBlackIcon,
  add: AddIcon,
  save: SaveIcon,
  plus: PlusIcon,
  close: CloseIcon,
  syllabusAlert: SyllabusAlertIcon,
  trashCan: TrashCanIcon,
  vectorUp: VectorUpIcon,
  vectorDown: VectorDownIcon,
  email: EmailIcon,
  delete: DeleteIcon,
  logout: LogoutIcon,
  menu: MenuIcon,
  home: HomeIcon,
  message: MessageIcon,
  user: UserIcon,
  course: CourseIcon,
  dashboard: DashboardIcon,
  teacher: TeacherIcon,
};

export function Icon({ icon, className }) {
  const SVGIcon = icons[icon];
  return <SVGIcon className={className} />;
}

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  className: PropTypes.string,
};
