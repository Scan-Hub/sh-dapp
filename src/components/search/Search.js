import React, { useContext, useEffect, useState } from "react"
import queryString from "query-string"

import "./search.scss"

import iconSearch from "../../assets/images/block-list/search-light.svg"
import iconFilter from "../../assets/images/block-list/filter.png"
import { useNavigate } from "react-router"

const Search = ({ dataSearch, onSearch }) => {
  const navigate = useNavigate()

  const [showFilter, setShowFilter] = useState(false)
  const [textSearch, setTextSearch] = useState("")

  const [suggestions, setSuggestions] = useState([])
  const [activeSuggestion, setActiveSuggestion] = useState(0)

  const showHideFilter = () => {
    setShowFilter(!showFilter)
  }

  useEffect(() => {
    setTextSearch(dataSearch.query)
  }, [dataSearch])

  const onChangeInput = (e) => {
    setTextSearch(e.target.value)
  }

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestion(0)

      const linkQuery = queryString.stringify(
        {
          query: textSearch
        },
        { skipNull: true }
      )

      navigate(`/cryptocurrencies/search?${linkQuery}`)
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

  return (
    <div className="search">
      <div className="search__search-filter">
        <div className="search__search-filter__input-wrapper">
          <input
            onChange={onChangeInput}
            onKeyDown={onKeyDown}
            value={textSearch}
            placeholder="Search"
          />
          <img
            className="search__search-filter__input-wrapper__icon"
            src={iconSearch}
            alt="iconSearch"
          />
          <p className="mx-2">Filter</p>
          <img
            className="search__search-filter__input-wrapper__iconFilter"
            src={iconFilter}
            onClick={showHideFilter}
            alt="iconFilter"
          />
        </div>
      </div>
      {showFilter && (
        <div className="search__search-icon">
          <p className="search__search-icon__item active">All</p>
          <p className="search__search-icon__item">User (1)</p>
          <p className="search__search-icon__item">Project (2)</p>
          <p className="search__search-icon__item">Company (1)</p>
          <p className="search__search-icon__item">Developer (0)</p>
          <p className="search__search-icon__item">VCs (0)</p>
          <p className="search__search-icon__item">Marketing (0)</p>
          <p className="search__search-icon__item">Launchpad (0)</p>
          <p className="search__search-icon__item">Incubator (0)</p>
          <p className="search__search-icon__item">News (15)</p>
        </div>
      )}
    </div>
  )
}
export default Search
