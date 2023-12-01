"use client";

import React, { useEffect, useState } from "react";
import { ChipInputProps } from "./types";
import clsx from "clsx";

const ChipInput = ({
  label,
  state,
  id = "chips-focus__",
  chipsValue = [],
  setChipsValue,
  ...props
}: ChipInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [focus, setFocus] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setChipsValue([...chipsValue, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleChipRemove = (index: number) => {
    const updatedChips = chipsValue.filter(
      (_, chipIndex) => chipIndex !== index
    );
    setChipsValue(updatedChips);
  };

  return (
    <div
      className={clsx(
        " flex relative flex-wrap gap-2 p-2 px-2.5 pb-2.5 pt-4 bg-white  pr-12 w-full text-sm text-black rounded-md border border-primary appearance-none ",
        { "!border-error": state === "error" },
        { "!border-info": state === "info" },
        { "!border-warning": state === "warning" },
        { "!border-success": state === "success" },
        { "!border-primary": !state },
        {
          "px-[9px] pb-[9px] pt-[15px] pr-12 outline-none ring-0 border-2":
            focus,
        }
      )}
    >
      {chipsValue.map((chip, index) => (
        <div
          key={index}
          className="flex items-center px-2 bg-gray-200 rounded-md text-gray-700"
        >
          <span className="mr-1">{chip}</span>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => handleChipRemove(index)}
          >
            X
          </button>
        </div>
      ))}
      <label
        htmlFor={id}
        className={clsx(
          "absolute text-sm cursor-text text-gray-500 duration-300 transform top-3 z-10 origin-[0] bg-white px-2  left-1",
          { "!text-error": focus && state === "error" },
          { "text-info": focus && state === "info" },
          {
            "!text-warning": focus && state === "warning",
          },
          {
            "!text-success": focus && state === "success",
          },
          { "!text-gray-500": !state },
          {
            "-translate-y-6 scale-75 px-2 text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4":
              focus || chipsValue?.length !== 0,
          }
        )}
      >
        {label}
      </label>
      <input
        id={id}
        className="flex-grow outline-none peer"
        value={inputValue}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(chipsValue.length !== 0)}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
        {...props}
      />
    </div>
  );
};

export default ChipInput;
