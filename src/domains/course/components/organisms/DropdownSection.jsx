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
    <section className="  dropdownSection ">
      <Dropdown
        label={course.language !== "" ? course.language : "Select a language"}
        variant="bordered"
        radius="small"
        options={languages}
        onSelect={handleLanguage}
        color="secondary"
      ></Dropdown>
      <Dropdown
        label={course.category !== "" ? course.category : "Select a category"}
        variant="bordered"
        radius="small"
        options={educationCategories}
        onSelect={handleCategory}
        color="secondary"
      ></Dropdown>
      <Dropdown
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
      ></Dropdown>
    </section>
  );
}

DropdownSection.propTypes = {
  course: PropTypes.object,
};
