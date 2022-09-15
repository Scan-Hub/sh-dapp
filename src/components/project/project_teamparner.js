import React, { useState, useRef, useEffect } from "react";
import LazyloadImage from "./project_carousel";
import team_lead_1 from "../../assets/images/project/team_lead_1.svg";
import team_lead_2 from "../../assets/images/project/team_lead_2.svg";
import team_lead_3 from "../../assets/images/project/team_lead_3.svg";
import team_lead_4 from "../../assets/images/project/team_lead_4.svg";
const Projectteampartners = ({ data }) => {
  return (
    <div className="w-full pb-24 lg:px-0 px-4">
      <div className="scrollmargin">
        <p className="project-content-title pb-6">T E A M L E A D E R</p>
      </div>
      <LazyloadImage val={data} />
    </div>
  );
};

export default Projectteampartners;
