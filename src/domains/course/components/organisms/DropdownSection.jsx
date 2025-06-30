import PropTypes from "prop-types";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";
import "./DropdownSection.css";
import {
  educationCategories,
  educationSubCategories,
  languages,
} from "../../utils/CourseSelectData";
import { useState } from "react";

export default function DropdownSection({ course }) {
  const [subCategory, setSubCategory] = useState(
    educationSubCategories[course.category]
  );
  const handleSubCategory = (option) => {
    course.subCategory = option.label;
  };
  const handleLanguage = (option) => {
    course.language = option.label;
  };
  const handleCategory = (option) => {
    course.category = option.label;
    setSubCategory(educationSubCategories[option.label]);
  };
  return (
    <section
      style={{ flex: "0 0 30%" }}
      className="flex justify-between dropdownSection"
    >
      <Dropdown
        label={course.language !== "" ? course.language : "select a language"}
        variant="bordered"
        radius="small"
        options={languages}
        onSelect={handleLanguage}
      ></Dropdown>
      <Dropdown
        label={course.category !== "" ? course.category : "select a category"}
        variant="bordered"
        radius="small"
        options={educationCategories}
        onSelect={handleCategory}
      ></Dropdown>
      <Dropdown
        type="button"
        label={
          course.subCategory !== ""
            ? course.subCategory
            : "select a sub category"
        }
        variant="bordered"
        radius="small"
        options={subCategory}
        onSelect={handleSubCategory}
      ></Dropdown>
    </section>
  );
}

DropdownSection.propTypes = {
  course: PropTypes.object,
};
