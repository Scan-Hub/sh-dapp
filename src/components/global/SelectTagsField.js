import React, { useEffect, useRef, useState } from "react";
import YupErrorMessage from "../global/YupErrorMessage";
const SelectTagsField = ({
  required = false,
  className,
  title,
  data,
  name,
  setValue,
  error,
}) => {
  const inputRef = useRef(null);
  const [showListTags, setShowListTags] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [dataFilter, setDataFilter] = useState(data);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [idsSelected, setIdsSelected] = useState([]);

  const onSearch = (searchKey) => {
    setSearchKey(searchKey);
    setShowListTags(searchKey.length >= 0);
    setDataFilter(
      data.filter((item) => {
        if (item.name.toUpperCase().includes(searchKey.toUpperCase())) {
          return true;
        }
        return false;
      })
    );
  };

  const onSelectNewTag = (item) => {
    addTag(item);
    setShowListTags(false);
    setSearchKey("");
    inputRef.current.focus();
  };

  const addTag = (item) => {
    const index = tagsSelected.findIndex((tag) => tag._id === item._id);
    if (index === -1) {
      const updatedItems = [...tagsSelected];
      updatedItems.push(item);
      setTagsSelected(updatedItems);
      setIdsSelected([...idsSelected, item._id]);
      setValue(name, [...idsSelected, item._id], {
        shouldValidate: true,
      });
    }
  };

  const removeTag = (tag) => {
    setTagsSelected(
      tagsSelected.filter((tagData) => {
        return tagData !== tag;
      })
    );
    setIdsSelected(
      idsSelected.filter((id) => {
        return id !== tag._id;
      })
    );
    setValue(
      name,
      idsSelected.filter((id) => {
        return id !== tag._id;
      }),
      {
        shouldValidate: true,
      }
    );
    inputRef.current.focus();
  };

  return (
    <div className={`${className} flex flex-col vcs`}>
      {title && (
        <span className="font-montserrat_semi_bold sm:text-lg text-sm text-white">
          {title}
          {required && (
            <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
              *
            </span>
          )}
        </span>
      )}
      <div className="relative w-full justify-end items-end">
        <div className="flex flex-wrap px-4 pb-[6px] bg-[#191B2A] rounded-lg w-full">
          <div className="flex flex-wrap w-full">
            {tagsSelected.map((item) => (
              <div
                key={item._id}
                className="flex flex-row items-center sm:p-[6px_10px] p-[2px_5px] bg-[#00ca921a] rounded-lg sm:space-x-[14px] space-x-2 sm:mr-[10px] mr-1 mt-[6px]"
              >
                <span className="font-montserrat_medium text-[#00AF71] sm:text-base text-xs">
                  {item.name}
                </span>
                <span
                  className="close text-[#BFBFBF] cursor-pointer"
                  onClick={() => removeTag(item)}
                >
                  &times;
                </span>
              </div>
            ))}
            <div className="p-[6px_10px] rounded-lg space-x-[14px] mr-[10px] mt-[6px] flex-1 relative w-full">
              <input
                onFocus={() => setShowListTags(true)}
                onBlur={() => setShowListTags(false)}
                ref={inputRef}
                className="font-montserrat_medium focus:outline-none text-white text-base bg-transparent w-full"
                type="text"
                value={searchKey}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        {showListTags && dataFilter?.length > 0 && (
          <div
            className="absolute mt-4 w-full p-4 bg-[#191B2A] z-[1] min-w-[250px] max-h-[250px] overflow-auto"
            style={{ top: inputRef?.current?.offsetBottom }}
          >
            {dataFilter?.map((item, index) => (
              <div
                key={item._id}
                className="hover:bg-[#65688133] p-[8px_10px] text-white rounded-lg cursor-pointer"
                onMouseDown={() => onSelectNewTag(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
        {/* {showListTags && dataFilter?.length > 0 && (
          <div
            className="fixed w-screen h-screen top-0 left-0"
            onClick={() => {
              setShowListTags(false);
              setSearchKey("");
              setDataFilter([]);
            }}
          />
        )} */}
        {error && <YupErrorMessage message={error.message} />}
      </div>
    </div>
  );
};

export default React.memo(SelectTagsField);
