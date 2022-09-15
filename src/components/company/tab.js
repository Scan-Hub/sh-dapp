import { useCallback, useState } from "react"
import PropTypes from "prop-types"

import CompanyPortfolio from "./portfolio"
import CompanyDescription from "./description"
import CompanyTeamAndPartner from "./team_partner"
import SwitchButton from "../global/SwitchButton"

function CompanyTab(props) {
  const { formProps } = props
  const [activeTab, setActiveTab] = useState(0)

  const onChangeIndex = useCallback((index) => {
    setActiveTab(index)
  }, [])

  return (
    <div>
      <div className="flex flex-col items-center">
        <SwitchButton
          tabIndex={activeTab}
          className={"sm:mb-20 mb-12"}
          onChangeIndex={onChangeIndex}
          titles={["Description", "Portfolio", "Team & Partner"]}
        />
      </div>
      {activeTab === 0 && <CompanyDescription formProps={{ ...formProps }} />}
      {activeTab === 1 && <CompanyPortfolio formProps={{ ...formProps }} />}
      {activeTab === 2 && (
        <CompanyTeamAndPartner formProps={{ ...formProps }} />
      )}
    </div>
  )
}

CompanyTab.propTypes = {
  formProps: PropTypes.object.isRequired
}

export default CompanyTab
