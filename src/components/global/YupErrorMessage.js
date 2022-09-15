import React from "react";
const YupErrorMessage = ({ message, className }) => {
  return (
    <p
      className={`${
        className && className
      } absolute left-1 -bottom-5 sm:text-sm text-xs text-yellow-600 dark:text-yellow-500`}
    >
      {message}
    </p>
  );
};

export default YupErrorMessage;
