import React, { useEffect, useState, useRef } from 'react';
import IcArrowSelect from "../../assets/images/profile/arrow_down_thin.svg";
import{Link} from "react-router-dom"

const DropdownMenu = (current) => {
    const [showBasis, setShowBasis] = useState(false);
    const [showVal, setShowVal] = useState("Information");
    const BasicArr = [
      { duration: "Information" ,to:"/profile#information"},
      { duration: "Watchlist" ,to:"/profile#watchlist" },
      { duration: "My Project" ,to:"/profile#my-project"},
      { duration: "Subscriptiton" ,to:"/profile#subscriptiton"}
    ];
    const onBasisSelected = (value) => {
      setShowBasis(!showBasis);
      setShowVal(value);
    };
    const ref = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref?.current && !ref?.current.contains(event.target)) {
            setShowBasis(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    return (
      <div
        className="flex flex-col absolute w-fit p-[12px_16px] border border-[#666D81] bg-transparent rounded-[32px] cursor-pointer"
        ref={ref}
        onClick={() => setShowBasis(!showBasis)}
      >
        <div className="flex flex-row items-center justify-between space-x-2 pr-4 text-[14px]">
          <div className="flex flex-row items-center space-x-3">
            <span className="text-base text-white whitespace-nowrap">
              {showVal}
            </span>
          </div>
          <img
            alt="select_icon"
            src={IcArrowSelect}
            className={`w-[14px] h-[7px] mr-4 transition-transform ${
              !showBasis ? "rotate-180" : ""
            }`}
          />
        </div>
        {showBasis && (
          <div className="flex flex-col">
            <div className="h-[1px] w-full bg-vbDisableText my-3"></div>
            <div className="flex flex-col space-y-3">
              {BasicArr.map((itemBasis, index) => (
                <Link   
                  key={index}
                  className="flex flex-row items-center"
                  onClick={() => onBasisSelected(itemBasis.duration)}
                  to={itemBasis.to}
                >
                    {itemBasis.duration}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
};

export default DropdownMenu;