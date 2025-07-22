import React from "react";
import { PageBanner } from "../../../../shared/components/molecules/PageBanner";
import { Title } from "../../../../shared/components/atoms/Title";
import { CourseCardList } from "../organism/CourseCardList";
import { TeacherCardList } from "../organism/TeacherCardList";
import { CategoryCardsList } from "../organism/CategoryCardsList";

export const HomePage = () => {
  return (
    <>
      <PageBanner></PageBanner>
      <main className="max-w-[90rem] px-8 py-4 mx-auto">
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
};
