import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import Banner from "../components/news/Banner"
import NewsItem from "../components/news/NewsItem"
import NewsFilters from "../components/news/Filters"
import Pagination from "../components/home/table/pagination"
import LoadingScreen from "../components/global/LoadingScreen"

import { fetchListNews } from "../actions/metadata.actions"
import { selectListNews, selectListVideos } from "../reducers/metadata.reducer"
import { TailSpin } from "react-loading-icons"
import { useNavigate } from "react-router-dom"

const NewsListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tab, setTab] = useState("news")
  const [filters, setFilters] = useState({
    type: "news",
    page: 1,
    page_size: 12
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
      totalPages: newsData.num_of_page || 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsData.items, newsData.num_of_page])

  const handleFetchListNews = useCallback(() => {
    dispatch(fetchListNews(filters))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  useEffect(() => {
    handleFetchListNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFetchListNews])

  return (
    <section className="container mx-auto">
      <div className="mt-[60px] mb-28">
        <Banner data={newsRecords.items.slice(0, 5)} />
        <NewsFilters
          onSearch={() => {}}
          onFilters={() => {}}
          onTabChange={(value) => {
            setFilters({ ...filters, type: value, page: 1 })
            setTab(value)
          }}
        />
        <div className="grid grid-cols-4 gap-x-8 gap-y-[60px] relative min-h-[258px]">
          <LoadingScreen
            open={listNews.loading || listVideos.loading}
            className="absolute top-0 left-0 z-10"
          />
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

export default NewsListPage
