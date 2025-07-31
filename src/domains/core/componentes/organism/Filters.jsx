import { useEffect, useState } from "react";
import { SelectInput } from "../../../../shared/components/atoms/SelectInput";
import PropTypes from "prop-types";
import { FilterChip } from "../atoms/FilterChip";
import { Button } from "../../../../shared/components/atoms/Button";

export const Filters = ({
  total = 0,
  activeFilters = ["language", "rating", "category", "subcategory"],
  setFilters = () => {},
}) => {
  const [sortOrder, setSortOrder] = useState("rating:desc");
  const [filtersState, setFiltersState] = useState({});

  const handleSelectFilter = (type, value) => {
    setFiltersState((prev) => ({
      ...prev,
      [type]: value === "all" ? null : value,
    }));
  };

  const handleRemoveFilter = (type) => {
    setFiltersState((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  const handleClearFilters = () => {
    setFiltersState({});
    setSortOrder("rating:desc");
  };

  const handleSort = (value) => {
    const [sort, order] = value.split(":");
    setFiltersState((prev) => ({
      ...prev,
      sort,
      order,
    }));
    setSortOrder(value);
  };

  useEffect(() => {
    if (filtersState && Object.keys(filtersState).length > 0) {
      console.log("Setting filters:", filtersState);
      setFilters(filtersState);
    } else {
      console.log("Clearing filters");
      setFilters({
        category: null,
        subcategory: null,
        language: null,
        rating: null,
        order: null,
        sort: null,
      });
    }
  }, [filtersState, setFilters]);

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
    { value: "rating:desc", label: "Most Popular" },
    { value: "createdAt:desc", label: "Newest first" },
    { value: "createdAt:asc", label: "Oldest First" },
    { value: "title.keyword:asc", label: "Name A → Z" },
    { value: "title.keyword:desc", label: "Name Z → A" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 md:gap-5 flex-wrap">
          {activeFilters &&
            activeFilters.map((filter) => (
              <SelectInput
                key={filter}
                options={options[filter]}
                placeHolder={filter}
                className="rounded-md border-gray-300 capitalize font-semibold"
                value={filtersState[filter] || ""}
                onChange={(e) => handleSelectFilter(filter, e.target.value)}
              />
            ))}
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap md:h-10">
          {Object.entries(filtersState)
            .filter(([key]) => !["sort", "order"].includes(key))
            .map(([type, value]) => (
              <FilterChip
                key={type}
                label={`${type}: ${value}`}
                onClick={() => handleRemoveFilter(type)}
              />
            ))}

          {Object.keys(filtersState).length > 0 && (
            <Button variant="ghost" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-[3em] flex-wrap">
        <p className="text-gray-400">{total} results</p>
        <div className="flex items-center">
          <p className="mr-2 text-gray-400">Order by:</p>
          <SelectInput
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
            options={sortOptions}
            placeHolder="Sort"
            className="bg-gray-200 border-gray-200 outline-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  total: PropTypes.number,
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  setFilters: PropTypes.func,
};
