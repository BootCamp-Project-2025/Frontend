import React from "react";
import { CategoryCard } from "../molecules/CategoryCard";
export const CategoryCardsList = () => {
  return (
    <div className="flex gap-5 overflow-hidden p-4">
      <CategoryCard></CategoryCard>
      <CategoryCard></CategoryCard>
      <CategoryCard></CategoryCard>
      <CategoryCard></CategoryCard>
    </div>
  );
};
