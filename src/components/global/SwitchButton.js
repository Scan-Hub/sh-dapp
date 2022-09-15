import React from "react";
const SwitchButton = ({ onChangeIndex, tabIndex, className, titles = [] }) => {
  return (
    <div
      className={`${className} p-1 w-fit bg-box-bg rounded-[24px] box-border border-[#D2C0F1]/[.3] border-[1px] flex flex-row items-center`}
    >
      {titles.length > 0 &&
        titles.map((title, index) => (
          <button
            type="button"
            key={index}
            className={`${
              tabIndex === index ? "bg-green-text-profile" : "bg-transparent"
            } flex flex-row sm:min-w-[177px] min-w-[128px] px-[30px] py-2 items-center cursor-pointer sm:text-base text-sm font-poppins_semi_bold font-semibold rounded-[32px]`}
            onClick={() => {
              onChangeIndex(index);
            }}
          >
            <span className="w-full">{title}</span>
          </button>
        ))}
    </div>
  );
};

export default SwitchButton;
