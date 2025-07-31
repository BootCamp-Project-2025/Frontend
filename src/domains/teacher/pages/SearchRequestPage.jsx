import { Searcher } from "../../../shared/components/molecules/Searcher";
import { Filters } from "../../core/componentes/organism/Filters";
import { Pagination } from "../../../shared/components/molecules/Pagination";
import RequestCard from "../components/molecules/RequestCard";
import { usePagination } from "../../../shared/hooks/usePagination";

export const SearchRequestPage = () => {
  const activeFilters = ["category", "subcategory", "language"];

  const {
    data,
    total,
    page,
    size,
    query,
    nextPage,
    previousPage,
    setFilters,
    setSearchQuery,
  } = usePagination({
    url: "/requests/search",
  });

  const handleBackward = () => previousPage();
  const handleForward = () => nextPage();
  const handleSelected = () => {};

  return (
    <div className="p-12 flex flex-col gap-2 justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Students requests</h1>
      <Searcher
        placeholder="Search requests just for you"
        query={query}
        setSearchQuery={setSearchQuery}
      />
      <Filters
        total={total}
        activeFilters={activeFilters}
        setFilters={setFilters}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
    </div>
  );
};
