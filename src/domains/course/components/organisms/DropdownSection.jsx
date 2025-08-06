import PropTypes from "prop-types";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";
import "./DropdownSection.css";
import {
  educationCategories,
  educationSubCategories,
  languages,
} from "../../utils/CourseSelectData";
import { useState } from "react";

export default function DropdownSection({
  course,
  disabled = false,
  setCourse = () => {},
}) {
  const [subCategory, setSubCategory] = useState(
    educationSubCategories[course.category]
  );
  const handleSubCategory = (option) => {
    setCourse((prev) => ({ ...prev, subCategory: option.label }));
  };
  const handleLanguage = (option) => {
    setCourse((prev) => ({ ...prev, language: option.label }));
  };
  const handleCategory = (option) => {
    if (option.label != course.category) {
      setCourse((prev) => ({
        ...prev,
        category: option.label,
        subCategory: "",
      }));
      setSubCategory(educationSubCategories[option.label]);
    }
  };

  return (
    <section className="  dropdownSection ">
      <Dropdown
        label={course.language !== "" ? course.language : "Select a language"}
        variant="bordered"
        radius="small"
        options={languages}
        onSelect={handleLanguage}
        color="secondary"
        disabled={disabled}
      ></Dropdown>
      <Dropdown
        label={course.category !== "" ? course.category : "Select a category"}
        variant="bordered"
        radius="small"
        options={educationCategories}
        onSelect={handleCategory}
        color="secondary"
        disabled={disabled}
      ></Dropdown>
      <Dropdown
        key={course.category}
        type="button"
        label={
          course.subCategory !== ""
            ? course.subCategory
            : "Select a sub category"
        }
        variant="bordered"
        radius="small"
        options={subCategory}
        onSelect={handleSubCategory}
        color="secondary"
        disabled={disabled}
      ></Dropdown>
    </section>
  );
}

DropdownSection.propTypes = {
  course: PropTypes.object,
  disabled: PropTypes.bool,
  setCourse: PropTypes.func,
};
