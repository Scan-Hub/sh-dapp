import React, { useCallback, useState } from "react";
import IcPlus from "../../../assets/images/profile/plus_community.svg";
import IcTelegram from "../../../assets/images/profile/telegram.svg";
import IcTwitter from "../../../assets/images/profile/twitter.svg";
import IcInstagram from "../../../assets/images/profile/instagram.svg";
import IcFacebook from "../../../assets/images/profile/facebook.svg";
import IcDiscord from "../../../assets/images/profile/discord_circle.svg";
import IcYoutube from "../../../assets/images/profile/youtube.svg";
import IcMedium from "../../../assets/images/profile/medium.svg";
import IcLinkedin from "../../../assets/images/profile/linkedin.svg";
import { randomKeyUUID } from "../../../_helpers/utils/lib";

const communities = [
  {
    id: randomKeyUUID(),
    code: "telegram",
    link: "",
    iconLeft: IcTwitter,
    placeholder: "Add Telegram link",
    title: "Twitter",
  },
  {
    id: randomKeyUUID(),
    code: "instagram",
    link: "",
    iconLeft: IcInstagram,
    placeholder: "Add Instagram link",
    title: "Instagram",
  },
  {
    id: randomKeyUUID(),
    code: "telegram",
    link: "",
    iconLeft: IcTelegram,
    placeholder: "Add Telegram link",
    title: "Telegram",
  },
  {
    id: randomKeyUUID(),
    code: "facebook",
    link: "",
    iconLeft: IcFacebook,
    placeholder: "Add Facebook link",
    title: "Facebook",
  },
  {
    id: randomKeyUUID(),
    code: "discord",
    link: "",
    iconLeft: IcDiscord,
    placeholder: "Add Discord link",
    title: "Discord",
  },
  {
    id: randomKeyUUID(),
    code: "youtube",
    link: "",
    iconLeft: IcYoutube,
    placeholder: "Add Youtube link",
    title: "Youtube",
  },
  {
    id: randomKeyUUID(),
    code: "medium",
    link: "",
    iconLeft: IcMedium,
    placeholder: "Add Medium link",
    title: "Medium",
  },
  {
    id: randomKeyUUID(),
    code: "linkedin",
    link: "",
    iconLeft: IcLinkedin,
    placeholder: "Add Linkedin link",
    title: "Linkedin",
  },
];

const CommunityPlus = ({ onAddCommunity }) => {
  const [showMore, setShowMore] = useState(false);
  const onShowMoreCommunity = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <button
        type="button"
        className="w-12 h-12 bg-popupVb flex flex-col items-center justify-center rounded-lg relative"
        onClick={onShowMoreCommunity}
      >
        <img alt="plus" src={IcPlus} />
        {showMore && (
          <div className="absolute rounded-lg bg-box-bg top-16 right-0 grid grid-cols-2 w-[300px] z-[1]">
            {communities.map((community) => (
              <button
                type="button"
                className="flex flex-row py-3 px-4 w-[150px] space-x-2 items-center"
                onClick={() => onAddCommunity(community)}
              >
                <img src={community.iconLeft} alt="icon" className="w-6" />
                <p>{community.title}</p>
              </button>
            ))}
          </div>
        )}
      </button>
      {showMore && (
        <div
          className="fixed w-screen h-screen top-0 left-0"
          onClick={() => setShowMore(false)}
        />
      )}
    </div>
  );
};

export default CommunityPlus;
