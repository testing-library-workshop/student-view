import { render, screen } from "@testing-library/react";
import App from "./App";
import useLocalStorage from "./useLocalStorage";
import { mockTodo } from "./mocks";
import userEvent from "@testing-library/user-event";

jest.mock("./useLocalStorage");

beforeEach(() => {
  jest.mocked(useLocalStorage).mockReturnValue([[], jest.fn()]);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("App", () => {
  it("debería renderizar el heading", () => {
    render(<App />);
    const headingTitle = screen.getByRole("heading", { name: /todos/i });

    expect(headingTitle).toBeVisible();
  });

  it("debería renderizar el componente InputsRow", () => {
    render(<App />);
    const inputRowText = screen.getByPlaceholderText("WHAT needs to be done?");
    const inputRowDate = screen.getByPlaceholderText("WHEN needs to be done?");

    expect(inputRowText).toBeVisible();
    expect(inputRowDate).toBeVisible();
  });

  it("debería renderizar el componente FilterBar", () => {
    render(<App />);

    const filterBarText = screen.getByText(/0 items left/i);

    expect(filterBarText).toBeVisible();
  });
  it("debería renderizar la lista inicial de todos cargados del localStorage", () => {
    const mockTodoList = [mockTodo, mockTodo];
    jest.mocked(useLocalStorage).mockReturnValue([mockTodoList, jest.fn()]);
    render(<App />);

    const list = screen.getAllByRole("listitem");

    expect(list.length).toBe(mockTodoList.length);
  });

  it("Debería renderizar el botón para guardar el estado", () => {
    render(<App />);

    const saveButton = screen.getByRole("button", { name: /Save Todos/i });

    expect(saveButton).toBeVisible();
  });

  it("Al añadir un todo desde el input debe aparecer el último en la lista", () => {
    jest.mocked(useLocalStorage).mockReturnValue([[mockTodo, mockTodo, mockTodo], jest.fn()]);
    render(<App />);
    const todoInput = screen.getByPlaceholderText(/what/i);
    userEvent.type(todoInput, "My todo{Enter}");

    expect(screen.getAllByRole("listitem").at(-1)).toHaveTextContent("My todo");
  });

  it("Al poner un título y una fecha y pulsar enter debe aparecer el último en la lista", () => {
    jest.mocked(useLocalStorage).mockReturnValue([[mockTodo, mockTodo, mockTodo], jest.fn()]);
    render(<App />);
    const todoInput = screen.getByPlaceholderText(/what/i);
    const todoDate = screen.getByPlaceholderText(/when/i);

    userEvent.type(todoInput, "Ultimo todo");
    userEvent.type(todoDate, "2024-01-01{Enter}");

    expect(screen.getAllByRole("listitem").at(-1)).toHaveTextContent("Ultimo todo");
    expect(screen.getAllByRole("listitem").at(-1)).toHaveTextContent("2024-01-01");
  });

  it("Al poner un título y con fecha anterior debe aparecer el checbox marcado", () => {
    jest.mocked(useLocalStorage).mockReturnValue([[mockTodo, mockTodo, mockTodo], jest.fn()]);
    let dateSpyNow = jest.spyOn(Date, "now").mockReturnValue(new Date("2024-01-01").getTime());
    render(<App />);
    const todoInput = screen.getByPlaceholderText(/what/i);
    const todoDate = screen.getByPlaceholderText(/when/i);

    userEvent.type(todoInput, "Ultimo todo");
    userEvent.type(todoDate, "2023-01-01{Enter}");

    expect(screen.getAllByRole("checkbox").at(-1)).toBeChecked();
    dateSpyNow.mockClear();
  });

  it("debería borrar el último de la lista", () => {
    const mockTodoList = [mockTodo, mockTodo, mockTodo];
    jest.mocked(useLocalStorage).mockReturnValue([mockTodoList, jest.fn()]);
    render(<App />);
    const deleteBtns = screen.getAllByRole("button", { name: /x/i });

    userEvent.click(deleteBtns.at(-1));

    const todos = screen.getAllByRole("listitem");
    expect(todos.length).toBe(mockTodoList.length - 1);
  });
});
