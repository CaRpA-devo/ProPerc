import { useState } from "react";

export const useCalories = (initialData) => {
  const [data, setData] = useState(initialData);

  const updateCalories = () => {
    const newData = data.map((item) => ({
      ...item,
      calories: Math.floor(Math.random() * 500) + 1500,
    }));
    setData(newData);
  };

  return { data, updateCalories };
};
