import { useEffect, useState } from "react";
import { SidebarRow } from "../molecules/SidebarRow";
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Title } from "../atoms/Title";

export const Sidebar = () => {
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
        <div className="absolute left-0 top-0 h-full z-[10] border-r border-gray-400">
          <div className="absolute top-0 left-0 h-full z-20 transition-all duration-[400ms] ease-[cubic-bezier(0.2,0,0.38,0.9)]">
            <nav
              className={`${
                open ? "w-52" : "w-[3.7rem]"
              } h-full flex flex-col  bg-white border-r border-gray-300 shadow-md shadow-gray-300 sticky top-0 max-h-screen overflow-y-auto overflow-x-hidden transition-all duration-300`}
            >
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

              {open && courseOpen ? (
                <div className="bg-gray-100">
                  <div className="p-2 ml-3">
                    <Title
                      size="ms"
                      color="default"
                      className={"line-clamp-2 cursor-default"}
                    >
                      {courseName ? courseName : "New course"}
                    </Title>
                  </div>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `py-2 px-4 w-full bg-blue-100 flex items-center ${!open ? "justify-center" : ""} hover:bg-blue-100 text-sm transition`
                        : `py-2 px-4 w-full flex items-center ${!open ? "justify-center" : ""} hover:bg-blue-100 text-sm transition`
                    }
                    to={`${courseId ? `courses/${courseId}/homePage?name=${courseName}` : "courses/homePage"}`}
                  >
                    <Title size={"ms"} color={"default"} className={"ml-5"}>
                      Home page
                    </Title>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `py-2 px-4 w-full bg-blue-100 flex items-center ${!open ? "justify-center" : ""} hover:bg-blue-100 text-sm transition`
                        : `py-2 px-4 w-full flex items-center ${!open ? "justify-center" : ""} hover:bg-blue-100 text-sm transition`
                    }
                    to={`${courseId ? `courses/${courseId}/syllabus?name=${courseName}` : "courses/syllabus"}`}
                  >
                    <Title size={"ms"} color={"default"} className={"ml-5"}>
                      Syllabus
                    </Title>
                  </NavLink>
                </div>
              ) : null}

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
