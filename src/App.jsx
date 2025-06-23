import { Link } from "react-router-dom";
import { CategoryCardsList } from "./shared/components/organisms/CategoryCardsList";
import { CourseCardList } from "./shared/components/organisms/CourseCardList";
import { Title } from "./shared/components/atoms/Title";

function App() {
  return (
    <>
      <div className="flex flex-col gap-12">
        <Title className="text-gray-900" size="lg">
          Categories
        </Title>
        <CategoryCardsList></CategoryCardsList>

        <Title className="text-gray-900" size="lg">
          Popular Courses
        </Title>
        <CourseCardList></CourseCardList>

        <Title className="text-gray-900" size="lg">
          Most rated teachers
        </Title>
      </div>

      <p>Hello world</p>
      <div className="flex flex-col">
        <Link to="./courses" className="text-blue-700 ">
          courses
        </Link>
        <Link to="./health-check" className="text-blue-700 ">
          health-check
        </Link>
        <Link to="./course-select" className="text-blue-700 ">
          course-select
        </Link>
        <Link to="./teacher-profile" className="text-blue-700 ">
          teacher-profile
        </Link>
        <Link to="./button-gallery" className="text-blue-700 ">
          button-gallery
        </Link>
      </div>
    </>
  );
}

export default App;
