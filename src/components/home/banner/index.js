
import bgHomepageBanner from "../../../assets/images/block-list/bg_homepage_banner.png";
import SearchInput from "../search/SearchInput";

function HomePageBanner() {
  return (
    <div className="hidden md:block mt-8 relative h-[500px]">
      <img
        src={bgHomepageBanner}
        className="absolute top-0 left-0 object-cover"
        alt="bg_homepage_banner"
      />
      <div className="absolute bottom-[136px] w-full px-[105px]">
        <div className="sh_text_field horizontal transparent">
            <SearchInput />
        </div>
      </div>
    </div>
  )
}

export default HomePageBanner
