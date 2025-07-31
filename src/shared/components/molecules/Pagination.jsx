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
}) => {
  const totalPages = Math.ceil(total / size);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => selectedFn(page)}
          variant={page === currentPage ? "solid" : "ghost"}
          className="px-3 py-1 text-sm"
        >
          {page}
        </Button>
      ))}

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
};
