import React from 'react';
import { useSelector } from "react-redux";
import { selectSelectedTab } from "../../reducers/partnership.reducer";

const Partnership_menulist = ({ menuType, onMenuClick, label }) => {
    const selectedType = useSelector(selectSelectedTab);

    return (
        <a
        className={
          selectedType === menuType
            ? "active !rounded-[8px] !px-[30px] lg:!text-[14px] !text-[12px]"
            : "inactive !rounded-[8px] !px-[30px] lg:!text-[14px] !text-[12px]"
        }
        onClick={onMenuClick}
      >
        {label}
      </a>
    );
};

export default Partnership_menulist;