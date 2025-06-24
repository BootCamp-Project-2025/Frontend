import React, { useEffect, useState } from "react";
import { CategoryCard } from "../molecules/CategoryCard";
import { Slider } from "../atoms/Slider";
export const CategoryCardsList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/requestCategories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading  data:", err));
  }, []);
  return (
    <Slider>
      {categories.map((category) => {
        return (
          <CategoryCard
            key={category.id}
            imageURL={category.imageURL}
            category={category.category}
          ></CategoryCard>
        );
      })}
    </Slider>
  );
};
