import { Title } from "../../../../shared/components/atoms/Title";
import { Searcher } from "../../../../shared/components/molecules/Searcher";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { CourseCardList } from "../organism/CourseCardList";
import { Filters } from "../organism/Filters";
import { Loading } from "../../../../shared/components/molecules/Loading";

export const CoursesPage = () => {
  const activeFilters = ["category", "subcategory", "language"];

  const {
    data,
    total,
    page,
    size,
    query,
    isLoading,
    setSearchQuery,
    setFilters,
    nextPage,
    previousPage,
    setPageIndex,
  } = usePagination({
    url: "/courses/search",
  });

  function handleBackward() {
    previousPage();
  }

  function handleForward() {
    nextPage();
  }

  function handleSelected(page) {
    setPageIndex(page);
  }

  const courseSortOptions = [
    { value: "name.keyword:asc", label: "Name A → Z" },
    { value: "name.keyword:desc", label: "Name Z → A" },
    { value: "createdAt:desc", label: "Newest first" },
    { value: "createdAt:asc", label: "Oldest first" },
  ];

  return (
    <main>
      <div className="flex flex-col gap-10">
        <Title className="text-gray-900 text-center" size="lg">
          Explore Our Courses
        </Title>

        <Searcher
          placeholder="Find your favorite course"
          query={query}
          setSearchQuery={setSearchQuery}
        />

        <Filters
          total={total}
          activeFilters={activeFilters}
          setFilters={setFilters}
          sortOptions={courseSortOptions}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <CourseCardList
            data={data}
            page={page}
            size={size}
            total={total}
            backwardFn={handleBackward}
            forwardFn={handleForward}
            selectedFn={handleSelected}
          />
        )}
      </div>
    </main>
  );
};
