import React from "react"
import clsx from "clsx"
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import PropTyes from "prop-types"
import iconArrow from "../../../assets/images/card/arrow-right.svg"
import "swiper/swiper.min.css"
import "swiper/swiper-bundle.min.css"
import "./carousel.scss"

SwiperCore.use([EffectCoverflow, Pagination, Autoplay])

const Carousel = (props) => {
  const {
    title,
    onViewMore,
    carousels = [],
    className,
    wrapperClassName,
    slideClassName,
    renderer,
    breakpoints = {
      780: {
        slidesPerView: 3
      },
      1280: {
        slidesPerView: 5
      },
      1580: {
        slidesPerView: 5
      }
    },
    rest
  } = props

  const total = carousels.length

  return (
    <div className={clsx(className)}>
      {title && (
        <div className="flex justify-between items-center text-green-text-profile mb-6">
          <p className="text--bold">
            {title} ({total})
          </p>
          <div
            className="flex justify-between cursor-pointer items-center"
            onClick={onViewMore}
          >
            <p className="text-green-text-profile text--sm">More</p>
            <img src={iconArrow} alt="more" className="ml-3" />
          </div>
        </div>
      )}
      <div className="carousel">
        <Swiper
          effect={"fade"}
          grabCursor={false}
          loop={true}
          spaceBetween={32}
          pagination={true}
          breakpoints={breakpoints}
          className={clsx(wrapperClassName)}
          {...rest}
        >
          {carousels.map((item, i) => {
            return (
              <SwiperSlide key={i} className={slideClassName || ""}>
                {renderer(item)}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  carousels: PropTyes.array.isRequired,
  renderer: PropTyes.func.isRequired,
  className: PropTyes.string,
  wrapperClassName: PropTyes.string,
  slideClassName: PropTyes.string,
  onViewMore: PropTyes.func
}

export default Carousel
