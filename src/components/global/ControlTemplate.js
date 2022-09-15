import React from "react";
import Button from "./Button";
// import IcArrowUp from "../../assets/images/profile/arrow_up.svg";
// import IcArrowDown from "../../assets/images/profile/arrow_down.svg";

const ControlTemplate = ({ onMoveDown, onMoveUp, onAdd, onRemove }) => {
  return (
    <div className="w-full flex flex-row items-center justify-end space-x-2">
      {/* <button
        className="rounded-md w-8 h-8 bg-box-bg flex items-center justify-center"
        type="button"
        onClick={onMoveDown}
      >
        <img src={IcArrowDown} alt="arrow_down" />
      </button>
      <button
        className="rounded-md w-8 h-8 bg-box-bg flex items-center justify-center"
        type="button"
        onClick={onMoveUp}
      >
        <img src={IcArrowUp} alt="arrow_up" />
      </button> */}
      <Button
        title="+ Add"
        className="px-2 py-1 rounded-md"
        onClickBtn={onAdd}
      />
      <Button
        title="- Delete"
        className="px-2 py-1 rounded-md bg-red-btn"
        onClickBtn={onRemove}
      />
    </div>
  );
};

export default ControlTemplate;
