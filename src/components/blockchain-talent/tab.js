import { useCallback, useState } from "react"
import PropTypes from "prop-types"

import SwitchButton from "../global/SwitchButton"

import BlockchainTalentDescription from "./description"
import BlockchainTalentExperience from "./experience"
import BlockchainTalentSkill from "./skill"
import BlockchainTalentEducation from "./education"

function BlockchainTalent(props) {
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
          titles={["Description", "Experience", "Skill", "Education"]}
        />
      </div>
      {activeTab === 0 && (
        <BlockchainTalentDescription formProps={{ ...formProps }} />
      )}
      {activeTab === 1 && (
        <BlockchainTalentExperience formProps={{ ...formProps }} />
      )}
      {activeTab === 2 && (
        <BlockchainTalentSkill formProps={{ ...formProps }} />
      )}
      {activeTab === 3 && (
        <BlockchainTalentEducation formProps={{ ...formProps }} />
      )}
    </div>
  )
}

BlockchainTalent.propTypes = {
  formProps: PropTypes.object.isRequired
}

export default BlockchainTalent
