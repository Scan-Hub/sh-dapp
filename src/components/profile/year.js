import React from "react";

export const years = ["2021", "2022", "2023"];

export const useDynamicYears = ({ startingYear, numberOfYears }) => {
  const [years, setYears] = React.useState(() => {
    const dynamicYears = [];
    for (let i = 0; i < numberOfYears; i++) {
      startingYear = startingYear-1
      dynamicYears.push(startingYear);
    }
    return dynamicYears;
  });
  return years;
};
