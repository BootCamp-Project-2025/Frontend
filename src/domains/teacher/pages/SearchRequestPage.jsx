import { Searcher } from "../../../shared/components/molecules/Searcher";
import { Filters } from "../../core/componentes/organism/Filters";
import { Pagination } from "../../../shared/components/molecules/Pagination";
import RequestCard from "../components/molecules/RequestCard";
import { usePagination } from "../../../shared/hooks/usePagination";
import { Loading } from "../../../shared/components/molecules/Loading";
import { Title } from "../../../shared/components/atoms/Title";

export const SearchRequestPage = () => {
  const activeFilters = ["category", "subcategory", "language"];

  const {
    data,
    total,
    page,
    size,
    query,
    isLoading,
    nextPage,
    previousPage,
    setFilters,
    removeFilter,
    setSearchQuery,
    setPageIndex,
  } = usePagination({
    url: "/requests/search",
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

  const requestSortOptions = [
    { value: "createdAt:desc", label: "Newest first" },
    { value: "createdAt:asc", label: "Oldest First" },
    { value: "title.keyword:asc", label: "Name A → Z" },
    { value: "title.keyword:desc", label: "Name Z → A" },
  ];

  return (
    <div className="wrapper flex flex-col gap-5 justify-center">
      <Title className="border-b-1" color="default">
        Search Request
      </Title>
      <Searcher
        placeholder="Search requests just for you"
        query={query}
        setSearchQuery={setSearchQuery}
      />
      <Filters
        total={total}
        activeFilters={activeFilters}
        setFilters={setFilters}
        sortOptions={requestSortOptions}
        removeFilter={removeFilter}
      />

      {!isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
          <Pagination
            backwardFn={handleBackward}
            forwardFn={handleForward}
            selectedFn={handleSelected}
            currentPage={page}
            size={size}
            total={total}
          />
        </>
      )}
      {isLoading && <Loading />}
    </div>
  );
};
