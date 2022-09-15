import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonReports from "../components/reports/CommonReport";
import FrmSearch from "../components/reports/FrmSearch";
import ImgHero from "../assets/images/report/img_hero.svg";
import DataTable from "../components/reports/DataTable";
import p1 from "../assets/images/report/p1.svg";
import p2 from "../assets/images/report/p2.svg";
import p3 from "../assets/images/report/p3.svg";
import p4 from "../assets/images/report/p4.svg";
import p5 from "../assets/images/report/p5.svg";
import IcBSC from "../assets/images/report/ic_bsc.svg";
import IcArrowTop from "../assets/images/report/ic_arrow_top.svg";
import Pagination from "../components/partials/Pagination";
import ModalReport from "../components/reports/ModalReport";
import {
  CSSTransition,
  TransitionGroup,
  Transition,
  CSSTransitionGroup,
} from "react-transition-group";
import SplitText from "../components/partials/SplitText";
import { fetchFormListScam } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { selectListForm } from "../reducers/metadata.reducer";
const ReportPage = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const commonData = [
    { title: "Scan Community", value: "5,717" },
    { title: "Blacklist Coins", value: "326" },
    { title: "Coin report", value: "704" },
    { title: "Comment", value: "262" },
  ];

  const [tableData, setTableData] = useState(null);
  const [tableDataFilter, setTableDataFilter] = useState(tableData);
  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const onChangePage = (page) => {
    if (page > numOfPage || page < 1) {
      return;
    }
    setCurrentPage(page);
  };

  const loadTableDataFilter = (data, currentPage) => {
    setTableDataFilter(data?.slice((currentPage - 1) * 5, currentPage * 5));
  };
  const firstRef = useRef();
  const secondRef = useRef();
  const [isInViewport1, setIsInViewport1] = useState(false);
  const [isInViewport2, setIsInViewport2] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    page_size: 10,
  });
  const listForm = useSelector(selectListForm);
  const numOfPage = listForm?.num_of_page;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(fetchFormListScam({ page: currentPage }));
  }, [currentPage]);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     const { top, bottom } = firstRef?.current?.getBoundingClientRect();
  //     // console.log("top", top);
  //     // console.log("bottom", bottom);
  //     // console.log("window.scrollY", window.scrollY);
  //     // var second = secondRef.current.getBoundingClientRect();
  //     // setIsInViewport1(window.scrollY >= top + 100);
  //     if (window.scrollY >= top + 100) {
  //       setIsInViewport1(true);
  //       if (bottom > 100) {
  //         setIsInViewport1(false);
  //       } else setIsInViewport1(true);
  //     } else setIsInViewport1(false);
  //   });
  // }, []);
  // const useIsInViewport = (ref) => {
  //   const [isInViewPort, setIsInViewport] = useState(false);

  //   useEffect(() => {
  //     function handleScroll() {
  //       const { bottom, top } = ref.current.getBoundingClientRect();
  //       return setIsInViewport(
  //         window.scrollY < top + 101
  //         // window.innerHeight - bottom > 20 || window.innerHeight - top > 200
  //         // window.innerHeight - bottom > 20 || window.innerHeight - top > 20
  //       );
  //     }

  //     window.addEventListener("scroll", handleScroll);

  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [ref, isInViewPort]);

  //   return isInViewPort;
  // };
  const getFadeLeftStyles = (isfadeLeftInViewPort) => ({
    transition: "all 1s ease-in",
    opacity: isfadeLeftInViewPort ? "1" : "0",
    transform: isfadeLeftInViewPort ? "" : "translateX(100%)",
  });

  const getFadeRightStyles = (isfadeRightInViewPort) => ({
    transition: "all 1s ease-in",
    opacity: isfadeRightInViewPort ? "1" : "0",
    transform: isfadeRightInViewPort ? "" : "translateX(-100%)",
  });

  return (
    <section className="cssanimation px-4 bg-cover bg-center overflow-hidden flex justify-center">
      <div className="w-full lg:px-4 xl:px-12 max-w-[1400px] px-4 min-h-screen pt-16 pb-24">
        <CSSTransition in={true} timeout={500} unmountOnExit>
          <div
            // style={getFadeLeftStyles(isInViewport1)}
            // style={getFadeRightStyles(!isInViewport1)}
            ref={firstRef}
            className="flex flex-col w-full lg:flex-row justify-center mdjustify-between items-center lg:space-x-24"
          >
            <div
              className="flex flex-col w-full lg:w-1/2 items-center lg:items-start text-center lg:text-left"
              style={getFadeRightStyles(!isInViewport1)}
            >
              <span className="font-poppins_semi_bold text-[3rem] leading-[4rem] text-white">
                <SplitText classType="oaoRotateXIn random" text="Scammers’" />
                <SplitText classType="oaoRotateXIn random" text=" worst " />
                <SplitText classType="oaoRotateXIn random" text="nightmare." />
              </span>
              <span className="blurIn text-lg text-white mt-6">
                Get to know the platform developed to detect and demand contract
                or pre-sales for profit, with detailed analysis and a tool that
                allows you to detect scams.
              </span>
              <div className="w-[152px]">
                <ModalReport />
              </div>
            </div>
            <div
              className="sm:w-2/3 lg:w-1/2"
              style={getFadeLeftStyles(!isInViewport1)}
            >
              <img
                alt=""
                src={ImgHero}
                className="swing-in-bottom-bck mt-13 lg:mt-0"
              />
            </div>
          </div>
        </CSSTransition>
        <div className="flex flex-col-reverse lg:flex-row justify-center lg:justify-between lg:space-x-15 mt-16 lg:mt-32">
          <div className="w-full lg:w-3/4 mt-4 lg:mt-0">
            <CommonReports commonData={commonData} />
          </div>
          <div className="w-full lg:w-1/4">
            <FrmSearch />
          </div>
        </div>
        {listForm && listForm?.items && (
          <div ref={ref} className="mt-[70px] overflow-hidden">
            <DataTable
              loading={listForm?.loading}
              tableData={listForm?.items}
              currentPage={currentPage}
            />
          </div>
        )}
        <div className="flex flex-col items-center w-full">
          {numOfPage && (
            <Pagination
              currentPage={currentPage}
              numOfPage={numOfPage}
              onChangePage={(page) => onChangePage(page)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ReportPage;
