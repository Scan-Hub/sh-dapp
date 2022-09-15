import React, { useState } from "react";
import { Controller } from "react-hook-form";
import EditorField from "../global/EditorField";

const defaultTitles = [
  {
    title: "Highlights",
    description: "",
  },
  { title: "Description", description: "" },
];
const AboutProject = (props) => {
  const { name, control } = props;
  const [titles, setTitles] = useState(defaultTitles);
  const [indexSelected, setIndexSelected] = useState(0);

  const onAddMoreTitle = () => {
    let tempTitles = [].concat(titles);
    tempTitles.push({
      id: titles.length + 1,
      required: false,
      title: "",
      content: "",
    });
    setTitles(tempTitles);
  };

  return (
    <div>
      <p className="sm:text-xl text-lg font-montserrat_semi_bold font-bold text-green-text-profile">
        About Project
      </p>
      <div className="flex sm:flex-row flex-col w-full sm:space-x-12 sm:mt-12 mt-8">
        <div className="space-y-1">
          {titles.map((title, index) => {
            const fieldName = `${name}.${index}`;
            return (
              <Controller
                key={`${name}.${index}`}
                name={fieldName}
                control={control}
                render={({ field, formState: { errors } }) => {
                  if (index === 0) {
                  }
                  return (
                    <button
                      type="button"
                      className={`${
                        indexSelected === index ? "bg-box-bg" : "bg-transparent"
                      } relative rounded-lg flex flex-row items-center`}
                      onClick={() => {
                        setIndexSelected(index);
                      }}
                    >
                      <input
                        className={`bg-transparent focus:ring-1 focus:ring-vbDisableText focus:rounded-lg rounded-lg py-[12px] px-[16px] w-full focus:outline-none appearance-none font-montserrat placeholder:text-placeholder-text
          text-white placeholder:text-sm placeholder:sm:text-base sm:text-base text-sm`}
                        name={fieldName}
                        autoComplete="off"
                        placeholder={`${
                          index !== 0 || index !== 1 ? "Enter title" : ""
                        }`}
                        disabled={index === 0 || index === 1 ? true : false}
                        value={
                          index === 0
                            ? "Highlights"
                            : index === 1
                            ? "Description"
                            : field.value?.title
                        }
                        onChange={(e) => {
                          field.onChange({
                            target: {
                              name: fieldName,
                              value: {
                                ...field.value,
                                title:
                                  index === 0
                                    ? "Highlights"
                                    : index === 1
                                    ? "Description"
                                    : e.target.value,
                              },
                            },
                          });
                        }}
                      />
                      {(index === 0 || index === 1) && (
                        <p className="absolute right-16 sm:text-lg text-base font-semibold font-montserrat_semi_bold text-[#F5222D] ml-1">
                          *
                        </p>
                      )}
                    </button>
                  );
                }}
              />
            );
          })}
          <button
            type="button"
            className="py-[10px] px-4"
            onClick={onAddMoreTitle}
          >
            + Add title
          </button>
        </div>
        <div className="w-full flex flex-row sm:space-x-12 sm:mt-0 mt-4">
          <div className="sm:flex hidden w-[1px] h-full bg-vbDisableText" />
          {titles.map((_, index) => {
            const fieldName = `${name}.${index}`;
            return (
              <Controller
                key={`${name}.${index}`}
                name={fieldName}
                control={control}
                render={({ field, formState: { errors } }) => {
                  return (
                    <div
                      className={`${
                        indexSelected === index ? "flex" : "hidden"
                      } w-full`}
                    >
                      <EditorField
                        error={
                          errors?.about_projects &&
                          errors.about_projects[indexSelected]?.description
                        }
                        placeholder={`Enter ${field.value?.title}`}
                        name={fieldName}
                        content={field.value?.description}
                        onEditorChange={(html) => {
                          field.onChange({
                            target: {
                              name: fieldName,
                              value: {
                                ...field.value,
                                description: html,
                              },
                            },
                          });
                        }}
                      />
                    </div>
                  );
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
