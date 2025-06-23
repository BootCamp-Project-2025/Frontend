import React, { useEffect, useState } from "react";
import { CategoryCard } from "../molecules/CategoryCard";
export const CategoryCardsList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/requestCategories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading  data:", err));
  }, []);
  return (
    <div className="flex gap-5 overflow-scroll p-4">
      {categories.map((category) => {
        return (
          <CategoryCard
            key={category.id}
            imageURL={category.imageURL}
            category={category.category}
          ></CategoryCard>
        );
      })}
    </div>
  );
};
