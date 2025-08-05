/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import { FilterChip } from "../atoms/FilterChip";
import { Button } from "../../../../shared/components/atoms/Button";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";

export const Filters = ({
  activeFilters = ["language", "rating", "category", "subcategory"],
}) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState([]);

  const handleSelectFilter = (type, filter) => {
    setFilters((prev) => {
      const existingIndex = prev.findIndex((f) => f.type === type);

      if (existingIndex === -1) {
        return [...prev, { type, filter }];
      }

      if (prev[existingIndex].filter !== filter) {
        const updated = [...prev];
        updated[existingIndex] = { type, filter };
        return updated;
      }

      return prev;
    });

    console.log(filters);
  };

  const handleRemoveFilter = (filter) => {
    setFilters((prev) => prev.filter((f) => f.filter !== filter));
  };

  const handleClearFilters = () => {
    setFilters([]);
    console.log("Filters cleared");
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const options = {
    language: [
      { value: "english", label: "English" },
      { value: "spanish", label: "Spanish" },
      { value: "french", label: "French" },
      { value: "german", label: "German" },
      { value: "italian", label: "Italian" },
      { value: "portuguese", label: "Portuguese" },
      { value: "japanese", label: "Japanese" },
    ],
    rating: [
      { value: "all", label: "All" },
      { value: 5, label: "5" },
      { value: 4, label: "4" },
      { value: 3, label: "3" },
      { value: 2, label: "2" },
      { value: 1, label: "1" },
    ],
    subcategory: [
      { value: "all", label: "All" },
      { value: "artificial-intelligence", label: "Artificial Intelligence" },
      { value: "cybersecurity", label: "Cybersecurity" },
      { value: "cloud-computing", label: "Cloud Computing" },
      { value: "internet-of-things", label: "Internet of Things (IoT)" },
      { value: "blockchain", label: "Blockchain" },
      { value: "deep-learning", label: "Deep Learning" },
      { value: "computer-vision", label: "Computer Vision" },
    ],
    category: [
      { value: "all", label: "All" },
      { value: "technology", label: "Technology" },
      { value: "programming", label: "Programming" },
      { value: "design", label: "Design" },
      { value: "business", label: "Business" },
      { value: "finance", label: "Finance" },
      { value: "photography", label: "Photography" },
    ],
  };

  const sortOptions = [
    { value: "most", label: "Most Popular" },
    { value: "new", label: "Newest first" },
    { value: "old", label: "Oldest First" },
    { value: "asc", label: "Name A → Z" },
    { value: "desc", label: "Name Z → A" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 md:gap-5 flex-wrap">
          {activeFilters &&
            activeFilters.map(function (filter) {
              return (
                <Dropdown
                  key={filter}
                  label={filter}
                  variant="bordered"
                  radius="small"
                  onSelect={(e) => handleSelectFilter(filter, e.value)}
                  options={options[filter]}
                  color="secondary"
                ></Dropdown>
              );
            })}
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap md:h-10">
          {filters.length > 0 &&
            filters.map(function (filter) {
              return (
                <FilterChip
                  key={filter.type}
                  label={filter.filter}
                  onClick={() => handleRemoveFilter(filter.filter)}
                />
              );
            })}

          {filters.length > 0 && (
            <Button variant="ghost" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-[3em] flex-wrap">
        <p className="text-gray-400">5000+ results</p>
        <div className="flex items-center">
          <p className="mr-2 text-gray-400">Order by:</p>
          <Dropdown
            label={sortOptions[3].label}
            variant="bordered"
            radius="small"
            onSelect={(e) => handleSort(e.value)}
            options={sortOptions}
            color="secondary"
            className="bg-gray-200 border-gray-200 outline-gray-200 w-32 min-w-32"
          ></Dropdown>
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string),
};
