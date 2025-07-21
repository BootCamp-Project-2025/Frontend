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
import LogoutIcon from "../../../assets/logout.svg?react";
import MenuIcon from "../../../assets/menu.svg?react";
import HomeIcon from "../../../assets/home.svg?react";
import MessageIcon from "../../../assets/message.svg?react";
import UserIcon from "../../../assets/user.svg?react";
import CourseIcon from "../../../assets/course.svg?react";
import DashboardIcon from "../../../assets/dashboard.svg?react";
import TeacherIcon from "../../../assets/teacher.svg?react";
import Search from "../../../assets/search.svg?react";
import ArrowForwardBlueIcon from "../../../assets/arrowForwardBlue.svg?react";
import CloseDarkIcon from "../../../assets/closeDark.svg?react";
import ChatIcon from "../../../assets/chat.svg?react";
import CoursesIcon from "../../../assets/courses.svg?react";
import AnalyticsIcon from "../../../assets/analytics.svg?react";
import AssignmentIcon from "../../../assets/assignment.svg?react";

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
  logout: LogoutIcon,
  menu: MenuIcon,
  home: HomeIcon,
  message: MessageIcon,
  user: UserIcon,
  course: CourseIcon,
  dashboard: DashboardIcon,
  teacher: TeacherIcon,
  search: Search,
  arrowForwardBlue: ArrowForwardBlueIcon,
  closeDark: CloseDarkIcon,
  chat: ChatIcon,
  courses: CoursesIcon,
  analytics: AnalyticsIcon,
  assignment: AssignmentIcon,
};

export function Icon({ icon, className }) {
  const SVGIcon = icons[icon];
  return <SVGIcon className={className} />;
}

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  className: PropTypes.string,
};
