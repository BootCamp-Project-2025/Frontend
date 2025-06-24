import { CategoryCardsList } from "./shared/components/organisms/CategoryCardsList";
import { CourseCardList } from "./shared/components/organisms/CourseCardList";
import { Title } from "./shared/components/atoms/Title";
import { TeacherCardList } from "./shared/components/organisms/teacherCardList";
import { PageBanner } from "./shared/components/molecules/PageBanner";

function App() {
  return (
    <>
      <PageBanner></PageBanner>
      <main>
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
            Most Rated Teachers
          </Title>
          <TeacherCardList></TeacherCardList>
        </div>
      </main>
    </>
  );
}

export default App;
