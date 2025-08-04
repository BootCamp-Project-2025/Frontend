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
import ProposalIcon from "../../../assets/proposal.svg?react";
import TeacherIcon from "../../../assets/teacher.svg?react";
import CheckIcon from "../../../assets/check.svg?react";
import CheckSyllabusIcon from "../../../assets/checkSyllabus.svg?react";
import Search from "../../../assets/search.svg?react";
import msgDelivered from "../../../assets/chat-icons/msg-delivered.svg?react";
import msgError from "../../../assets/chat-icons/msg-error.svg?react";
import msgRead from "../../../assets/chat-icons/msg-read.svg?react";
import msgSent from "../../../assets/chat-icons/msg-sent.svg?react";
import userOffline from "../../../assets/chat-icons/user-offline.svg?react";
import userOnline from "../../../assets/chat-icons/user-online.svg?react";
import newMessage from "../../../assets/chat-icons/new-message.svg?react";
import Send from "../../../assets/chat-icons/send.svg?react";
import CheckCircle from "../../../assets/checkCircle.svg?react";
import ErrorCircle from "../../../assets/errorCircle.svg?react";
import InfoCircle from "../../../assets/infoCircle.svg?react";
import Warning from "../../../assets/warning.svg?react";
import ArrowForwardBlueIcon from "../../../assets/arrowForwardBlue.svg?react";
import CloseDarkIcon from "../../../assets/closeDark.svg?react";
import ChatIcon from "../../../assets/chat.svg?react";
import CoursesIcon from "../../../assets/courses.svg?react";
import AnalyticsIcon from "../../../assets/analytics.svg?react";
import AssignmentIcon from "../../../assets/assignment.svg?react";
import MoreVert from "../../../assets/moreVert.svg?react";
import ArticleIcon from "../../../assets/article.svg?react";
import QuizIcon from "../../../assets/quiz.svg?react";
import DocumentIcon from "../../../assets/document.svg?react";
import Facebook from "../../../assets/facebook.svg?react";
import Instagram from "../../../assets/instagram.svg?react";
import Linkedin from "../../../assets/linkedin.svg?react";
import Youtube from "../../../assets/youtube.svg?react";
import Uparrow from "../../../assets/uparrow.svg?react";
import Downarrow from "../../../assets/downarrow.svg?react";
import ArrowBack from "../../../assets/arrow-back.svg?react";
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
  proposal: ProposalIcon,
  teacher: TeacherIcon,
  check: CheckIcon,
  checkSyllabus: CheckSyllabusIcon,
  search: Search,
  msgDelivered: msgDelivered,
  msgError: msgError,
  msgRead: msgRead,
  msgSent: msgSent,
  userOffline: userOffline,
  userOnline: userOnline,
  newMessage: newMessage,
  checkCircle: CheckCircle,
  errorCircle: ErrorCircle,
  infoCircle: InfoCircle,
  warning: Warning,
  arrowForwardBlue: ArrowForwardBlueIcon,
  closeDark: CloseDarkIcon,
  chat: ChatIcon,
  courses: CoursesIcon,
  analytics: AnalyticsIcon,
  assignment: AssignmentIcon,
  moreVert: MoreVert,
  send: Send,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  article: ArticleIcon,
  quiz: QuizIcon,
  document: DocumentIcon,
  uparrow: Uparrow,
  downarrow: Downarrow,
  arrowBack: ArrowBack,
};

export function Icon({ icon, className }) {
  const SVGIcon = icons[icon];
  return <SVGIcon className={className} />;
}

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  className: PropTypes.string,
};
