import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import Banner from "../components/home/banner"
import BlockList from "../components/home/block-list/block-list"
import NewsItem from "../components/news/NewsItem"
import Carousel from "../components/global/carousel"
import HomePageSubscription from "../components/home/Subscription"
import { fetchListNews } from "../actions/metadata.actions"
import { selectListNews, selectListVideos } from "../reducers/metadata.reducer"

import "../assets/styles/home.scss"

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const listNews = useSelector(selectListNews)
  const listVideos = useSelector(selectListVideos)

  useEffect(() => {
    dispatch(
      fetchListNews({
        type: "news"
      })
    )
    dispatch(
      fetchListNews({
        type: "video"
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="sh_homepage">
      <div className="container">
        <div className="px-4 pt-[30px] lg:px-0 lg:pt-0 pb-24">
          <Banner />
          <BlockList />
          <Carousel
            className="mb-16"
            title="Video Review"
            carousels={listVideos.items}
            renderer={(item, index) => (
              <NewsItem
                key={`card_key_${index}`}
                item={item}
                color="light"
                createdByLabel={"Created By"}
                title="title"
                type="video"
                createdBy="created_by"
                onClick={() => {
                  navigate(`/news/${item._id}`)
                }}
              />
            )}
            onViewMore={() => {
              navigate({
                pathname: "/news",
                search: "?type=video"
              })
            }}
          />
          <Carousel
            title="News"
            carousels={listNews.items}
            renderer={(item, index) => (
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
            )}
            onViewMore={() => {
              navigate({
                pathname: "/news",
                search: "?type=news"
              })
            }}
          />
          <HomePageSubscription />
        </div>
      </div>
    </section>
  )
}

export default HomePage
