import { useEffect, useReducer } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Title } from "../../../../shared/components/atoms/Title";
import { ModulesContext } from "../../customHooks/ModuleContext";
import SyllabusInfo from "../molecules/SyllabusInfo";
import CourseModule from "./CourseModule";
import { moduleReducer } from "../../utils/ModuleReducer";
import { ApiGet } from "../../api/ApiGet";

export default function CourseSyllabus() {
  useEffect(() => {
    const loadData = async () => {
      const { responseData } = await ApiGet(
        "courses/253c3ed5-53ba-4d61-95b5-6dfca64e724d/modules"
      );
      console.log(responseData);
      dispatch({
        type: "SET",
        payload: responseData.data,
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
          <div key={`add-module-${id}`}>
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
            <CourseModule title={module.title} modulePosition={id} />
          </div>
        ))}
        <Button
          onClick={() =>
            dispatch({ type: "ADD_MODULE", postion: modules.length })
          }
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
