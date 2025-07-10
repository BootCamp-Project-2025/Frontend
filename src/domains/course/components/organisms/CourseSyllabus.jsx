import { useEffect, useReducer } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Title } from "../../../../shared/components/atoms/Title";
import SyllabusInfo from "../molecules/SyllabusInfo";
import CourseModule from "./CourseModule";
import { moduleReducer } from "../../utils/ModuleReducer";
import { ApiGet } from "../../api/ApiGet";
import { useParams } from "react-router-dom";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

export default function CourseSyllabus() {
  const { courseId } = useParams();
  const { showToast } = useToastContext();
  useEffect(() => {
    const loadData = async () => {
      const { data } = await ApiGet(`courses/${courseId}/modules`);
      dispatch({
        type: "SET",
        payload: data.data,
      });
    };
    loadData();
  }, []);

  const [modules, dispatch] = useReducer(moduleReducer, []);

  function addModule(position) {
    dispatch({
      type: "ADD_MODULE",
      postion: position,
      courseId: courseId,
    });
  }

  function publish() {
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      //check if a module hasnt been saved and scrolls to its position
      if (module.edited === true || module.new === true) {
        showToast("there are modules without saving", "warning");
        document
          .getElementById(`module-${i}`)
          .scrollIntoView({ behavior: "smooth" });
        return;
      }
      //check if a lesson hasnt been saved and scrolls to its position
      for (let j = 0; j < module.lessons.length; j++) {
        const lesson = module.lessons[j];
        if (lesson.edited === true || lesson.new === true) {
          showToast("there are lessons without saving", "warning");
          document
            .getElementById(`module-${i}-lesson-${j}`)
            .scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
  }

  return (
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
            className={
              "opacity-0 hover:opacity-100 transition-opacity w-40 my-4 text-center self-start"
            }
            variant="bordered"
          >
            <div className="flex w-full items-center">
              <Icon icon={"plus"} />
              <p className="mx-auto">Add module</p>
            </div>
          </Button>
          <CourseModule
            modules={modules}
            dispatch={dispatch}
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
        <p className="w-full">Save</p>
      </Button>
    </div>
  );
}
