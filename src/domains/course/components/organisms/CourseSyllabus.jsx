import { useCallback, useEffect, useMemo, useReducer } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Title } from "../../../../shared/components/atoms/Title";
import SyllabusInfo from "../molecules/SyllabusInfo";
import CourseModule from "./CourseModule";
import { moduleReducer } from "../../utils/ModuleReducer";
import { ApiGet } from "../../api/ApiGet";
import { useParams } from "react-router-dom";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { CourseDetailsModule } from "../molecules/CourseDetailsModule";
import { UseGet } from "../../api/UseGet";
import { Alert } from "../../../../shared/components/molecules/Alert";
import { Loading } from "../../../../shared/components/molecules/Loading";

export default function CourseSyllabus() {
  const { courseId } = useParams();
  const { showToast } = useToastContext();
  const { responseData, loading, error } = UseGet("courses", courseId);
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
        courseId,
      });
    },
    [courseId]
  );

  const handlersAddModule = useMemo(
    () => modules.map((_, index) => () => addModule(index)),
    [modules, addModule]
  );

  const addModuleAtTheEnd = useCallback(() => {
    dispatch({
      type: "ADD_MODULE",
      postion: modules.length,
      courseId,
    });
  }, [courseId, modules.length]);

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
    <div className="flex flex-col w-full gap-2 max-w-[90rem] px-8 py-4 mx-auto">
      <Title className="border-b-1 my-3" color="black">
        Syllabus
      </Title>

      {!loading && !error && responseData?.data?.published && (
        <Alert
          type="info"
          title="This course has already been published"
          description="Editing is disabled because the course is published."
        />
      )}

      {loading && <Loading text="Loading course data"></Loading>}

      {!loading && error && (
        <Alert
          type="error"
          title="Data couldn't be loaded. Please try again later."
        ></Alert>
      )}

      {!loading && !error && responseData?.data?.published && (
        <div className="flex flex-col border border-gray-400 border-b-0">
          {modules.map((mod) => (
            <CourseDetailsModule key={mod.id} {...mod} />
          ))}
        </div>
      )}

      {!loading && !error && !responseData?.data?.published && (
        <>
          <SyllabusInfo className="self-center hidden md:flex" />

          {modules.map((module, index) => (
            <div key={`add-module-${module.position}`}>
              <Button
                data-testid={`addModule-${index}`}
                onClick={handlersAddModule[index]}
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
            onClick={addModuleAtTheEnd}
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
        </>
      )}
    </div>
  );
}
