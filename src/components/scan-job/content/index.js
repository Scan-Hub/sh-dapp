import React from "react";
import { useSelector } from "react-redux";
import { FindType, selectSelectedTab } from "../../../reducers/scanjob.reducer";
import JobContent from "./job";
import TalentContent from "./talent";

const ScanJobContent = () => {
  const selectedTab = useSelector(selectSelectedTab);
  return (
    <div className="flex flex-1">
      {selectedTab === FindType.JOB ? <JobContent /> : <TalentContent />}
    </div>
  );
};

export default React.memo(ScanJobContent);
