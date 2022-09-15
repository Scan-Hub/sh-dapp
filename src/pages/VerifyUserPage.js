import React from "react";
import accelerator from "../assets/images/verify/accelerator.svg";
import blockchainTalent from "../assets/images/verify/blockchain-talent.svg";
import company from "../assets/images/verify/company.svg";
import incubator from "../assets/images/verify/incubator.svg";
import launchpad from "../assets/images/verify/laughtpad.svg";
import marketingAngency from "../assets/images/verify/marketing-angency.svg";
import vsc from "../assets/images/verify/vsc.svg";
import IcArrowNext from "../assets/images/profile/arrow-next.svg";
import IcArrowBack from "../assets/images/verify/back_arrow.svg";

import { useNavigate } from "react-router-dom";

const registrations = [
  {
    id: 1,
    icon: vsc,
    name: "Company",
  },
  {
    id: 2,
    icon: company,
    name: "Venture Capital",
  },
];
const registrationsCommingSoon = [
  {
    id: 3,
    icon: marketingAngency,
    name: "Marketing Agency",
  },
  {
    id: 4,
    icon: launchpad,
    name: "Launchpad",
  },
  {
    id: 5,
    icon: incubator,
    name: "Incubator",
  },
  {
    id: 6,
    icon: accelerator,
    name: "Accelerator",
  },
  {
    id: 7,
    icon: blockchainTalent,
    name: "Blockchain Talent",
  },
];
const VerifyUserPage = () => {
  const navigate = useNavigate();
  const handleMenuApply = (path) => {
    navigate("../profile", { replace: true });
  };
  const onSelect = (item) => {
    switch (item.id) {
      case 1: {
        navigate("/apply-company");
        break;
      }
      case 2: {
        navigate("/venture-capital");
        break;
      }
      case 3: {
        navigate("/marketing-agency");
        break;
      }
      case 4: {
        navigate("/launchpad");
        break;
      }
      case 5: {
        navigate("/incubator");
        break;
      }
      case 6: {
        navigate("/accelerator");
        break;
      }
      case 7: {
        navigate("/blockchain-talent");
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="bg-modal-apply bg-cover">
      <div className="lg:container pt-[100px] py-[256px] md:mx-auto px-4">
        <div className="md:w-[50%] mx-auto">
          <div className="flex text-center font-montserrat_semi_bold text-[24px] text-[#00AF71] pb-[48px]">
            <img
              src={IcArrowBack}
              className="cursor-pointer"
              alt="w-6"
              onClick={handleMenuApply}
            />
            <p className="w-full">What kind of category?</p>
          </div>
          <div className="grid grid-rows-7 gap-4">
            {registrations.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="w-full flex flex-row items-center justify-center py-[18px] px-6 rounded-lg min-w-[180px] bg-white/5"
              >
                <div className="flex flex-row w-full items-center">
                  <div className="w-fit flex items-center">
                    <img
                      src={item.icon}
                      alt={"icon_wallet"}
                      className="w-8 h-8"
                    />
                    <p className="text-[18px] font-montserrat_semi_bold ml-[24px]">
                      {item.name}
                    </p>
                  </div>
                </div>
                <img src={IcArrowNext} alt="w-6" />
              </button>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="w-full h-[1px] bg-[#214B3F]"></div>
            <span className="text-[#00AF71] text-[16px] leading-8 tracking-[10px] whitespace-nowrap p-6">
              COMING SOON
            </span>
            <div className="w-full h-[1px] bg-[#214B3F]"></div>
          </div>
          <div className="grid grid-rows-7 gap-4">
            {registrationsCommingSoon.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="w-full flex flex-row items-center justify-center py-[18px] px-6 rounded-lg min-w-[180px]"
                style={{ background: "rgba(66, 70, 103, 0.2)" }}
              >
                <div className="flex flex-row w-full items-center">
                  <div className="w-fit flex items-center">
                    <img
                      src={item.icon}
                      alt={"icon_wallet"}
                      className="w-8 h-8"
                    />
                    <p className="text-[18px] font-montserrat_semi_bold ml-[24px] text-[#656881]">
                      {item.name}
                    </p>
                  </div>
                </div>
                <img src={IcArrowNext} alt="w-6" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUserPage;
