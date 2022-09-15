import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import ProjectDescription from "./project_Description";
import Projectteampartners from "./project_teamparner";
import ProjectReview from "./project_Review";
import ProjectRating from "./project_Rating";
import ProjectTweets from "./project_Tweets";
import ProjectDropDown from "./project_dropdown";
import { selectFullDetailForm } from "../../reducers/project.reducer";
import { useSelector } from "react-redux";

const ProjectContent = () => {
  const [keyHash, setKeyHash] = useState("#Details");
  const { id } = useParams();

  const fullDetailForm = useSelector(selectFullDetailForm);

  return (
    <div className="lg:container pt-20 pb-[56px] md:mx-auto ">
      <div className="justify-between md:block hidden">
        <div className="project-filter-btn rounded-full flex space-x-4">
          <NavLink
            // className={({ isActive }) =>
            //   keyHash === "#Details" && isActive ? "active" : "inactive"
            // }
            className="rounded-lg"
            key={"project-Details"}
            to={`/project/${id}/#Details`}
            onClick={() => setKeyHash("#Details")}
            style={{
              background: `${keyHash === "#Details" ? "#00AF71" : "#191B2A"}`,
            }}
          >
            Details
          </NavLink>

          <NavLink
            // className={({ isActive }) =>
            //   keyHash === "#team&partners" && isActive ? "active" : "inactive"
            // }
            className="rounded-lg"
            key={"project-team&partners"}
            to={`/project/${id}/#team&partners`}
            onClick={() => setKeyHash("#team&partners")}
            style={{
              background: `${
                keyHash === "#team&partners" ? "#00AF71" : "#191B2A"
              }`,
            }}
          >
            Team & Partner
          </NavLink>

          <NavLink
            // className={({ isActive }) =>
            //   keyHash === "#Review" && isActive ? "active" : "inactive"
            // }
            className="rounded-lg"
            key={"project-Review"}
            to={`/project/${id}/#Review`}
            onClick={() => setKeyHash("#Review")}
            style={{
              background: `${keyHash === "#Review" ? "#00AF71" : "#191B2A"}`,
            }}
          >
            Review
          </NavLink>
          <NavLink
            // className={({ isActive }) =>
            //   keyHash === "#Rating" && isActive ? "active" : "inactive"
            // }
            className="rounded-lg"
            key={"project-Rating"}
            to={`/project/${id}/#Rating`}
            onClick={() => setKeyHash("#Rating")}
            style={{
              background: `${keyHash === "#Rating" ? "#00AF71" : "#191B2A"}`,
            }}
          >
            Rating
          </NavLink>
          <NavLink
            // className={({ isActive }) =>
            //   keyHash === "#Tweets" && isActive ? "active" : "inactive"
            // }
            className="rounded-lg"
            key={"project-Tweets"}
            to={`/project/${id}/#Tweets`}
            onClick={() => setKeyHash("#Tweets")}
            style={{
              background: `${keyHash === "#Tweets" ? "#00AF71" : "#191B2A"}`,
            }}
          >
            Tweets
          </NavLink>
        </div>
      </div>
      <div className="flex justify-center md:hidden">
        <ProjectDropDown></ProjectDropDown>
      </div>
      <div className="flex justify-start pt-24 space-x-5">
        {keyHash === "#Details" && fullDetailForm?.items && (
          <ProjectDescription data={fullDetailForm?.items} />
        )}
        {keyHash === "#team&partners" && fullDetailForm?.items?.teams && (
          <Projectteampartners data={fullDetailForm?.items?.teams} />
        )}
        {keyHash === "#Review" && <ProjectReview />}
        {keyHash === "#Rating" && <ProjectRating />}
        {keyHash === "#Tweets" && <ProjectTweets />}
      </div>
    </div>
  );
};

export default ProjectContent;
