import React, { useEffect } from "react"
import get from "lodash/get"
import { useLocation } from "react-router-dom"

import SearchNotFound from "../components/global/SearchNotFound"
import LoadingScreen from "../components/global/LoadingScreen"

import iconArrow from "../assets/images/card/arrow-right.svg"
import Search from "../components/search/Search"
import { getQueryURl } from "../_helpers/lib"
import { useDispatch, useSelector } from "react-redux"
import { fetchSearchEngine, save } from "../actions/search.actions"

import "../assets/styles/home.scss"

const SearchResult = ({ title, data, logo, name, onViewMore }) => {
  const renderList = () => {
    if (!data.length) {
      return <div>No data</div>
    }
    return (
      <div className="flex flex-row gap-x-6 md:gap-x-10 overflow-x-auto cus_scrollbar pb-2">
        {data.slice(0, 8).map((item, index) => (
          <div key={item._id}>
            <div className="w-[140px] h-[140px] rounded-2xl overflow-hidden mb-4">
              <img
                src={get(item, logo, "")}
                className="w-full h-full object-cover"
                alt={get(item, name, "")}
              />
            </div>
            <div className="text--semibold">{get(item, name, "")}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center text-green-text-profile mb-6">
        <p className="text--bold">
          {title} ({data.length})
        </p>
        {Boolean(data.length) && (
          <div
            className="flex justify-between cursor-pointer items-center"
            onClick={onViewMore}
          >
            <p className="text-green-text-profile text--sm">More</p>
            <img src={iconArrow} alt="more" className="ml-3" />
          </div>
        )}
      </div>
      {renderList()}
    </div>
  )
}

const SEARCH_RESULT_PROPERTIES = {
  form: {
    title: "Project",
    logo: "project_logo",
    name: "project_name",
    path: ""
  },
  partner: {
    title: "Partner",
    logo: "form.logo",
    name: "form.name",
    path: ""
  },
  user: {
    title: "User",
    logo: "avatar",
    name: "display_name",
    path: ""
  }
}

const HomeSearch = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const query = getQueryURl(location.search)

  const search = useSelector((state) => state.search)

  const isEmpty = !search.data.reduce(
    (prevValue, currValue) => prevValue.concat(currValue.items),
    []
  ).length

  useEffect(() => {
    fetchSearch(query.data)
  }, [query.path, location])

  const fetchSearch = (params) => {
    dispatch(fetchSearchEngine(params))
  }

  const renderContent = () => {
    if (search.loading) {
      return <LoadingScreen open={true} />
    }

    if (isEmpty) {
      return <SearchNotFound query={query.data.query} className="my-16" />
    }

    return (
      <div className="flex flex-col gap-y-12 md:gap-y-16">
        {search.data.map((item) => (
          <SearchResult
            key={`search_result_${item.type}`}
            title={SEARCH_RESULT_PROPERTIES[item.type].title}
            logo={SEARCH_RESULT_PROPERTIES[item.type].logo}
            name={SEARCH_RESULT_PROPERTIES[item.type].name}
            data={get(item, "items", [])}
            onViewMore={() => {}}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="container pb-24">
      <Search dataSearch={query.data} onSearch={fetchSearch} />
      <div className="mt-[120px] min-h-[160px]">{renderContent()}</div>
    </section>
  )
}

export default HomeSearch
