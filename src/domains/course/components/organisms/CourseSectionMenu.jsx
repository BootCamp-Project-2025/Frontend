import { useRef, useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import PropTypes from "prop-types";

export const CourseSectionMenu = ({
  searchCourses = () => {},
  onNewCourse = () => {},
}) => {
  const FILTER = [
    { label: "All Courses", value: "all" },
    { label: "Stactic Courses", value: "static" },
    { label: "P2P Courses", value: "p2p" },
  ];

  const SORT = [
    { label: "Name (A–Z)", value: "asc" },
    { label: "Name (Z–A)", value: "des" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];

  const search = useRef(null);
  const [sort, setSort] = useState(SORT[2].value);
  const [filter, setFilter] = useState(FILTER[0].value);

  const handleSearchInput = () => {
    console.log(search.current.value);
    searchCourses({ search: search.current.value, filter: filter, sort: sort });
  };

  const handleSortInput = (option) => {
    let newSort = option.value;
    setSort(newSort);
    searchCourses({
      search: search.current.value,
      filter: filter,
      sort: newSort,
    });
  };

  const handleFilterInput = (option) => {
    let newFilter = option.value;
    setFilter(newFilter);
    searchCourses({
      search: search.current.value,
      filter: newFilter,
      sort: sort,
    });
  };

  return (
    <div className="grid gap-4  lg:flex">
      <div className="flex gap-4 items-center w-full lg:w-[25rem]">
        <TextInput placeholder="Search your courses" ref={search}></TextInput>
        <Button
          variant="bordered"
          radius="medium"
          size="sm"
          onClick={handleSearchInput}
        >
          <span className="material-symbols-outlined">search</span>
        </Button>
      </div>
      <div className="flex gap-4 justify-start w-full">
        <Dropdown
          label={FILTER[0].label}
          variant="bordered"
          options={FILTER}
          className="w-40"
          onSelect={handleFilterInput}
        ></Dropdown>
        <Dropdown
          label={SORT[2].label}
          variant="bordered"
          options={SORT}
          className="w-40"
          onSelect={handleSortInput}
        ></Dropdown>
        <Button
          className="text-nowrap justify-self-end mr-0 ml-auto"
          radius="small"
          onClick={onNewCourse}
        >
          New Course
        </Button>
      </div>
    </div>
  );
};

CourseSectionMenu.propTypes = {
  searchCourses: PropTypes.func,
  onNewCourse: PropTypes.func,
};
