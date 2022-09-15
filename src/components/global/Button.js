import React from "react";

const Button = ({
  type = "button",
  disabled = "false",
  title,
  className,
  onClickBtn,
}) => {
  return (
    <button
      type={type}
      className={`${
        className ? className : "px-20 py-3 rounded-[32px] "
      }  bg-btn-bg text-white font-montserrat font-bold text-base`}
      onClick={onClickBtn}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
