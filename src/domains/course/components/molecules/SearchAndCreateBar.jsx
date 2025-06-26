import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../../../shared/components/atoms/Button";
import { SelectInput } from "../../../../shared/components/atoms/SelectInput";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import PropTypes from "prop-types";

function SearchAndCreateBar({
  courses,
  onFiltered,
  filterFieldOptions = [
    { value: "name", label: "Name" },
    { value: "description", label: "Description" },
  ],
  onCreate,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [field, setField] = useState("name");

  useEffect(() => {
    const filtered = courses.filter((c) =>
      String(c[field]).toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFiltered(filtered);
  }, [searchTerm, field, courses, onFiltered]);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <TextInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search by ${field}…`}
        />

        <SelectInput
          value={field}
          onChange={(e) => setField(e.target.value)}
          options={filterFieldOptions}
          placeHolder="Filter by"
        />
      </div>

      <Button onClick={onCreate}>
        <NavLink to="/course-select" end className="flex items-center gap-1">
          <span className="material-symbols-outlined">add</span>
          New Course
        </NavLink>
      </Button>
    </div>
  );
}

export default SearchAndCreateBar;

SearchAndCreateBar.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,

  onFiltered: PropTypes.func.isRequired,

  filterFieldOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),

  onCreate: PropTypes.func.isRequired,
};

SearchAndCreateBar.defaultProps = {
  filterFieldOptions: [
    { value: "name", label: "Name" },
    { value: "description", label: "Description" },
  ],
};
