import React from "react";

const InputFieldAutoHeight = ({ register, name, error, placeholder }) => {
  const resizeTextArea = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="relative">
      <textarea
        {...register(name, {
          onChange: (e) => {
            resizeTextArea(e);
          },
        })}
        rows="1"
        name={name}
        placeholder={placeholder}
        className="w-full bg-transparent py-2 focus:outline-none text-base text-text-des placeholder:text-text-des font-montserrat font-normal flex flex-row items-center"
      />
      {error && (
        <p className="absolute -bottom-7 sm:text-sm text-xs text-yellow-600 dark:text-yellow-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputFieldAutoHeight;
