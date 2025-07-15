import { useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { FilterChip } from "../atoms/FilterChip";

const RequestSearchBar = () => {
  const [filters, setFilters] = useState([]);

  const onSelectFilter = (filter) => {
    setFilters((prev) => (prev.includes(filter) ? prev : [...prev, filter]));
    console.log(filters);
  };

  const onRemoveFilter = (filter) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
    console.log(filters);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <TextInput
          type="text"
          placeholder="Search requests..."
          className="flex-grow p-2 border border-gray-300 rounded outline-0"
        />
        <Button>
          <Icon icon={"search"} className="text-white" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Dropdown
          radius="small"
          size="small"
          variant="bordered"
          className="border-default-700 text-default-700"
          label="Category"
          options={[
            {
              label: "Science",
              value: "science",
            },
          ]}
          onSelect={onSelectFilter}
        ></Dropdown>
        <Dropdown
          radius="small"
          size="small"
          variant="bordered"
          className="border-default-700 text-default-700"
          label="Subcategory"
        ></Dropdown>
        <Dropdown
          radius="small"
          size="small"
          variant="bordered"
          className="border-default-700 text-default-700"
          label="Language"
        ></Dropdown>
      </div>

      <div>
        {filters.length > 0 &&
          filters.map((filter) => (
            <FilterChip
              key={filter.value}
              label={filter.label}
              onClick={() => onRemoveFilter(filter)}
            />
          ))}
      </div>
    </div>
  );
};

export default RequestSearchBar;
