import { checkIfStringDateIsBeforeToday } from "./utils";

export const filterStates = {
  completed: "completed",
  active: "active",
  all: "all",
};

export const todosActions = {
  addTodo: "addTodo",
  removeTodo: "removeTodo",
  toggleIsCompleted: "toggleIsCompleted",
  showCompleteds: "showCompleteds",
  showActives: "showActives",
  showAll: "showAll",
  loadTodos: "loadTodos",
};

const addTodo = (todos, payload) => {
  if (!payload || !payload.text) return todos;
  return [
    ...todos,
    {
      text: payload.text,
      date: payload.date,
      isCompleted: checkIfStringDateIsBeforeToday(payload.date),
    },
  ];
};

const toggleIsCompleted = (todos, payload) =>
  todos.map((todo, index) =>
    index !== payload ? todo : { ...todo, isCompleted: checkIfStringDateIsBeforeToday(todo.date) || !todo.isCompleted }
  );

const removeTodo = (todos, payload) => todos.filter((val, index) => index !== payload);
const loadTodos = (todos, payload) => payload;

export default function reducer({ todos, filter }, { type, payload }) {
  const newTodos = {
    [todosActions.addTodo]: addTodo,
    [todosActions.removeTodo]: removeTodo,
    [todosActions.toggleIsCompleted]: toggleIsCompleted,
    [todosActions.loadTodos]: loadTodos,
  };

  const activeFilter = (() => {
    if (type === todosActions.showCompleteds) return filterStates.completed;
    if (type === todosActions.showActives) return filterStates.active;
    if (type === todosActions.showAll) return filterStates.all;
    return filter;
  })();

  return { todos: !newTodos["hasOwnProperty"](type) ? todos : newTodos[type](todos, payload), filter: activeFilter };
}
