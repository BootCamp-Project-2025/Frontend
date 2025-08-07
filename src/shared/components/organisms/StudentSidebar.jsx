import { useState } from "react";
import { Icon } from "../atoms/Icon";
import { SidebarRow } from "../molecules/SidebarRow";
import { Link } from "react-router-dom";
import { SidebarLogo } from "../molecules/SidebarLogo";
export const StudentSidebar = () => {
  const [open, setOpen] = useState(false);

  const handleOpenSidebar = () => {
    setOpen(true);
  };

  const handleCloseSidebar = () => {
    setOpen(false);
  };

  return (
    <aside
      onMouseEnter={handleOpenSidebar}
      onMouseLeave={handleCloseSidebar}
      className="w-[3.7rem] min-w-[3.7rem]"
    >
      <div className="relative h-full">
        <div className="absolute left-0 top-0 h-full z-[20] border-r border-gray-400">
          <div className="absolute top-0 left-0 h-full z-20 transition-all duration-[400ms] ease-[cubic-bezier(0.2,0,0.38,0.9)]">
            <nav
              className={`${
                open ? "w-52" : "w-[3.7rem]"
              } h-full flex flex-col  bg-white border-r border-gray-300 shadow-md shadow-gray-300 sticky top-0 max-h-screen overflow-y-auto overflow-x-hidden transition-all duration-300`}
            >
              <SidebarLogo open={open} route={"/student/dashboard"} />
              <SidebarRow
                name={"Dashboard"}
                route={"/student/dashboard"}
                icon={"analytics"}
              ></SidebarRow>

              <SidebarRow
                name={"Student Profile"}
                route={"/student/profile"}
                icon={"user"}
              ></SidebarRow>

              <SidebarRow
                name={"P2P Courses"}
                route={"/student/p2pcourses"}
                icon={"p2p"}
              ></SidebarRow>

              <SidebarRow
                name={"Courses"}
                route={"/student/courses"}
                icon={"courses"}
              ></SidebarRow>

              <SidebarRow
                name={"Requests"}
                route={"/student/my-requests"}
                icon={"assignment"}
              ></SidebarRow>

              <SidebarRow
                name={"Chats"}
                route={"/student/chats"}
                icon={"chat"}
              ></SidebarRow>

              <div className="p-4 flex justify-center">
                {!open && (
                  <Link to={"/"} className="cursor-pointer">
                    <Icon icon={"logout"}></Icon>
                  </Link>
                )}
                {open && (
                  <Link
                    to={"/"}
                    className={`${open ? "flex ml-auto p-[.625em] w-full items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-2xl" : ""}`}
                  >
                    <div className={"flex items-center  gap-2 justify-center"}>
                      <Icon icon={"logout"}></Icon>
                      {open && (
                        <span className="text-base text-gray-700 font-semibold text-nowrap">
                          Go Back Home
                        </span>
                      )}
                    </div>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
};
