import React from "react";
import { randomKeyUUID } from "../../_helpers/utils/lib";

const CheckBox = ({ className, id, value, handleCheckClick }) => {
  const key = randomKeyUUID();
  return (
    <div
      className={`${className} flex items-center`}
      onClick={handleCheckClick}
    >
      <input
        id={key}
        type="checkbox"
        value={id}
        className="form-checkbox w-4 h-4 text-[#00AF71] border border-[#BFBFBF] rounded cursor-pointer"
      />
      <label htmlFor={key} className="cursor-pointer">
        {value}
      </label>
    </div>
  );
};

export default CheckBox;
