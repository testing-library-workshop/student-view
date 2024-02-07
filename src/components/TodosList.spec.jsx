import { render, screen } from "@testing-library/react";
import TodosList from "./TodosList";

const mockTodos = [
  {
    text: "Tarea de prueba",
    date: "01/04/2024",
    isCompleted: false,
  },
];

describe("TodoList", () => {
  it("deberia renderizar pasando las propiedades obligatorias", () => {
    render(<TodosList todos={mockTodos} />);
  });

  it('debería renderizar el listado de todos', () => {
    render(<TodosList todos={mockTodos} />);

    const list = screen.getByRole('list');
    expect(list).toBeVisible();
  });

  it('debería renderizar el número de todos que pasamos al TodoList', () => {
    render(<TodosList todos={mockTodos} />)

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(mockTodos.length);
  });

  it('debería no renderizar ningún todo cuando le pasamos una lista vacía', () => {
    render(<TodosList todos={[]} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem').length).toBe(0);
  });


});
