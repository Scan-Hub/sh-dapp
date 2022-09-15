import { useCallback, useState, useMemo, useEffect } from "react"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import iconSearch from "../../assets/images/block-list/search-light.svg"
import icUnion from "../../assets/images/news/ic_union.svg"
import icUpload from "../../assets/images/news/ic_upload.svg"

import SwitchButton from "../global/SwitchButton"
import ControlledTextField from "../form/controlled_text_field"
import ControlledSelect from "../form/controlled_select"
import { useLocation } from "react-router-dom"

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

function NewsTab(props) {
  const { onFilters, onTabChange } = props
  const [activeTab, setActiveTab] = useState(0)

  const query = useQuery()

  const queryTab = useMemo(() => {
    return query.get("type")
  }, [query])

  /**
   * * This is just for reuse available component
   */
  const { control } = useForm({
    defaultValues: {
      searchValue: "",
      sort_type: ""
    }
  })

  const onChangeIndex = useCallback((index) => {
    setActiveTab(index)
    onTabChange(index === 0 ? "news" : "video")
  }, [])

  useEffect(() => {
    if (queryTab) {
      const activeTab = queryTab === "news" ? 0 : 1
      setActiveTab(activeTab)
      onTabChange(queryTab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTab])

  return (
    <div className="flex flex-col gap-y-8 mb-[60px]">
      <div className="flex flex-row justify-between">
        <SwitchButton
          tabIndex={activeTab}
          onChangeIndex={onChangeIndex}
          titles={["News", "Video"]}
          className="h-[48px]"
        />
        <div>
          <button className="sh_btn btn_orange w-[174px] !py-3 text-center">
            <img src={icUpload} alt="ic_upload" />
            <span className="ml-3">Upload</span>
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-x-4">
        <ControlledTextField
          control={control}
          name="searchValue"
          placeholder="Search"
          startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
        />
        <div className="flex flex-row min-w-[230px] items-end">
          <ControlledSelect
            required
            label=""
            placeholder="Date"
            control={control}
            options={[
              { label: "# of Likes", value: "1" },
              { label: "# of Views", value: "2" },
              { label: "# of Shared", value: "3" }
            ]}
            name="sort_type"
            className="grow"
          />
          <img className="ml-4 mb-4" src={icUnion} alt="ic_union" />
        </div>
      </div>
    </div>
  )
}

NewsTab.propTypes = {
  onFilters: PropTypes.func,
  onTabChange: PropTypes.func.isRequired
}

export default NewsTab
