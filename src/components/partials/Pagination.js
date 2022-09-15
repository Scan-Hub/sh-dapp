import React from "react";
import { partials } from "../../assets";

const Pagination = ({ currentPage, numOfPage, onChangePage }) => {
  const valuesArrObj = [];
  for (let index = 1; index <= numOfPage; index++) {
    valuesArrObj.push(index);
  }
  const onNext = () => {
    onChangePage(currentPage + 1);
  };

  const onPrevious = () => {
    onChangePage(currentPage - 1);
  };

  if (!numOfPage) {
    return;
  }

  return (
    <div className="pagination flex flex-row items-center space-x-4">
      <button
        className="flex flex-row items-center space-x-2 px-4 py-2 bg-[#191B2A] rounded-lg cursor-pointer"
        type="submit"
        onClick={onPrevious}
        disabled={currentPage === 1 ? true : false}
      >
        <img src={partials.IcPrev} alt="Next" />
        <span className="text-base text-[#656881]">Prev</span>
      </button>
      <div className="flex flex-row items-center space-x-4">
        {valuesArrObj.map((item, index) => (
          <div
            key={index}
            className={`flex w-10 h-10 bg-[#191B2A] text-base items-center justify-center rounded-lg cursor-pointer ${
              currentPage === item ? "text-white" : "text-[#656881]"
            }`}
            onClick={() => onChangePage(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <button
        className="flex flex-row items-center space-x-2 px-4 py-2 bg-[#191B2A] rounded-lg cursor-pointer"
        type="submit"
        onClick={onNext}
        disabled={currentPage === numOfPage ? true : false}
      >
        <span className="text-base text-[#656881]">Next</span>
        <img src={partials.IcNext} alt="Next" />
      </button>
    </div>
  );
};

export default Pagination;
