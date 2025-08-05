import { useEffect, useRef, useState } from "react";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";
import PropTypes from "prop-types";
import { FilterChip } from "../atoms/FilterChip";
import { Button } from "../../../../shared/components/atoms/Button";
import {
  educationCategories,
  educationSubCategories,
  languages,
} from "../../../course/utils/CourseSelectData";

export const Filters = ({
  total = 0,
  activeFilters = ["language", "rating", "category", "subcategory"],
  setFilters = () => {},
  sortOptions = [],
  removeFilter = () => {},
}) => {
  const [filtersState, setFiltersState] = useState({});
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const dropdownRefs = useRef({});

  useEffect(() => {
    const cat = filtersState.category;
    if (cat) {
      const subs = educationSubCategories[cat] || [];
      setSubCategoryOptions(subs);
      setFiltersState((prev) => ({
        ...prev,
        subcategory: null,
      }));
      dropdownRefs.current["subcategory"]?.reset?.();
    } else {
      setSubCategoryOptions([]);
    }
  }, [filtersState.category]);

  useEffect(() => {
    if (Object.keys(filtersState).length > 0) {
      setFilters(filtersState);
    } else {
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

  const handleSelectFilter = (type, value) => {
    setFiltersState((prev) => ({
      ...prev,
      [type]: value === "all" ? null : (value.label ?? value),
    }));
  };

  const handleRemoveFilter = (type) => {
    setFiltersState((prev) => {
      const copy = { ...prev };
      delete copy[type];
      return copy;
    });
    dropdownRefs.current[type]?.reset?.();
    removeFilter(type);
  };

  const handleClearFilters = () => {
    setFiltersState({});

    Object.values(dropdownRefs.current).forEach((ref) => {
      if (ref && typeof ref.reset === "function") {
        ref.reset();
      }
    });
  };

  const handleSort = (option) => {
    const value = option.value;
    const [sort, order] = value.split(":");
    setFiltersState((prev) => ({
      ...prev,
      sort,
      order,
    }));
  };

  const options = {
    language: languages,
    rating: [
      { value: "all", label: "All" },
      { value: 5, label: "5" },
      { value: 4, label: "4" },
      { value: 3, label: "3" },
      { value: 2, label: "2" },
      { value: 1, label: "1" },
    ],
    category: educationCategories,
    subcategory: subCategoryOptions,
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 md:gap-5 flex-wrap">
          {activeFilters.map((filterType) => (
            <Dropdown
              key={filterType}
              ref={(el) => (dropdownRefs.current[filterType] = el)}
              options={options[filterType]}
              label={filterType}
              className="rounded-md border-gray-300 capitalize font-semibold w-48 border-2"
              onSelect={(option) => handleSelectFilter(filterType, option)}
              variant="secondary"
            />
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 flex-wrap md:h-10">
          {Object.entries(filtersState)
            .filter(
              ([key, val]) =>
                !["sort", "order"].includes(key) &&
                val !== null &&
                val !== undefined
            )
            .map(([key, val]) => (
              <FilterChip
                key={key}
                label={`${key}: ${val}`}
                onClick={() => handleRemoveFilter(key)}
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
          <Dropdown
            ref={(el) => (dropdownRefs.current["sortOrder"] = el)}
            onSelect={handleSort}
            options={sortOptions}
            label={"Newest first"}
            className="bg-gray-200 border-gray-200 outline-gray-200 w-40"
            variant="secondary"
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
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  removeFilter: PropTypes.func,
};
