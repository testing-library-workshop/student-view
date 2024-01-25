import React, { useState, useRef } from "react";

export default function InputsRow({ addTodo }) {
  const inputRef = useRef();
  const dateRef = useRef();

  const [isDateFocused, setIsDateFocused] = useState(false);

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo({ name: inputRef.current.value, date: dateRef.current.value });
      inputRef.current.value = "";
      dateRef.current.value = "";
    }
  };

  return (
    <div className="inputsRow">
      <input type="text" ref={inputRef} placeholder="WHAT needs to be done?" onKeyDown={onKeyDown} />
      <input
        type={isDateFocused ? "date" : "text"}
        ref={dateRef}
        onFocus={() => setIsDateFocused(true)}
        onBlur={() => setIsDateFocused(false)}
        placeholder="WHEN needs to be done?"
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
