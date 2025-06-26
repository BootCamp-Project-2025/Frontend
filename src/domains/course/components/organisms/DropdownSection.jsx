import { Dropdown } from "../../../../shared/components/atoms/Dropdown";
import "./DropdownSection.css";

export default function DropdownSection() {
  const options = [
    { label: "English", value: "1" },
    { label: "Spanish", value: "2" },
    { label: "French", value: "3" },
  ];

  const handleSelect = (option) => {
    console.log("Selected:", option);
  };
  return (
    <section
      style={{ flex: "0 0 30%" }}
      className="flex justify-between dropdownSection"
    >
      <Dropdown
        variant="bordered"
        radius="small"
        options={options}
        onSelect={handleSelect}
      >
        Default
      </Dropdown>
      <Dropdown
        variant="bordered"
        radius="small"
        options={options}
        onSelect={handleSelect}
      >
        Default
      </Dropdown>
      <Dropdown
        variant="bordered"
        radius="small"
        options={options}
        onSelect={handleSelect}
      >
        Default
      </Dropdown>
    </section>
  );
}
