import { Title } from "../../../../shared/components/atoms/Title";
import { Searcher } from "../../../../shared/components/molecules/Searcher";
import { CourseCardList } from "../organism/CourseCardList";
import { Filters } from "../organism/Filters";

export const CoursesPage = () => {
  return (
    <main>
      <div className="flex flex-col gap-10">
        <Title className="text-gray-900 text-center" size="lg">
          Explore Our Courses
        </Title>

        <Searcher></Searcher>

        <Filters></Filters>

        <CourseCardList></CourseCardList>
      </div>
    </main>
  );
};
