import { useEffect, useReducer } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Title } from "../../../../shared/components/atoms/Title";
import { ModulesContext } from "../../customHooks/ModuleContext";
import SyllabusInfo from "../molecules/SyllabusInfo";
import CourseModule from "./CourseModule";
import { moduleReducer } from "../../utils/ModuleReducer";

export default function CourseSyllabus() {
  useEffect(() => {
    const loadData = () => {
      dispatch({
        type: "SET",
        payload: [
          { id: 1, title: "introduction", lessons: [] },
          { id: 4, title: "final thoughts", lessons: [] },
        ],
      });
    };
    loadData();
  }, []);

  const [modules, dispatch] = useReducer(moduleReducer, []);

  function addModule() {
    dispatch({ type: "ADD_MODULE", postion: modules.length });
  }

  return (
    <ModulesContext.Provider value={{ modules, dispatch }}>
      <div className="flex flex-col mx-5">
        <Title className="border-b-1 my-3" color="black">
          Syllabus
        </Title>
        <SyllabusInfo className="self-center" />
        <Button
          onClick={addModule}
          radius="small"
          className={"w-40 my-4 text-center self-end"}
          variant="bordered"
        >
          <div className="flex w-full items-center">
            <Icon icon={"plus"} />
            <p className="mx-auto">add module</p>
          </div>
        </Button>
        <div className="px-20">
          {modules.map((module, id) => (
            <CourseModule key={id} title={module.title} modulePosition={id} />
          ))}
        </div>
        <Button radius="small" className={"self-center w-40 my-4 text-center"}>
          <p className="w-full">Save all</p>
        </Button>
      </div>
    </ModulesContext.Provider>
  );
}
