import { render, screen } from "@testing-library/react";
import App from "./App";
import useLocalStorage from "./useLocalStorage";
import {  todoNotCompleted, todoCompleted, todoCaducado } from "./mocks";
import userEvent from "@testing-library/user-event";

jest.mock("./useLocalStorage");

describe("App", () => {

  beforeEach(() => {
    jest.mocked(useLocalStorage).mockReturnValue([[], jest.fn()]);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    const mockTodoList = [todoNotCompleted, todoNotCompleted];
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
    jest.mocked(useLocalStorage).mockReturnValue([[todoNotCompleted, todoNotCompleted, todoNotCompleted], jest.fn()]);
    render(<App />);
    const todoInput = screen.getByPlaceholderText(/what/i);
    userEvent.type(todoInput, "My todo{Enter}");

    expect(screen.getAllByRole("listitem").at(-1)).toHaveTextContent("My todo");
  });

  it("Al poner un título y una fecha y pulsar enter debe aparecer el último en la lista", () => {
    jest.mocked(useLocalStorage).mockReturnValue([[todoNotCompleted, todoNotCompleted, todoNotCompleted], jest.fn()]);
    render(<App />);
    const todoInput = screen.getByPlaceholderText(/what/i);
    const todoDate = screen.getByPlaceholderText(/when/i);

    userEvent.type(todoInput, "Ultimo todo");
    userEvent.type(todoDate, "2024-01-01{Enter}");

    expect(screen.getAllByRole("listitem").at(-1)).toHaveTextContent("Ultimo todo");
    expect(screen.getAllByRole("listitem").at(-1)).toHaveTextContent("2024-01-01");
  });

  it("Al poner un título y con fecha anterior debe aparecer el checbox marcado", () => {
    jest.mocked(useLocalStorage).mockReturnValue([[todoNotCompleted, todoNotCompleted, todoNotCompleted], jest.fn()]);
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
    const mockTodoList = [todoNotCompleted, todoNotCompleted, todoNotCompleted];
    jest.mocked(useLocalStorage).mockReturnValue([mockTodoList, jest.fn()]);
    render(<App />);
    const deleteBtns = screen.getAllByRole("button", { name: /x/i });

    userEvent.click(deleteBtns.at(-1));

    const todos = screen.getAllByRole("listitem");
    expect(todos.length).toBe(mockTodoList.length - 1);
  });

  describe('cuando hacemos click en checkbox', ()=>{
    beforeEach(() => {
      jest.mocked(useLocalStorage).mockReturnValue([[], jest.fn()]);
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });
    
    it("Deberia cambiar a checked", () => {
      const mockTodoList = [todoNotCompleted, todoNotCompleted, todoNotCompleted];
      jest.mocked(useLocalStorage).mockReturnValue([mockTodoList, jest.fn()]);
      render(<App />);
      const inputChecks = screen.getAllByRole("checkbox")
  
      expect(inputChecks.at(-1)).not.toBeChecked()
  
      userEvent.click(inputChecks.at(-1))
  
      expect(inputChecks.at(-1)).toBeChecked()
    });
  
    it("debría cambiar a not checked si la fecha del todo aún no ha caducado", () => {
      const todoDate = todoCompleted.date
      // const oneYearLater = new Date(todoDate).setFullYear(new Date(todoDate).getFullYear() + 1)
      // console.log(oneYearLater)
      // let dateSpyNow = jest.spyOn(Date, "now").mockReturnValue(oneYearLater);
      const mockTodoList = [todoCompleted];
      jest.mocked(useLocalStorage).mockReturnValue([mockTodoList, jest.fn()]);
      render(<App />);
      const inputChecks = screen.getAllByRole("checkbox")
      expect(inputChecks.at(-1)).toBeChecked()
      
      userEvent.click(inputChecks.at(-1))
      
      expect(inputChecks.at(-1)).not.toBeChecked();

      // dateSpyNow.mockClear();
    });

    it("No debría desmarcarse si la fecha está caducada", () => {
      const mockTodoList = [todoCaducado, todoCaducado];
      jest.mocked(useLocalStorage).mockReturnValue([mockTodoList, jest.fn()]);
      render(<App />);
      const inputChecks = screen.getAllByRole("checkbox")
      expect(inputChecks.at(-1)).toBeChecked()
      
      userEvent.click(inputChecks.at(-1))
      
      expect(inputChecks.at(-1)).toBeChecked()
    });

    describe('Filtrado de todos', () => {
      it('Comprobar que cuando filtramos por completed se actualiza la lista de todos correctamente', () => {
        const mockTodoList = [todoNotCompleted, todoCompleted, todoCaducado];
        jest.mocked(useLocalStorage).mockReturnValue([mockTodoList, jest.fn()]);
        const dateSpyNow = jest.spyOn(Date, "now").mockReturnValue(new Date("2024-01-01").getTime());
        render(<App />);
        const todosList = screen.getAllByRole('listitem');
        expect(todosList.length).toBe(3);

        const filterCompletedButton = screen.getByRole('button', {name: /completed/i});
        userEvent.click(filterCompletedButton);

        expect(screen.getAllByRole('listitem').length).toBe(2);
        dateSpyNow.mockClear();
      });

      it('Comprobar que cuando filtramos por no completed se actualiza la lista de todos correctamente', () => {
        const mockTodoList = [todoCompleted, todoNotCompleted, todoNotCompleted];
        jest.mocked(useLocalStorage).mockReturnValue([mockTodoList, jest.fn()]);
        const dateSpyNow = jest.spyOn(Date, "now").mockReturnValue(new Date("2024-01-01").getTime());
        render(<App />);
        const todosList = screen.getAllByRole('listitem');
        expect(todosList.length).toBe(3);

        const filterCompletedButton = screen.getByRole('button', {name: /active/i});
        userEvent.click(filterCompletedButton);

        expect(screen.getAllByRole('listitem').length).toBe(2);
        dateSpyNow.mockClear();
      });

    });
    
  });
  it('deberia llamar al setLocalStorage con la lista de todos en ese momento', ()=>{
    const mockedSetLocalStorage = jest.fn();
    jest.mocked(useLocalStorage).mockReturnValue([[todoCompleted, todoNotCompleted], mockedSetLocalStorage]);
    render(<App/>)
    const saveBtn = screen.getByRole('button', {name: /Save Todos/i});

    userEvent.click(saveBtn);

    expect(mockedSetLocalStorage).toHaveBeenCalledTimes(1);
    expect(mockedSetLocalStorage).toHaveBeenCalledWith([todoCompleted, todoNotCompleted]);
  });

  it('deberia aparecer una alerta si intentamos borrar un todo', ()=>{
    const alertMock = jest.spyOn(window,'alert'); 
    jest.mocked(useLocalStorage).mockReturnValue([[todoCompleted, todoNotCompleted], jest.fn()]);
    render(<App/>)

    const saveBtn = screen.getAllByRole('button', {name: /x/i})[0];
    userEvent.click(saveBtn);

    expect(alertMock).toHaveBeenCalledTimes(1);
  })

  
});
