import React, { Fragment, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactTyped from "react-typed"
import debounce from "lodash.debounce"

import iconSearch from "../../../assets/images/block-list/search-light.svg"

import { searchService } from "../../../services"
import ListCategorySearch from "./ListSearch"
import { addressWalletCompact } from "../../../_helpers/lib"

const typeName= {
  "form":"Project",
  "user":"User",
  "partner":"Partner",
}

const formatList = (value) =>{

  let  dataItem = [];

  if(value.type === "form") {
    dataItem = value.items.map(i => (
      {
        _key: `${value.type}-${i._id}`,
        data: i,
        type: value.type,
        name: i.project_name,
        image: i.project_logo
      } 
    ));
  }

  if(value.type === "user") {
    dataItem = value.items.map(i => (
      {
        _key: `${value.type}-${i._id}`,
        data: i,
        type:  value.type,
        name: `${i.display_name || addressWalletCompact(i.address) }`,
        image: i.avatar
      } 
    ));
  }

  if(value.type === "partner") {
    dataItem = value.items.map(i => (
      {
        _key: `${value.type}-${i._id}`,
        data: i,
        type: value.type,
        name: i.form?.name,
        image: i.form?.logo
      } 
    ));
  }

  return {
    type: typeName[value.type],
    items: dataItem
  }

}

const SearchInput = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [suggestions, setSuggestions] = useState([])

  const getSuggestions = async (word) => {
    if (word) {

      setLoading(true)

      const res = await searchService.getListSearch({ query: word ,limit:5});
      const dataResearch  = res.data?.result || [];
      
      let dataList = [];
      for (const item of dataResearch) {

        if(item.items.length > 0){
          dataList.push(formatList(item))
        }
      
      }

      setSuggestions(dataList)
      setLoading(false)

    } else {
      setSuggestions([])
    }

  }

  const debouncedSave = useCallback(
    debounce((newValue) => getSuggestions(newValue), 400),
    []
  )

  const handleSearchKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestion(0)
      if (e.target.value) {
        navigate(`/cryptocurrencies/search?query=${e.target.value}`)
      }
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }
      setActiveSuggestion({ activeSuggestion: activeSuggestion - 1 })
    }

    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === suggestions.length) {
        return
      }
      setActiveSuggestion({ activeSuggestion: activeSuggestion + 1 })
    }
  }

  const handleChange = (e) => {

    e.preventDefault();
    if (e.target.value.trim() === "") {
      setShow(false);
      return;
    }

    debouncedSave(e.target.value);
    setShow(true);

  }

  const handleBlur = (e) => {
  // setShow(false);
  }

  const onClickFunction = (link) => {
    navigate(link)
  }

  return (
    <Fragment>
      <div className="relative flex items-center">
        <div className="absolute left-0 ml-4">
          <img src={iconSearch} className="icon" alt="icon" />
        </div>
        <ReactTyped
          loop={true}
          className="block w-full"
          loopCount={0}
          typeSpeed={100}
          startDelay={0}
          backSpeed={20}
          backDelay={1}
          strings={[
            "Better Blockchain information",
            "Better Oppotunity for all."
          ]}
          stopped={null}
          smartBackspace
          shuffle={false}
          fadeOut={false}
          fadeOutDelay={100}
          attr="placeholder"
          bindInputFocusEvents={false}
        >
          <input
            autoComplete="off"
            className="grow focus:ring-1 focus:ring-vbDisableText !pl-14"
            onKeyDown={handleSearchKeyDown}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </ReactTyped>

        {show && <ListCategorySearch loading={loading} options={suggestions} onClickFunction={onClickFunction}  />}
      </div>
    </Fragment>
  )
}

export default SearchInput
