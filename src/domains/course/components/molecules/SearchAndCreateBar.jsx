import { useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { SelectInput } from "../../../../shared/components/atoms/SelectInput";
import PropTypes from "prop-types";

function SearchAndCreateBar({ courses, onFiltered, onCreateCourse }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const applyFilterAndSort = (term, order) => {
    const filtered = courses.filter((c) =>
      c.name.toLowerCase().includes(term.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName < bName) return order === "asc" ? -1 : 1;
      if (aName > bName) return order === "asc" ? 1 : -1;
      return 0;
    });
    onFiltered(sorted);
  };

  const handleSearch = () => {
    applyFilterAndSort(searchTerm, sortOrder);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    applyFilterAndSort(searchTerm, order);
  };

  const sortOptions = [
    { value: "asc", label: "A → Z" },
    { value: "desc", label: "Z → A" },
  ];

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <TextInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder="Search courses…"
          className="flex-1 border border-gray-300 px-3 py-1.5 text-sm rounded-md"
        />
        <Button variant="ghost" onClick={handleSearch} className="p-2">
          <span className="material-symbols-outlined">search</span>
        </Button>
        <SelectInput
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          options={sortOptions}
          placeHolder="Sort"
          className="w-32"
        />
      </div>

      <Button
        onClick={onCreateCourse}
        color="primary"
        variant="solid"
        size="md"
        radius="medium"
      >
        <span className="material-symbols-outlined">add</span>
        <span>New Course</span>
      </Button>
    </div>
  );
}

SearchAndCreateBar.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  onFiltered: PropTypes.func.isRequired,
  onCreateCourse: PropTypes.func.isRequired,
};

export default SearchAndCreateBar;
