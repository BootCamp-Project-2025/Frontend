import { Card } from "../atoms/Card";
import PropTypes from "prop-types";
import { Icon } from "../atoms/Icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const CourseCard = ({
  id = "idCourse",
  imageURL,
  name = "Course name",
  description = "Description course",
  rating = "0.0",
  author = "Author name",
  showAuthor = true,
  showDescription = true,
  showRating = true,
  redirecTo = "",
  showDropOption = false,
  onDropCourse = () => {},
  ...props
}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleCardClick = () => {
    if (!showMenu) navigate(redirecTo || `/courses/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      {showDropOption && (
        <div className="absolute top-2 right-2 z-10" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            className="text-gray-600 hover:text-gray-900 p-1.5 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-sm"
          >
            <Icon icon="moreVert" className="w-5 h-5 fill-gray-900" />
          </button>
          {showMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-md z-20"
            >
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setShowMenu(false);
                  onDropCourse(id);
                }}
              >
                Drop course
              </button>
            </div>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-sm flex justify-center items-center bg-gray-300 text-xs aspect-[1/0.6]">
        <img src={imageURL} alt="Course Image" className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col p-2 gap-2">
        <div className="flex gap-1">
          <p className="text-base font-bold text-gray-900 line-clamp-2 flex-1">
            {name}
          </p>
          {showRating && (
            <div className="flex justify-center items-start p-0.5">
              <p className="text-xs font-normal text-gray-900 flex items-center gap-0.5">
                {rating}
                <Icon
                  icon="star"
                  className="w-[1.5rem] h-[1.5rem] text-yellow-500"
                />
              </p>
            </div>
          )}
        </div>
        {showDescription && (
          <p className="line-clamp-3 text-xs font-[500] text-gray-900">
            {description}
          </p>
        )}

        {showAuthor && (
          <p className="line-clamp-1 text-xs uppercase font-[400] text-gray-950 mt-auto">
            {author}
          </p>
        )}
      </div>
    </Card>
  );
};

CourseCard.propTypes = {
  id: PropTypes.string,
  imageURL: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  rating: PropTypes.string,
  showAuthor: PropTypes.bool,
  showDescription: PropTypes.bool,
  showRating: PropTypes.bool,
  redirecTo: PropTypes.string,
  showDropOption: PropTypes.bool,
  onDropCourse: PropTypes.func,
};
