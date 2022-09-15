import React, { useCallback, useEffect, useRef, useState } from "react";
import YupErrorMessage from "../global/YupErrorMessage";
import CheckBox from "./CheckBox";
const CheckBoxGroup = ({
  required = false,
  className,
  classNameContent,
  title,
  data,
  name,
  setValue,
  error,
}) => {
  const [checkedContent, setCheckedContent] = useState([]);

  const handleCheckClick = useCallback(
    (e) => {
      const { value, checked } = e.target;
      if (checked) {
        setCheckedContent([...checkedContent, value]);
      } else {
        setCheckedContent(checkedContent.filter((e) => e !== value));
      }
    },
    [checkedContent]
  );

  useEffect(() => {
    setValue(name, checkedContent, { shouldValidate: true });
  }, [checkedContent]);

  return (
    <div className={`${className} flex flex-col`}>
      {title && (
        <span className="font-montserrat_semi_bold text-lg text-white">
          {title}
          {required && (
            <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
              *
            </span>
          )}
        </span>
      )}
      <div className={`${classNameContent} flex flex-col`}>
        {data.map((item) => (
          <CheckBox
            className={"font-montserrat_medium text-base text-white space-x-3"}
            id={item.id}
            value={item.value}
            handleCheckClick={handleCheckClick}
          />
        ))}
      </div>
      {error && <YupErrorMessage message={error.message} />}
    </div>
  );
};

export default CheckBoxGroup;
