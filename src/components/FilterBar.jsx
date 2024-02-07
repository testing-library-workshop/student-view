import React from "react";
import { filterStates, todosActions } from "../reducer";

export default function FilterBar({ totalItems, dispatch, filter }) {
  if (totalItems < 0) throw new Error('mensaje');

  return (
    <div className="filterBar">
      <span>{`${totalItems} item${totalItems !== 1 ? "s" : ""} left`}</span>
      <button
        className={filter === filterStates.all ? "active" : ""}
        onClick={() => dispatch({ type: todosActions.showAll })}
      >
        All
      </button>
      <button
        className={filter === filterStates.active ? "active" : ""}
        onClick={() => dispatch({ type: todosActions.showActives })}
      >
        Active
      </button>
      <button
        className={filter === filterStates.completed ? "active" : ""}
        onClick={() => dispatch({ type: todosActions.showCompleteds })}
      >
        Completed
      </button>
    </div>
  );
}
