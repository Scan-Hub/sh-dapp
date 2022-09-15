import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import IcSearch from "../../assets/images/report/ic_search.svg";

const FrmSearch = () => {
  return (
    <div className="flex flex-col bg-[#191B2A] rounded-lg lg:rounded-3xl p-[24px_32px] space-y-[10px]">
      <div className="flex flex-row border border-[#00AF71] rounded-lg p-[10px_16px]">
        <img alt="" src={IcSearch} className="cursor-pointer" />
        <input
          className="bg-transparent focus:outline-none font-poppins ml-4 appearance-none text-sm text-[#F5F5F5] placeholder-[[#F5F5F5]]"
          type="text"
          placeholder={"Search"}
        />
      </div>
      <div className="flex flex-row items-center space-x-8">
        <div className="flex items-center">
          <input
            id="checked-all"
            type="checkbox"
            value=""
            className="form-checkbox w-4 h-4 text-[#00AF71] border border-[#BFBFBF] rounded cursor-pointer p-1"
          />
          <label
            htmlFor="checked-all"
            className="ml-2 text-sm font-medium text-[#F5F5F5] cursor-pointer"
          >
            All
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="checked-scam"
            type="checkbox"
            value=""
            className="form-checkbox w-4 h-4 text-[#00AF71] border border-[#BFBFBF] rounded cursor-pointer"
          />
          <label
            htmlFor="checked-scam"
            className="ml-2 text-sm font-medium text-[#F5F5F5] cursor-pointer"
          >
            Scam
          </label>
        </div>
      </div>
    </div>
  );
};

export default FrmSearch;
