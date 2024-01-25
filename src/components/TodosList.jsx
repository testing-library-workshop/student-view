import React from "react";

import { todosActions } from "../reducer";
import Todo from "./Todo";

export default function TodosList({ todos, dispatch }) {
  return (
    <ul>
      {todos.map((todoData, idx) => (
        <Todo
          key={idx}
          todoData={todoData}
          removeSelf={() => dispatch({ type: todosActions.removeTodo, payload: idx })}
          toggleIsCompleted={() => dispatch({ type: todosActions.toggleIsCompleted, payload: idx })}
        />
      ))}
    </ul>
  );
}
