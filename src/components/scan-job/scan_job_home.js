import React, { useState } from "react";
import partnership_head from "../../assets/images/partnership/partnership_head.jpg";
import partnership_head_mb from "../../assets/images/partnership/partnership_head_mb.png";
import head_bg from "../../assets/images/partnership/head_bg.png";

import Search_light from "../../assets/images/partnership/Search_light.png";
import top_select_1 from "../../assets/images/partnership/top-select-1.jpg";
import top_select_2 from "../../assets/images/partnership/top-select-2.jpg";
import top_select_3 from "../../assets/images/partnership/top-select-3.jpg";
import top_select_4 from "../../assets/images/partnership/top-select-4.jpg";
import top_select_5 from "../../assets/images/partnership/top-select-5.jpg";
import top_select_6 from "../../assets/images/partnership/top-select-6.jpg";
import top_select_7 from "../../assets/images/partnership/top-select-7.jpg";
import top_select_8 from "../../assets/images/partnership/top-select-8.jpg";
import top_select_9 from "../../assets/images/partnership/top-select-9.jpg";

import telegram from "../../assets/images/footer/telegram.png";
import twitter from "../../assets/images/footer/twitter.png";
import { useNavigate } from "react-router-dom";
import PartnershipFilters from "../partnership/partnership_filter";
import Partnership_menulist from "../partnership/partnership_menulist";
import ScanJobFilters from "./scan_job_filter";
import ScanJobListMenu from "./scan_job_menu_list";
import ScanJobContent from "./content";
import { useDispatch, useSelector } from "react-redux";
import {
  FindType,
  selectSelectedTab,
  selectTab,
} from "../../reducers/scanjob.reducer";
import SwitchButton from "../global/SwitchButton";

const ScanJobHome = () => {
  const navigate = useNavigate();
  async function handlClick(event) {
    navigate("../partnershipdetail/" + event, { replace: true });
  }
  const selectedTab = useSelector(selectSelectedTab);
  const dispatch = useDispatch();
  const onMenuClickListener = (menuType) => {
    dispatch(selectTab(menuType));
  };
  //   const listMenu = [{ menuType: FindType.JOB, label: "Find Job" }, { menuType: FindType.TALENT, label: "Find Talent" }];
  const listMenu = ["Find Job", "Find Talent"];
  const listContent = [
    { img: top_select_1, item: "Betasun Venture" },
    { img: top_select_2, item: "Betasun Venture" },
    { img: top_select_3, item: "Betasun Venture" },
    { img: top_select_4, item: "Betasun Venture" },
    { img: top_select_5, item: "Betasun Venture" },
    { img: top_select_6, item: "Betasun Venture" },
    { img: top_select_7, item: "Betasun Venture" },
    { img: top_select_8, item: "Betasun Venture" },
    { img: top_select_9, item: "Betasun Venture" },
  ];
  const listContent_mb = [
    [
      { img: top_select_1, item: "Betasun Venture" },
      { img: top_select_2, item: "Betasun Venture" },
      { img: top_select_3, item: "Betasun Venture" },
    ],
    [
      { img: top_select_4, item: "Betasun Venture" },
      { img: top_select_5, item: "Betasun Venture" },
      { img: top_select_6, item: "Betasun Venture" },
    ],
    [
      { img: top_select_7, item: "Betasun Venture" },
      { img: top_select_8, item: "Betasun Venture" },
      { img: top_select_9, item: "Betasun Venture" },
    ],
  ];
  return (
    <div className="lg:container pb-[56px] md:mx-auto px-4">
      {/* <div className="relative">
        <img
          className="w-full rounded-[32px] md:relative absolute md:block hidden"
          src={partnership_head}
        />
        <img className="w-full absolute md:hidden block z-[-1]" src={head_bg} />
        <div className="md:absolute lg:pl-[88px] md:pl-[40px] px-[24px] top-0 md:w-[60%] w-full md:text-left text-center md:pt-0 pt-[60px] h-full flex flex-col md:justify-center md:items-start items-center">
          <p className="font-Elemental_End sm:text-[32px] text-[24px] leading-[48px] text-[#5EFFA4] mb-4">
            Connect <br /> for partnership
          </p>
          <p className="sm:text-[16px] text-[14px]">
            Global Matching Platform is a platform - a new playground held every
            month for all parties in the Crypto ecosystem to join, connect,
            select, and identify groups of quality Crypto startups. All parties,
            attendants actively interact and exchange with each other.
          </p>
          <img
            className="max-w-[345px] md:hidden block mt-[80px]"
            src={partnership_head_mb}
          />
        </div>
      </div> */}
      <div className="mt-[48px]">
        {/* <p className="text-[#00AF71] text-[18px] font-montserrat_bold">
          Partners
        </p> */}
        <div className="flex justify-center items-center mt-6 overflow-x-auto ">
          <div className="h-[30px]"></div>
          <SwitchButton titles={listMenu} tabIndex={selectedTab} onChangeIndex={onMenuClickListener} />
          {/* {listMenu.map((e, i) => (
            <div className="project-filter-btn cursor-pointer" key={i}>
              <ScanJobListMenu
                menuType={e.menuType}
                label={e.label}
                onMenuClick={() => onMenuClickListener(e.menuType)}
              />
            </div>
          ))} */}
        </div>
      </div>
      <div className="mt-[72px] flex flex-row justify-between gap-12">
        <ScanJobFilters />
        <ScanJobContent />
        {/* <div className='md:flex block items-center'>
                    <p className="text-[#00AF71] text-[18px] font-montserrat_bold md:w-[50%] w-full">Top Selected</p>
                    <div className="md:w-[50%] w-full md:mt-0 mt-4">
                        <div className='py-4 px-[21px] bg-[#191B2B] md:w-[400px] flex w-full  md:float-right'>
                            <img className="pr-[10px]" src={Search_light} />
                            <input className='w-full border-none focus:outline-none bg-transparent' placeholder='Search by Name' type="text" />
                        </div>
                    </div>
                </div>
                <div className=' md:grid grid-cols-3 gap-8 mt-[46px] hidden'>
                    {(listContent.map((e, i) =>
                        <div key={i} className="flex p-4 bg-[#191B2A] hover:scale-105 cursor-pointer" onClick={() => (handlClick(e.item))}>
                            <img className="mr-4 rounded-xl" src={e.img} />
                            <div>
                                <p className=" font-montserrat_bold leading-[24px]">{e.item}</p>
                                <p className=" text-[14px]">{e.item}</p>
                                <div className='flex mt-4'>
                                    <img className='w-[20px] mr-4' src={telegram} />
                                    <img className='w-[20px]' src={twitter} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='md:hidden block  mt-[16px]'>
                    <Partnership_carousel val={listContent_mb}/>
                </div>             */}
      </div>
    </div>
  );
};

export default ScanJobHome;
