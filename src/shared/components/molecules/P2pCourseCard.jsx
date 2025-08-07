import { Card } from "../atoms/Card";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const P2pCourseCard = ({
  id = "idCourse",
  name = "Course name",
  author = "Author name",
  redirecTo = "",
  status = "",
  remainingSession,
  chatId = "",
  student = true,
  ...props
}) => {
  const navigate = useNavigate();
  const fontColor = { ACTIVE: "lime", CANCELED: "gray", COMPLETED: "gray" };

  const handleCardClick = () => {
    if (student) {
      navigate(redirecTo || `/student/p2p-course/${id}/post`);
    } else {
      navigate(`/teacher/chats`, { state: { chatId: chatId } });
    }
  };

  return (
    <Card
      className="relative border-gray-300 bg-white flex flex-col hover:cursor-pointer hover:border-primary-500 hover:bg-primary-50 gap-1.5"
      bordered
      borderWidth="thin"
      radius="small"
      color="secondary"
      shadow="custom"
      padding="md"
      onClick={handleCardClick}
      {...props}
    >
      <div className="flex flex-col p-2 gap-2">
        <div className="flex justify-between">
          <p className="text-base font-bold text-gray-900 line-clamp-2">
            {name}
          </p>
          {status && (
            <p
              className={`text-base font-extrabold text-${fontColor[status]}-600 line-clamp-2`}
            >
              {status}
            </p>
          )}
        </div>
        <p className="line-clamp-1 text-xs font-[400] text-gray-950 mt-auto">
          Reminding Sessions: {remainingSession}
        </p>
        <p className="line-clamp-1 text-xs font-[400] text-gray-950 mt-auto">
          {student ? "Teacher: " : "Student: "}
          <span className="uppercase">{author}</span>
        </p>
      </div>
    </Card>
  );
};

P2pCourseCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  author: PropTypes.string,
  redirecTo: PropTypes.string,
  status: PropTypes.string,
  remainingSession: PropTypes.number,
  chatId: PropTypes.string,
  student: PropTypes.bool,
};
