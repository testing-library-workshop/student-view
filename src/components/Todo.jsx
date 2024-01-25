import React from "react";

import "./Todo.css";

export default function Todo({ todoData, removeSelf, toggleIsCompleted }) {
  const { text, date, isCompleted } = todoData;

  const isCompletedOrOutdated = isCompleted;
  return (
    <li className={isCompletedOrOutdated ? "completed" : ""}>
      <input type="checkbox" checked={isCompletedOrOutdated} onChange={toggleIsCompleted} />
      <div className="flexContainer">
        <span>{text}</span>
        <span>{date}</span>
      </div>
      <button onClick={removeSelf}>x</button>
    </li>
  );
}
