import { useState } from "react";
import { SelectInput } from "../../../../shared/components/atoms/SelectInput";
import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";

export const Filters = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [ratingOrder, setRatingOrder] = useState("");
  const [categoryOrder, setCategoryOrder] = useState("");
  const [subCategoryOrder, setSubCategoryOrder] = useState("");
  const [languageOrder, setLanguageOrder] = useState("");

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleRating = (order) => {
    setRatingOrder((prev) => (prev === order ? "" : order));
  };

  const handleCategory = (order) => {
    setCategoryOrder((prev) => (prev === order ? "" : order));
  };

  const handleSubCategory = (order) => {
    setSubCategoryOrder((prev) => (prev === order ? "" : order));
  };

  const handleLanguage = (order) => {
    setLanguageOrder((prev) => (prev === order ? "" : order));
  };

  const ratingOptions = [
    { value: "all", label: "All" },
    { value: 5, label: "5" },
    { value: 4, label: "4" },
    { value: 3, label: "3" },
    { value: 2, label: "2" },
    { value: 1, label: "1" },
  ];

  const sortOptions = [
    { value: "most", label: "Most Popular" },
    { value: "new", label: "Newest first" },
    { value: "old", label: "Oldest First" },
    { value: "asc", label: "Name A → Z" },
    { value: "desc", label: "Name Z → A" },
  ];

  const categoryOptions = [
    { value: "all", label: "All" },
    { value: "technology", label: "Technology" },
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "finance", label: "Finance" },
    { value: "photography", label: "Photography" },
  ];

  const subCategoryOptions = [
    { value: "all", label: "All" },
    { value: "artificial-intelligence", label: "Artificial Intelligence" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "internet-of-things", label: "Internet of Things (IoT)" },
    { value: "blockchain", label: "Blockchain" },
    { value: "deep-learning", label: "Deep Learning" },
    { value: "computer-vision", label: "Computer Vision" },
  ];

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "italian", label: "Italian" },
    { value: "portuguese", label: "Portuguese" },
    { value: "japanese", label: "Japanese" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-5 flex-wrap">
          <SelectInput
            value={ratingOrder}
            onChange={(e) => handleRating(e.target.value)}
            options={ratingOptions}
            placeHolder="Rating"
            className="w-26 rounded-md border-gray-300"
          />
          <SelectInput
            value={categoryOrder}
            onChange={(e) => handleCategory(e.target.value)}
            options={categoryOptions}
            placeHolder="Category"
            className="w-32 rounded-md border-gray-300"
          />
          <SelectInput
            value={subCategoryOrder}
            onChange={(e) => handleSubCategory(e.target.value)}
            options={subCategoryOptions}
            placeHolder="SubCategory"
            className="w-38 rounded-md border-gray-300"
          />
          <SelectInput
            value={languageOrder}
            onChange={(e) => handleLanguage(e.target.value)}
            options={languageOptions}
            placeHolder="Language"
            className="w-32 rounded-md border-gray-300"
          />
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap h-10">
          {ratingOrder !== "" && (
            <Button
              color="secondary"
              radius={"full"}
              onClick={() => handleRating(ratingOrder)}
            >
              <p>{ratingOrder} stars</p>
              <Icon icon={"close"}></Icon>
            </Button>
          )}
          {categoryOrder !== "" && (
            <Button
              color="secondary"
              radius={"full"}
              onClick={() => handleCategory(categoryOrder)}
            >
              <p>
                {categoryOrder === "all" ? "All categories" : categoryOrder}
              </p>
              <Icon icon={"close"}></Icon>
            </Button>
          )}
          {subCategoryOrder !== "" && (
            <Button
              color="secondary"
              radius={"full"}
              onClick={() => handleSubCategory(subCategoryOrder)}
            >
              <p>
                {subCategoryOrder === "all"
                  ? "All sub categories"
                  : subCategoryOrder}
              </p>
              <Icon icon={"close"}></Icon>
            </Button>
          )}
          {languageOrder !== "" && (
            <Button
              color="secondary"
              radius={"full"}
              onClick={() => handleLanguage(languageOrder)}
            >
              <p>{languageOrder === "all" ? "All languages" : languageOrder}</p>
              <Icon icon={"close"}></Icon>
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-[3em] flex-wrap">
        <p className="text-gray-400">5000+ results</p>
        <div className="flex items-center">
          <p className="mr-2 text-gray-400">Order by:</p>
          <SelectInput
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
            options={sortOptions}
            placeHolder="Sort"
            className="w-32 bg-gray-200 border-gray-200 outline-gray-200"
          />
        </div>
      </div>
    </div>
  );
};
