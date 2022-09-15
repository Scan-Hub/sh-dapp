import imgSubscriptionBg from "../../assets/images/subscription_bg.png"
import imgSubscription3d from "../../assets/images/subscription_3d.png"
import { useNavigate } from "react-router";
import { shallowEqual, useSelector } from "react-redux";

function HomePageSubscription() {

  const profile = useSelector((state) => state.profile.data, shallowEqual);

  const navigate = useNavigate();

  const handleClickSub  = (e) => {
    e.preventDefault();
    if(profile){
      navigate("../profile", { replace: true });
    }else{
      navigate("../connectwallet", { replace: true });
    }
  }

  return (
    <div className="hidden lg:block mx-auto lg:w-[1280px] mt-[162px] ">
      <div className="relative h-[304px]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-center max-w-[566px] pl-[100px] pt-[80px]">
            <p className="text--bold-xl mb-2">
              Be the first to know about crypto news everyday
            </p>
            <p className="text--regular text-[#E8E8E8]">
              Get crypto analysis, news and updates right to your inbox! Sign up 
              here so you don't miss a single newsletter.
            </p>
            <div className="mt-8">
              <button onClick={(e)=>{handleClickSub(e)}} className="sh_btn btn_primary w-[160px] !h-[44px] !rounded-[32px] items-center  justify-center text--semibold">
                Subscription
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-[420px] h-[400px] z-1">
            <img
              src={imgSubscription3d}
              className="w-full object-contain"
              alt="imgSubscription3d"
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full">
          <img
            src={imgSubscriptionBg}
            className="w-full object-cover"
            alt="imgSubscriptionBg"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePageSubscription
