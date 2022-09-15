import React, { useEffect, useState } from "react";
import YupErrorMessage from "../../global/YupErrorMessage";
import PropTypes from "prop-types";
import IcTelegram from "../../../assets/images/profile/telegram.svg";
import IcTwitter from "../../../assets/images/profile/twitter.svg";
import IcMedium from "../../../assets/images/profile/medium.svg";
import IcDiscord from "../../../assets/images/profile/discord_circle.svg";
import IcInstagram from "../../../assets/images/profile/instagram.svg";
import IcFacebook from "../../../assets/images/profile/facebook.svg";
import IcYoutube from "../../../assets/images/profile/youtube.svg";
import IcLinkedin from "../../../assets/images/profile/linkedin.svg";
import { partials } from "../../../assets";
const CommunityField = ({
  community,
  onRemoveCommunity,
  name,
  onChange,
  value,
  error,
  disable,
}) => {
  const [title, setTitle] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [icon, setIcon] = useState("");
  const [showRemove, setShowRemove] = useState(false);
  useEffect(() => {
    switch (community?.code) {
      case "twitter":
        setTitle("Twitter");
        setPlaceHolder("Add Twitter link");
        setIcon(IcTwitter);
        break;
      case "telegram":
        setTitle("Telegram");
        setPlaceHolder("Add Telegram link");
        setIcon(IcTelegram);
        break;
      case "discord":
        setTitle("Discord");
        setPlaceHolder("Add Discord link");
        setIcon(IcDiscord);
        break;
      case "medium":
        setTitle("Medium");
        setPlaceHolder("Add Medium link");
        setIcon(IcMedium);
        break;
      case "youtube":
        setTitle("Youtube");
        setPlaceHolder("Add Youtube link");
        setIcon(IcYoutube);
        break;
      case "instagram":
        setTitle("Instagram");
        setPlaceHolder("Add Instagram link");
        setIcon(IcInstagram);
        break;
      case "facebook":
        setTitle("Facebook");
        setPlaceHolder("Add Facebook link");
        setIcon(IcFacebook);
        break;
      case "linkedin":
        setTitle("Facebook");
        setPlaceHolder("Add Linkedin link");
        setIcon(IcLinkedin);
        break;
      default:
        break;
    }
  }, [community]);

  return (
    <div
      className="relative rounded-lg flex flex-row items-center bg-box-bg h-12"
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
    >
      <input
        id={value?.id}
        type="text"
        autoComplete="off"
        placeholder={placeHolder}
        className={`${
          icon && "sm:pl-12 pl-8"
        } bg-box-bg focus:ring-1 focus:ring-vbDisableText focus:rounded-lg rounded-lg py-[12px] px-[16px] focus:outline-none appearance-none w-full font-montserrat placeholder:text-placeholder-text ${
          disable ? "text-disabled-text" : "text-white"
        } placeholder:text-sm placeholder:sm:text-base sm:text-base text-sm`}
        name={name}
        value={value?.name}
        onChange={onChange}
      />
      {community && icon && (
        <img
          src={icon}
          alt="iconLeft"
          className="absolute left-0 sm:w-6 w-5 sm:ml-3 ml-2"
        />
      )}
      {showRemove && (
        <img
          src={partials.IcRemoveCommunity}
          alt="remove"
          className="absolute top-[-12px] right-[-12px] w-6 h-6"
          onClick={() => onRemoveCommunity(community?.id)}
        />
      )}
      {error && <YupErrorMessage message={error?.message} />}
    </div>
  );
};
CommunityField.propTypes = {
  required: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.object,
  placeHolder: PropTypes.string.isRequired,
};
export default CommunityField;
