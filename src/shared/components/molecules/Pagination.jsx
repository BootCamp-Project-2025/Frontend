import PropTypes from "prop-types";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

export const Pagination = ({
  forwardFn,
  backwardFn,
  selectedFn,
  indexedDB,
  page,
}) => {
  return (
    <div className="flex items-center justify-center mt-5">
      <Button
        onClick={backwardFn}
        variant="bordered"
        radius="full"
        className={"mr-3"}
      >
        <Icon
          icon={"arrowForwardBlue"}
          className="h-[0.75rem] w-[0.75rem]"
        ></Icon>
      </Button>
      {indexedDB.map((row, idx) => (
        <Button
          key={idx}
          onClick={() => selectedFn(row)}
          variant="ghost"
          className={
            page == row
              ? "ring-2 ring-blue-700 bg-[color:var(--color-primary-700)]"
              : ""
          }
        >
          {row}
        </Button>
      ))}
      <Button
        onClick={forwardFn}
        variant="bordered"
        radius="full"
        className={"ml-3"}
      >
        <Icon
          icon={"arrowForwardBlue"}
          className="h-[0.75rem] w-[0.75rem] rotate-[180deg]"
        ></Icon>
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  forwardFn: PropTypes.func,
  backwardFn: PropTypes.func,
  selectedFn: PropTypes.func,
  indexedDB: PropTypes.array,
};
