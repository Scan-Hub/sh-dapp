import React, { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
const ProjectDescription = ({ data }) => {
  const refHighlight = useRef();
  const refDescription = useRef();
  const itemsRef = useRef([]);
  const [activeRef, setActiveRef] = useState(null);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      checkActiveRef(refHighlight, refDescription, itemsRef);
    });
  }, []);

  const checkActiveRef = (refHighlight, refDescription, refArr) => {
    setActiveRef(refHighlight?.current);
    let topDes = refDescription?.current?.getBoundingClientRect()?.top;
    if ((topDes = 130 && topDes < 180)) {
      setActiveRef(refDescription?.current);
    }
    refArr?.current.map((item, index) => {
      let top = item?.getBoundingClientRect()?.top;
      if ((top = 130 && top < 180)) {
        setActiveRef(item);
      }
    });
  };

  const onClickMenu = (refCurrent) => {
    refCurrent.scrollIntoView({
      behavior: "smooth",
      block: "start",
      //   inline: "nearest",
    });
  };

  return (
    <div className="flex w-full pb-24">
      <div className="project-content-1 w-1/4 md:block hidden ">
        <div className=" sticky top-1/4">
          {data?.project_high_light && (
            <a
              className={
                activeRef === refHighlight?.current
                  ? "project-contend-menu"
                  : "inactive"
              }
              onClick={() => {
                onClickMenu(refHighlight.current);
              }}
            >
              <p>Highlights</p>
            </a>
          )}
          {data?.project_description && (
            <a
              className={
                activeRef === refDescription?.current
                  ? "project-contend-menu"
                  : "inactive"
              }
              onClick={() => {
                onClickMenu(refDescription.current);
              }}
            >
              <p>Description</p>
            </a>
          )}

          {data?.about_projects &&
            data?.about_projects.map((item, index) => (
              <a
                key={index}
                className={
                  activeRef === itemsRef?.current[index]
                    ? "project-contend-menu"
                    : "inactive"
                }
                onClick={() => {
                  onClickMenu(itemsRef.current[index]);
                }}
              >
                <p>{item?.title}</p>
              </a>
            ))}
        </div>
      </div>
      <div className="project-content-2 flex flex-col space-y-17 md:w-3/4 w-full md:pl-12 text-[#ADB2DB] md:px-0 px-4">
        {data?.project_high_light && (
          <div id="menu1" ref={refHighlight} className="scroll-mt-[100px]">
            <p className="project-content-title tracking-widest">HIGHLIGHTS</p>
            <div className="text-[16px] leading-8 ml-4 mt-7">
              <p className="list-item">
                {data?.project_high_light ? parse(data.project_high_light) : ""}
              </p>
            </div>
          </div>
        )}
        {data?.project_description && (
          <div id="menu1" ref={refDescription} className="scroll-mt-[100px]">
            <p className="project-content-title tracking-widest">DESCRIPTION</p>
            <div className="text-[16px] leading-8 ml-4 mt-7">
              <p className="list-item">
                {data?.project_description
                  ? parse(data.project_description)
                  : ""}
              </p>
            </div>
          </div>
        )}
        {data?.about_projects &&
          data?.about_projects.map((item, index) => (
            <div
              key={index}
              id="menu1"
              ref={(el) => (itemsRef.current[index] = el)}
              className="scroll-mt-[100px]"
            >
              <p className="project-content-title tracking-widest">
                {item?.title.toUpperCase()}
              </p>
              <div className="text-[16px] leading-8 ml-4 mt-7">
                <p className="list-item">{item?.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectDescription;
