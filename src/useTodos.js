import { useEffect, useMemo, useReducer } from "react";
import reducer, { filterStates, todosActions } from "./reducer";
import useLocalStorage from "./useLocalStorage";

export default function useTodos(initialTodos = []) {
  const [savedTodos, setSavedTodos] = useLocalStorage("todos", initialTodos);

  const [{ todos, filter }, dispatch] = useReducer(reducer, {
    todos: initialTodos,
    filter: "all",
  });

  useEffect(() => {
    dispatch({
      type: todosActions.loadTodos,
      payload: Array.isArray(savedTodos) && savedTodos.length ? savedTodos : initialTodos,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    if (filter === filterStates.all) return todos;
    if (filter === filterStates.completed) return todos.filter((todo) => todo.isCompleted);
    if (filter === filterStates.active) return todos.filter((todo) => !todo.isCompleted);
  }, [filter, todos]);

  return { todos: filteredTodos, filter, dispatch, saveTodos: setSavedTodos };
}
