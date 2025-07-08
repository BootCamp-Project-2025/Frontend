import { useEffect, useReducer } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Title } from "../../../../shared/components/atoms/Title";
import { ModulesContext } from "../../customHooks/ModuleContext";
import SyllabusInfo from "../molecules/SyllabusInfo";
import CourseModule from "./CourseModule";
import { moduleReducer } from "../../utils/ModuleReducer";
import { ApiGet } from "../../api/ApiGet";
import { useSearchParams } from "react-router-dom";

export default function CourseSyllabus() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const loadData = async () => {
      const { responseData } = await ApiGet(
        `courses/${searchParams.get("course")}/modules`
      );
      dispatch({
        type: "SET",
        payload: responseData.data,
      });
    };
    loadData();
  }, []);

  const [modules, dispatch] = useReducer(moduleReducer, []);

  function addModule(position) {
    dispatch({
      type: "ADD_MODULE",
      postion: position,
      courseId: searchParams.get("course"),
    });
  }

  function publish() {
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      if (module.edited === true || module.new === true) {
        alert("there are modules without saving");
        document.getElementById(`module-${i}`).scrollIntoView();
        window.scrollBy({ top: -100 });
        return;
      }
      for (let j = 0; j < module.lessons.length; j++) {
        const lesson = module.lessons[j];
        if (lesson.edited === true || lesson.new === true) {
          alert("there are lessons without saving");
          document.getElementById(`module-${i}-lesson-${j}`).scrollIntoView();
          window.scrollBy({ top: -100 });
          return;
        }
      }
    }
  }

  return (
    <ModulesContext.Provider value={{ modules, dispatch }}>
      <div className="flex flex-col mx-5">
        <Title className="border-b-1 my-3" color="black">
          Syllabus
        </Title>
        <SyllabusInfo className="self-center hidden md:flex" />

        {modules.map((module, id) => (
          <div key={`add-module-${id}`}>
            <Button
              onClick={() => addModule(id)}
              radius="small"
              className={"w-40 my-4 text-center self-start"}
              variant="bordered"
            >
              <div className="flex w-full items-center">
                <Icon icon={"plus"} />
                <p className="mx-auto">Add module</p>
              </div>
            </Button>
            <CourseModule
              id={`module-${id}`}
              key={`module-${id}`}
              title={module.title}
              modulePosition={id}
            />
          </div>
        ))}
        <Button
          onClick={() => addModule(modules.length)}
          radius="small"
          className={"w-40 my-4 text-center self-start"}
          variant="bordered"
        >
          <div className="flex w-full items-center">
            <Icon icon={"plus"} />
            <p className="mx-auto">Add module</p>
          </div>
        </Button>
        <Button
          onClick={publish}
          radius="small"
          className={"self-center w-40 my-4 text-center"}
        >
          <p className="w-full">Publish</p>
        </Button>
      </div>
    </ModulesContext.Provider>
  );
}
