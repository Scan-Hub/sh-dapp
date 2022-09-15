import { useDispatch, useSelector } from "react-redux"
import React, { useCallback, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import get from "lodash/get"

import Carousel from "../components/global/carousel"
import NewsItem from "../components/news/NewsItem"
import RelatedNews from "../components/news/RelatedNews"
import NewsContent from "../components/news/Content"

import { fetchNewsDetail, fetchListNews } from "../actions/metadata.actions"
import {
  selectNewsDetail,
  selectListNews,
  selectListVideos
} from "../reducers/metadata.reducer"
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin"

const NewsDetailPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { newsId } = useParams()
  const listNews = useSelector(selectListNews)
  const listVideos = useSelector(selectListVideos)
  const selectedNewsDetail = useSelector(selectNewsDetail)

  const newsDetail = useMemo(() => {
    return selectedNewsDetail
  }, [selectedNewsDetail])

  const newsType = get(newsDetail.data, "type")

  const relatedData = useMemo(() => {
    if (newsType === "news") return [...listNews.items]
    return [...listVideos.items]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsDetail, listNews, listVideos])

  const carouselData = useMemo(() => {
    return newsType === "video" ? listNews.items : listVideos.items
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsType, listNews, listVideos])

  const handleGetNewDetail = useCallback(() => {
    if (newsId) {
      dispatch(fetchNewsDetail(newsId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsId])

  useEffect(() => {
    handleGetNewDetail()
  }, [handleGetNewDetail])

  useEffect(() => {
    dispatch(
      fetchListNews({
        type: "video"
      })
    )
    dispatch(
      fetchListNews({
        type: "news"
      })
    )
  }, [])

  const renderNewsDetail = () => {
    if (newsDetail.loading) {
      return (
        <div className="w-full h-full top-0 left-0 flex flex-col items-center justify-center text-green-text-profile z-10">
          <TailSpin className="mb-2" fill="#00AF71" stroke="#00AF71" />
          Loading...
        </div>
      )
    }

    return (
      <>
        <div className="flex flex-row gap-x-[60px] mb-[60px]">
          <NewsContent data={newsDetail.data} />
          <RelatedNews data={relatedData} title={`Related ${newsType}`} />
        </div>
        <div>
          <div className="text-green-text-profile text--semibold-xl mb-6">
            {newsType === "video" ? "Related News" : "Related Video"}
          </div>
          <Carousel
            className="mb-16"
            breakpoints={{
              780: {
                slidesPerView: 3
              },
              1280: {
                slidesPerView: 4
              },
              1580: {
                slidesPerView: 4
              }
            }}
            carousels={carouselData}
            renderer={(item, index) => (
              <NewsItem
                key={`card_key_${index}`}
                item={item}
                color="light"
                createdByLabel={"Created By"}
                title="title"
                thumbnail="thumbnail"
                type={newsType === "video" ? "news" : "video"}
                createdBy="created_by"
                onClick={() => {
                  navigate(`/news/${item._id}`)
                  window.scrollTo(0, 0)
                }}
              />
            )}
          />
        </div>
      </>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="my-[60px] min-h-[320px]">{renderNewsDetail()}</div>
    </div>
  )
}

export default NewsDetailPage
