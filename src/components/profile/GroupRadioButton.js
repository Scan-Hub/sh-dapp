import React, { useCallback } from "react";
import RadioButton from "../global/RadioButton";

const radios = [
  { id: 1, title: "Idea", checked: true },
  { id: 2, title: "MVP", checked: false },
  { id: 3, title: "Testnet/Beta", checked: false },
  { id: 4, title: "Mainnet/Live", checked: false },
];

const GroupRadioButton = ({ onSelect }) => {
  const onChecked = useCallback(
    (item) => {
      onSelect && onSelect(item.title);
    },
    [onSelect]
  );

  return (
    <div className="flex flex-col w-full space-y-6">
      <span>
        <span className="sm:text-lg text-base font-semibold font-montserrat_semi_bold text-white">
          Development Stage
        </span>
        <span className="sm:text-lg text-base font-semibold font-montserrat_semi_bold text-[#F5222D] ml-1">
          *
        </span>
      </span>
      <div className="flex flex-row items-center space-x-6 mt-4 w-full justify-between">
        {radios.map((radio) => (
          <div key={radio.id}>
            <RadioButton item={radio} onChecked={onChecked} />
          </div>
        ))}
      </div>
      <div className="space-x-2 flex flex-row items-center">
        <p className="sm:text-base text-sm font-normal font-montserrat text-grey-1">
          Other:
        </p>
        <div>
          <input className="bg-transparent focus:outline-none" />
          <div className="w-full h-[1px] bg-border" />
        </div>
      </div>
    </div>
  );
};

export default GroupRadioButton;
