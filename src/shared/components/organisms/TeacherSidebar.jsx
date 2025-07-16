import { useEffect, useState } from "react";
import { SidebarRow } from "../molecules/SidebarRow";
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { SidebarLogo } from "../molecules/SidebarLogo";

export const TeacherSidebar = () => {
  const [open, setOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);

  const location = useLocation();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get("name");

  useEffect(() => {
    const isCourseRoute =
      location.pathname.includes("homePage") ||
      location.pathname.includes("syllabus");
    setCourseOpen(isCourseRoute);
  }, [location.pathname, courseId]);

  return (
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="w-[3.7rem] "
    >
      <div className="relative h-full">
        <div className="absolute left-0 top-0 h-full z-[20] border-r border-gray-400">
          <div className="absolute top-0 left-0 h-full z-20 transition-all duration-[400ms] ease-in-out">
            <nav
              className={`${
                open ? "w-52" : "w-[3.7rem]"
              } h-full flex flex-col  bg-white border-r border-gray-300 shadow-md shadow-gray-300 sticky top-0 max-h-screen overflow-y-auto overflow-x-hidden transition-all duration-300`}
            >
              <SidebarLogo open={open} route={"/teacher/dashboard"} />
              <SidebarRow
                name={"Dashboard"}
                route={"/teacher/dashboard"}
                icon={"analytics"}
              ></SidebarRow>

              <SidebarRow
                name={"Teacher Profile"}
                route={"/teacher/profile"}
                icon={"user"}
              ></SidebarRow>

              <SidebarRow
                name={"Courses"}
                route={"/teacher/courses"}
                icon={"courses"}
              ></SidebarRow>

              <div className="bg-gray-100">
                {open && courseOpen ? (
                  <>
                    <span className="border-l-primary-500 border-l-4 text-base text-gray-700 px-5 py-1 font-semibold line-clamp-2 w-52">
                      - {courseName ? courseName : "New course"}
                    </span>

                    <NavLink
                      to={`${courseId ? `courses/${courseId}/homePage?name=${courseName}` : "courses/homePage"}`}
                      className={({ isActive }) =>
                        `${isActive ? "bg-gray-300" : ""} border-l-primary-500 flex items-center gap-1 px-4 py-2  text-nowrap border-l-4 ${!isActive ? "hover:bg-gray-100" : ""}   `
                      }
                    >
                      <span className="text-base text-gray-700 px-5 py-1 font-normal">
                        Home page
                      </span>
                    </NavLink>

                    <NavLink
                      to={`${courseId ? `courses/${courseId}/syllabus?name=${courseName}` : "courses/syllabus"}`}
                      className={({ isActive }) =>
                        `${isActive ? "bg-gray-300" : ""} border-l-primary-500 flex items-center gap-1 px-4 py-2  text-nowrap border-l-4 ${!isActive ? "hover:bg-gray-100" : ""}   `
                      }
                    >
                      <span className="text-base text-gray-700 px-5 py-1 font-normal">
                        Syllabus
                      </span>
                    </NavLink>
                  </>
                ) : null}
              </div>

              <SidebarRow
                name={"Search Request"}
                route={"/teacher/search-requests"}
                icon={"search"}
              ></SidebarRow>

              <SidebarRow
                name={"Chats"}
                route={"/teacher/chats"}
                icon={"chat"}
              ></SidebarRow>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
};
