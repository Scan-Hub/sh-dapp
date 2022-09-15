// import bgNewsBanner from "../../assets/images/news/news_head.jpg"
import Carousel from "../global/carousel"

function NewsBanner(props) {
  const { data } = props
  return (
    <div className="mb-16">
      <Carousel
        carousels={data}
        breakpoints={{
          780: {
            slidesPerView: 1
          },
          1280: {
            slidesPerView: 1
          },
          1580: {
            slidesPerView: 1
          }
        }}
        renderer={(item, index) => (
          <div
            key={`banner_news${index}`}
            className="rounded-3xl h-[400px] overflow-hidden"
          >
            <img
              src={item.thumbnail}
              className="w-full max-h-full object-cover"
              alt={item.title}
            />
          </div>
        )}
      />
    </div>
  )
}

export default NewsBanner
