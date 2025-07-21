import { useCallback, useEffect, useReducer } from "react";
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
  const [modules, dispatch] = useReducer(moduleReducer, []);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await ApiGet(`courses/${courseId}/modules`);
      dispatch({
        type: "SET",
        payload: data.data,
      });
    };
    loadData();
  }, [courseId]);

  const addModule = useCallback(
    (position) => {
      dispatch({
        type: "ADD_MODULE",
        postion: position,
        courseId: courseId,
      });
    },
    [courseId]
  );

  const scrollToSectionInSyllabus = useCallback((section) => {
    document
      .getElementById(section)
      .scrollIntoView({ block: "start", behavior: "instant" });
    window.scrollBy({ top: -100, behavior: "instant" });
  }, []);

  const checkIfLessonHasChanges = useCallback(
    (module, moduleIndex) => {
      for (
        let lessonIndex = 0;
        lessonIndex < module.lessons.length;
        lessonIndex++
      ) {
        const lesson = module.lessons[lessonIndex];
        if (lesson.isEdited || lesson.isNew) {
          showToast("there are lessons without saving", "warning");
          scrollToSectionInSyllabus(
            `module-${moduleIndex}-lesson-${lessonIndex}`
          );
          return;
        }
      }
    },
    [scrollToSectionInSyllabus, showToast]
  );

  const checkIfModuleHasChanges = useCallback(() => {
    for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
      const module = modules[moduleIndex];
      if (module.isEdited || module.isNew) {
        showToast("there are modules without saving", "warning");
        scrollToSectionInSyllabus(`module-${moduleIndex}`);
        return;
      }
      checkIfLessonHasChanges(module, moduleIndex);
    }
  }, [checkIfLessonHasChanges, scrollToSectionInSyllabus, modules, showToast]);

  const save = useCallback(() => {
    checkIfModuleHasChanges();
  }, [checkIfModuleHasChanges]);

  return (
    <div className="flex flex-col mx-5">
      <Title className="border-b-1 my-3" color="black">
        Syllabus
      </Title>
      <SyllabusInfo className="self-center hidden md:flex" />

      {modules.map((module, index) => (
        <div key={`add-module-${module.position}`}>
          <Button
            data-testid={`addModule-${index}`}
            onClick={() => addModule(index)}
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
            id={`module-${index}`}
            key={`module-${module.position}`}
            title={module.title}
            moduleIndex={index}
          />
        </div>
      ))}
      <Button
        data-testid="addModuleEnd"
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
        data-testid="saveButton"
        onClick={save}
        radius="small"
        className={"self-center w-40 my-4 text-center"}
      >
        <p className="w-full">Save</p>
      </Button>
    </div>
  );
}
