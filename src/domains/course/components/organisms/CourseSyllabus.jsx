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

  function addModule(position) {
    dispatch({ type: "ADD_MODULE", postion: position });
  }

  return (
    <ModulesContext.Provider value={{ modules, dispatch }}>
      <div className="flex flex-col mx-5">
        <Title className="border-b-1 my-3" color="black">
          Syllabus
        </Title>
        <SyllabusInfo className="self-center" />

        {modules.map((module, id) => (
          <>
            <Button
              onClick={() => addModule(id)}
              radius="small"
              className={"w-40 my-4 text-center self-start"}
              variant="bordered"
            >
              <div className="flex w-full items-center">
                <Icon icon={"plus"} />
                <p className="mx-auto">add module</p>
              </div>
            </Button>
            <CourseModule key={id} title={module.title} modulePosition={id} />
          </>
        ))}
        <Button
          onClick={() => addModule(modules.length)}
          radius="small"
          className={"w-40 my-4 text-center self-start"}
          variant="bordered"
        >
          <div className="flex w-full items-center">
            <Icon icon={"plus"} />
            <p className="mx-auto">add module</p>
          </div>
        </Button>
        <Button radius="small" className={"self-center w-40 my-4 text-center"}>
          <p className="w-full">Save all</p>
        </Button>
      </div>
    </ModulesContext.Provider>
  );
}
