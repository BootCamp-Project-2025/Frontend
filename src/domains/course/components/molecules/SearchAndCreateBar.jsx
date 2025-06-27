import { useEffect, useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { SelectInput } from "../../../../shared/components/atoms/SelectInput";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import PropTypes from "prop-types";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../../../teacher/components/atoms/PopupFormLayout";
import CourseTypeSelection from "../../../teacher/components/molecules/CourseTypeSelection";

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
  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    const filtered = courses.filter((c) =>
      String(c[field]).toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFiltered(filtered);
  }, [searchTerm, field, courses, onFiltered]);

  const handleNewCourse = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "What type of course do you want to create?",
        children: <CourseTypeSelection closePopupType={closePopup} />,
        onClose: closePopup,
      },
      true
    );
  };

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

      <Button
        onClick={handleNewCourse}
        color="primary"
        variant="solid"
        size="md"
        radius="medium"
      >
        <span className="material-symbols-outlined">add</span>
        New Course
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
