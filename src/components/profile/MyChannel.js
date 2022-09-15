import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { TailSpin } from "react-loading-icons"
import { useNavigate } from "react-router-dom"

import NewsItem from "../news/NewsItem"
import NewsFilters from "../news/Filters"
import Pagination from "../home/table/pagination"

import { fetchListNews } from "../../actions/metadata.actions"
import { selectListNews, selectListVideos } from "../../reducers/metadata.reducer"

const MyChannel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tab, setTab] = useState("news")
  const [filters, setFilters] = useState({
    type: "news",
    page_size: 8,
    page: 1
  })
  const listNews = useSelector(selectListNews)
  const listVideos = useSelector(selectListVideos)

  const newsData = useMemo(() => {
    if (tab === "news") return listNews
    return listVideos
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, listNews, listVideos])

  const newsRecords = useMemo(() => {
    return {
      items: [...newsData.items],
      totalPages: newsData.num_of_page || 0,
      loading: newsData.loading
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsData])

  const handleFetchListNews = useCallback(() => {
    dispatch(fetchListNews(filters))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  useEffect(() => {
     handleFetchListNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFetchListNews])

  return (
    <section className="mx-auto">
      <div className="px-8 pb-24">
        <NewsFilters
          onSearch={() => {}}
          onFilters={() => {}}
          onTabChange={(value) => {
            setFilters({ ...filters, type: value, page: 1 })
            setTab(value)
          }}
        />
        <h3 className="mb-6 font-montserrat_semi_bold text-lg text-[#00AF71]"> YOUR UPLOAD VIDEO </h3>
        <div className="grid grid-cols-4 gap-x-8 gap-y-[60px] relative min-h-[258px]">
          {newsRecords.loading && (
            <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center text-green-text-profile z-10">
              <TailSpin className="mb-2" fill="#00AF71" stroke="#00AF71" />
              Loading...
            </div>
          )}
          {newsRecords.items.map((item, index) => (
            <NewsItem
              key={`card_key_${index}`}
              item={item}
              thumbnail="thumbnail"
              title="title"
              createdBy="created_by"
              onClick={() => {
                navigate(`/news/${item._id}`)
              }}
            />
          ))}
        </div>
        <Pagination
          canNextPage={filters.page < newsRecords.totalPages}
          canPreviousPage={filters.page > 1}
          gotoPage={(index) => {
            setFilters({
              ...filters,
              page: index + 1
            })
          }}
          nextPage={() => {
            setFilters({
              ...filters,
              page: filters.page + 1
            })
          }}
          previousPage={() => {
            setFilters({
              ...filters,
              page: filters.page - 1
            })
          }}
          pageOptions={[...new Array(newsRecords.totalPages).keys()]}
          pageIndex={filters.page - 1}
        />
      </div>
    </section>
  )
}

export default MyChannel
