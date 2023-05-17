"use client";

import React, { useState } from "react";
import { TextInput } from "../TextInput";
import { ChipInputProps } from "./types";
import clsx from "clsx";

const ChipInput = ({ label, state, ...props }: ChipInputProps) => {
  const [chips, setChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setChips([...chips, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleChipRemove = (index: number) => {
    const updatedChips = chips.filter((_, chipIndex) => chipIndex !== index);
    setChips(updatedChips);
  };

  return (
    <div
      className={clsx(
        " flex relative flex-wrap gap-2 p-2 px-2.5 pb-2.5 pt-4 bg-white focus:px-[9px] focus:pb-[9px] focus:pt-[15px] focus:pr-12 pr-12 w-full text-sm text-black rounded-md border border-primary appearance-none focus:outline-none focus:ring-0 focus:border-2",
        { "border-error": state === "error" },
        { "border-info": state === "info" },
        { "border-warning": state === "warning" },
        { "border-success": state === "success" },
        { "border-primary": !state }
      )}
    >
      {chips.map((chip, index) => (
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
        htmlFor={props.id}
        className={clsx(
          "absolute text-sm cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",
          { "peer-focus:text-error text-error": state === "error" },
          { "peer-focus:text-info text-info": state === "info" },
          { "peer-focus:text-warning text-warning": state === "warning" },
          { "peer-focus:text-success text-success": state === "success" },
          { "text-gray-500": !state }
        )}
      >
        {label}
      </label>
      <input
        className="flex-grow outline-none peer"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
        {...props}
      />
    </div>
  );
};

export default ChipInput;
