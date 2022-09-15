import React from "react"
import logo from "../../assets/images/logo.png"
import iconTelegram from "../../assets/images/footer/telegram.png"
import iconTwitter from "../../assets/images/footer/twitter.png"
import iconDiscord from "../../assets/images/footer/discord.png"
import iconMedium from "../../assets/images/footer/medium.png"
import iconUp from "../../assets/images/footer/icon-up.png"

const COMMUNITY = [
  {
    path: "/",
    icon: iconTelegram,
    label: "Telegram"
  },
  {
    path: "/",
    icon: iconTwitter,
    label: "Twitter"
  },
  {
    path: "/",
    icon: iconDiscord,
    label: "Discord"
  },
  {
    path: "/",
    icon: iconMedium,
    label: "Medium"
  }
]

const SUPPORT = [
  {
    path: "/",
    label: "Getting Started"
  },
  {
    path: "/",
    label: "FAQ"
  }
]

const ABOUT = [
  {
    path: "/",
    label: "About us"
  },
  {
    path: "/",
    label: "Docs"
  }
]

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }
  return (
    <div className="relative bg-gradient-to-r from-[#181f2d] to-[#181427] pb-[100px] px-4 lg:px-0">
      <div className="lg:container lg:pt-[55px] max-w-[1320px] mx-auto flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col justify-center items-center py-12 lg:py-0 lg:block xl:pr-0 lg:pr-20 pr-0">
          <img src={logo} alt="logo" className="h-[44px] lg:h-[45px]" />
          <p className="my-4 text-center lg:text-left text--regular">
            Better Blockchain information, Better Oppotunity for all.
          </p>
          <p className="text--sm text-[#898ca9]">© 2022 ScanHub</p>
        </div>
        <div className="w-full lg:w-auto flex justify-between items-baseline space-x-0 lg:space-x-[120px]">
          <div className="space-y-4">
            <p className="text--semibold text-green-text-profile">SUPPORT</p>
            {SUPPORT.map((item) => (
              <p className="text--sm text-[#D9D9D9]" key={item.label}>
                {item.label}
              </p>
            ))}
          </div>
          <div className="space-y-4">
            <p className="text--semibold text-green-text-profile">ABOUT</p>
            {ABOUT.map((item) => (
              <p className="text--sm text-[#D9D9D9]" key={item.label}>
                {item.label}
              </p>
            ))}
          </div>
          <div className="space-y-6">
            <p className="text--semibold text-green-text-profile">COMMUNITY</p>
            {COMMUNITY.map((item) => (
              <div key={item.label} className="flex items-center gap-x-3">
                <div className="w-[20px] h-[20px]">
                  <img src={item.icon} alt={item.label} />
                </div>
                <span className="text--sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-4 lg:right-10 bottom-10 lg:bottom-16 cursor-pointer">
        <img
          className="h-[48px]"
          alt="scroll up"
          src={iconUp}
          onClick={scrollToTop}
        />
      </div>
    </div>
  )
}
export default Footer
