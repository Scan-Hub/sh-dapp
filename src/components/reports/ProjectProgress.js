import { reports } from "../../assets";
import Logo from "../../assets/images/report/logo.svg";

// import IcSearch from "../../assets/images/report/ic_search.svg";

const ProjectProgress = ({
  percent,
  height,
  radius,
  background,
  backgroundProcess,
}) => {
  return (
    <div
      className="relative flex"
      style={{
        borderRadius: radius,
        height: height,
        background: background,
      }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width: percent,
          borderRadius: radius,
          height: height,
          background: backgroundProcess,
        }}
      ></div>
    </div>
  );
};

export default ProjectProgress;
