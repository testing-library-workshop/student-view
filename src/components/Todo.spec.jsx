import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import userEvent from "@testing-library/user-event";

const fakeData = { text: "text todo", date: "", isCompleted: false };

describe("Todo", () => {
  it("should render a checkbox", () => {
    render(<Todo todoData={fakeData} toggleIsCompleted={jest.fn()}/>);
    expect(screen.getByRole("checkbox")).toBeVisible();
  });

  it("deberia renderizar el texto pasado por parametro en todoData", () => {
    render(<Todo todoData={fakeData} />);

    expect(screen.getByText("text todo")).toBeVisible();
  });

  it("deberia renderizar la fecha pasada por parametro en todoData", () => {
    const fakeData = { text: "", date: "06/02/2024", isCompleted: false };
    render(<Todo todoData={fakeData} />);
    expect(screen.getByText("06/02/2024")).toBeVisible();
  });

  it("deberia renderizar el boton x", () => {
    render(<Todo todoData={fakeData} />);
    expect(screen.getByRole("button", { name: "x" })).toBeVisible();
  });

  it("debería renderizar el estado del checkbox a checked si isCompleted es true", () => {
    render(<Todo todoData={{ ...fakeData, isCompleted: true }} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it('deberia llamar a la funcion toggleIsCompleted cuando hacemos click en el checkbox', ()=>{
    const mockFn = jest.fn();
    render(<Todo todoData={{ ...fakeData, isCompleted: true }} toggleIsCompleted={mockFn} />);

    userEvent.click(screen.getByRole('checkbox'));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('deberia llamar a la funcion removeSelf cuando hacemos click en el boton x', ()=>{
    const mockFn = jest.fn();
    render(<Todo todoData={fakeData} removeSelf={mockFn} />);

    userEvent.click(screen.getByRole('button', {name: 'x'}));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('debería de quitar la clase al elemento li cuando isCompleted es false', () => {
    render(<Todo todoData={{ ...fakeData, isCompleted: false }} />);
    expect(screen.getByRole("listitem")).not.toHaveClass("completed");
  })

  it('debería de añadir la clase completed al elemento li cuando isCompleted es true', () => {
    render(<Todo todoData={{ ...fakeData, isCompleted: true }} />);
    expect(screen.getByRole("listitem")).toHaveClass("completed");
  })
  
});
