import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedTab } from "../../reducers/scanjob.reducer";

const ScanJobListMenu = ({ menuType, onMenuClick, label }) => {
  const selectedType = useSelector(selectSelectedTab);
  return (
    <a
      className={
        selectedType === menuType
          ? "active !rounded-[32px] !px-[30px] lg:!text-[14px] !text-[12px]"
          : "inactive !rounded-[32px] !px-[30px] lg:!text-[14px] !text-[12px]"
      }
      onClick={onMenuClick}
    >
      {label}
    </a>
  );
};

export default ScanJobListMenu;
