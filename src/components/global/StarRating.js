import React from "react";
import StarRatings from "react-star-ratings";
import { global } from "../../assets";

const StarRating = ({
  maxStar = 5,
  value = 0,
  name = "rating",
  disableColor = "#656881",
  activeColor = "#E26B45",
  onChange,
  size = "25px",
  spacing = "7px",
}) => {
  return (
    // <ReactStars
    //   count={maxStar}
    //   color={disableColor}
    //   activeColor={activeColor}
    //   classNames={className}
    //   onChange={onChange}
    //   filledIcon={<img src={global.IcStartActive} alt="" />}
    //   emptyIcon={<img src={global.IcStartDisable} alt="" />}
    // />
    <StarRatings
      rating={value}
      starRatedColor={activeColor}
      starEmptyColor={disableColor}
      changeRating={onChange}
      numberOfStars={maxStar}
      name={name}
      // svgIconPath={require("../../assets/images/global/ic_star_active.svg").default}
      starDimension={size}
      starSpacing={spacing}
    />
  );
};

export default React.memo(StarRating);
