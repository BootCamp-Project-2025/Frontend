import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import SyllabusInfo from "../molecules/SyllabusInfo";
import CourseModule from "./CourseModule";

export default function CourseSyllabus() {
  return (
    <div className="flex flex-col">
      <Title className="border-b-1" color="black">
        Syllabus
      </Title>
      <SyllabusInfo className="self-center" />
      <Button radius="small" className={"w-fit self-end"} variant="bordered">
        add module
      </Button>
      <CourseModule />
    </div>
  );
}
