import React, { useCallback } from "react";
import "./styles.scss";

const RadioButton = ({ item, onChecked }) => {
  const onClick = useCallback(() => {
    onChecked && onChecked(item);
  }, [item, onChecked]);

  return (
    <div className="flex items-center">
      <input
        id={`radio${item.id}`}
        type="radio"
        name="radio"
        className="hidden"
        onClick={onClick}
      />
      <label
        htmlFor={`radio${item.id}`}
        className="flex items-center cursor-pointer sm:text-base text-sm font-normal font-montserrat text-grey-1"
      >
        <span className="w-4 h-4 inline-block mr-1 rounded-full border border-border" />
        {item.title}
      </label>
    </div>
  );
};

export default RadioButton;
