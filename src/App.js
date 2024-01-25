import FilterBar from "./components/FilterBar";
import InputsRow from "./components/InputsRow";
import TodosList from "./components/TodosList";
import { todosActions } from "./reducer";

import "./App.css";
import useTodos from "./useTodos";

function App() {
  const { todos, filter, dispatch, saveTodos } = useTodos();

  const addTodo = ({ name, date }) => dispatch({ type: todosActions.addTodo, payload: { text: name, date } });

  return (
    <div className="App">
      <h1>Todos</h1>
      <main>
        <InputsRow addTodo={addTodo} />
        <br />
        <br />
        <FilterBar filter={filter} totalItems={todos.length} dispatch={dispatch} />
        <br />
        <TodosList dispatch={dispatch} todos={todos} />
        <br />
        <br />
        <br />
        <button className="saveBtn" onClick={() => saveTodos(todos)}>
          Save Todos
        </button>
      </main>
    </div>
  );
}

export default App;
