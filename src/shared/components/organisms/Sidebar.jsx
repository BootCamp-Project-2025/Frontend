import { useState } from "react";
import { Icon } from "../atoms/Icon";
import { Title } from "../atoms/Title";
import { Button } from "../atoms/Button";
import { NavLink, Link } from "react-router-dom";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);

  const handleClick = (open) => {
    setIsOpen(open);
  };

  const handleCoruses = () => {
    setCourseOpen(true);
    setIsOpen(true);
  };

  const handleOpenAndCourse = () => {
    setCourseOpen(false);
    setIsOpen(true);
  };

  return (
    <aside
      className={`bg-white h-screen shadow-md border-r border-gray-300 flex flex-col justify-between transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div>
        <div className="p-4 flex justify-center">
          {!isOpen && (
            <button
              onClick={(e) => handleClick(true)}
              className="cursor-pointer"
            >
              <Icon icon={"menu"}></Icon>
            </button>
          )}
          {isOpen && (
            <button
              onClick={(e) => handleClick(false)}
              className={
                "flex ml-auto p-2 items-center justify-center bg-gray-200 hover:bg-gray-100 rounded-full cursor-pointer"
              }
            >
              <Icon icon={"close"}></Icon>
            </button>
          )}
        </div>
        <ul className="mt-4">
          <li className={`${!isOpen ? "flex justify-center" : ""}`}>
            <Link
              to="/"
              className={`py-2 px-4 w-full flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-gray-100 text-sm transition`}
              onClick={(e) => handleClick(true)}
            >
              <Icon icon={"home"}></Icon>
              {isOpen && (
                <Title size={"md"} color={"default"} className={"ml-3"}>
                  Home
                </Title>
              )}
            </Link>
          </li>
          <li className={`${!isOpen ? "flex justify-center" : ""}`}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `py-2 px-4 w-full bg-gray-100 flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-gray-100 text-sm transition`
                  : `py-2 px-4 w-full flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-gray-100 text-sm transition`
              }
              to=""
              onClick={handleOpenAndCourse}
            >
              <Icon icon={"dashboard"}></Icon>
              {isOpen && (
                <Title size={"md"} color={"default"} className={"ml-3"}>
                  Dashboard
                </Title>
              )}
            </NavLink>
          </li>
          <li className={`${!isOpen ? "flex justify-center" : ""}`}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `py-2 px-4 w-full bg-gray-100 flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-gray-100 text-sm transition`
                  : `py-2 px-4 w-full flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-gray-100 text-sm transition`
              }
              to="profile"
              onClick={handleOpenAndCourse}
            >
              <Icon icon={"user"}></Icon>
              {isOpen && (
                <Title size={"md"} color={"default"} className={"ml-3"}>
                  Profile
                </Title>
              )}
            </NavLink>
          </li>
          <li className={`${!isOpen ? "flex justify-center" : ""}`}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `py-2 px-4 w-full bg-gray-100 flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-gray-100 text-sm transition`
                  : `py-2 px-4 w-full flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-gray-100 text-sm transition`
              }
              to="teacherProfile"
              onClick={handleOpenAndCourse}
            >
              <Icon icon={"teacher"}></Icon>
              {isOpen && (
                <Title size={"md"} color={"default"} className={"ml-3"}>
                  Teacher profile
                </Title>
              )}
            </NavLink>
          </li>
          <li className={`${!isOpen ? "flex justify-center" : ""}`}>
            <button
              onClick={handleCoruses}
              className={`flex items-center ${!isOpen ? "flex justify-center" : ""} py-2 px-4 w-full cursor-pointer 
              hover:bg-gray-100 text-sm transition ${courseOpen ? "bg-gray-100" : ""}`}
            >
              <Icon icon={"course"}></Icon>
              {isOpen && (
                <Title size={"md"} color={"default"} className={"ml-3"}>
                  My courses
                </Title>
              )}
            </button>
            {isOpen && courseOpen ? (
              <div className="bg-gray-100">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `py-2 px-4 w-full bg-gray-100 flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-blue-100 text-sm transition`
                      : `py-2 px-4 w-full flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-blue-100 text-sm transition`
                  }
                  to="courses/home"
                >
                  <Title size={"ms"} color={"default"} className={"ml-3"}>
                    Home page
                  </Title>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `py-2 px-4 w-full bg-blue-100 flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-blue-100 text-sm transition`
                      : `py-2 px-4 w-full flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-blue-100 text-sm transition`
                  }
                  to="courses/syllabus"
                >
                  <Title size={"ms"} color={"default"} className={"ml-3"}>
                    Syllabus
                  </Title>
                </NavLink>
              </div>
            ) : null}
          </li>
          <li className={`${!isOpen ? "flex justify-center" : ""}`}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `py-2 px-4 w-full bg-gray-100 flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-gray-100 text-sm transition`
                  : `py-2 px-4 w-full flex items-center ${!isOpen ? "justify-center" : ""} hover:bg-gray-100 text-sm transition`
              }
              to="ligas/listar"
              onClick={handleOpenAndCourse}
            >
              <Icon icon={"message"}></Icon>
              {isOpen && (
                <Title size={"md"} color={"default"} className={"ml-3"}>
                  Chats
                </Title>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="p-4 flex justify-center">
        {!isOpen && (
          <button className="cursor-pointer" onClick={(e) => handleClick(true)}>
            <Icon icon={"logout"}></Icon>
          </button>
        )}
        {isOpen && (
          <Button
            color="secondary"
            radius="full"
            className={`${isOpen ? "flex ml-auto p-[.625em] w-full items-center justify-center" : ""}`}
          >
            <div className={"flex items-center justify-center"}>
              <Icon icon={"logout"}></Icon>
              <Title color={"default"} className={"ml-1 text-sm"}>
                {isOpen && "Log Out"}
              </Title>
            </div>
          </Button>
        )}
      </div>
    </aside>
  );
};
