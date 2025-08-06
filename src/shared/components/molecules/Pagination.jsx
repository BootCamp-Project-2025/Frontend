import PropTypes from "prop-types";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

export const Pagination = ({
  forwardFn,
  backwardFn,
  selectedFn,
  total,
  size,
  currentPage,
  maxVisiblePages = 5,
}) => {
  const totalPages = Math.ceil(total / size);

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    pages.push(1);

    let startPage, endPage;

    if (currentPage <= halfVisible + 1) {
      startPage = 2;
      endPage = Math.min(maxVisiblePages - 1, totalPages - 1);
    } else if (currentPage >= totalPages - halfVisible) {
      startPage = Math.max(totalPages - maxVisiblePages + 2, 2);
      endPage = totalPages - 1;
    } else {
      startPage = currentPage - halfVisible + 1;
      endPage = currentPage + halfVisible - 1;
    }
    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center mt-5 gap-2">
      {currentPage > 1 && (
        <Button
          onClick={backwardFn}
          variant="bordered"
          radius="full"
          aria-label="Previous Page"
        >
          <Icon icon="arrowForwardBlue" className="h-3 w-3" />
        </Button>
      )}

      {visiblePages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-1 text-sm text-gray-500"
            >
              ...
            </span>
          );
        }

        const handleSelect = () => selectedFn(page);
        return (
          <Button
            key={page}
            onClick={handleSelect}
            variant={page === currentPage ? "solid" : "ghost"}
            className="px-3 py-1 text-sm min-w-[2.5rem]"
          >
            {page}
          </Button>
        );
      })}

      {currentPage < totalPages && (
        <Button
          onClick={forwardFn}
          variant="bordered"
          radius="full"
          aria-label="Next Page"
        >
          <Icon icon="arrowForwardBlue" className="h-3 w-3 rotate-180" />
        </Button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  forwardFn: PropTypes.func.isRequired,
  backwardFn: PropTypes.func.isRequired,
  selectedFn: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  maxVisiblePages: PropTypes.number,
};
