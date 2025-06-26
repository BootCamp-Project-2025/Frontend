import PropTypes from "prop-types";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";
import "./DropdownSection.css";

export default function DropdownSection({ course }) {
  const languages = [
    { label: "English", value: "1" },
    { label: "Spanish", value: "2" },
    { label: "French", value: "3" },
  ];
  const categories = [
    { label: "Math", value: "1" },
    { label: "Biology", value: "2" },
    { label: "History", value: "3" },
  ];
  const subCategories = [
    { label: "tech", value: "1" },
    { label: "modern", value: "2" },
    { label: "retro", value: "3" },
  ];

  const handleSubCategory = (option) => {
    course.subCategory = option.label;
  };
  const handleLanguage = (option) => {
    course.language = option.label;
  };
  const handleCategory = (option) => {
    course.category = option.label;
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
        options={categories}
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
        options={subCategories}
        onSelect={handleSubCategory}
      ></Dropdown>
    </section>
  );
}

DropdownSection.propTypes = {
  course: PropTypes.object,
};
