import { render, screen } from "@testing-library/react";
import FilterBar from "./FilterBar";
import userEvent from "@testing-library/user-event";

describe("FilterBar", () => {
  it("deberia renderizar", () => {
    render(<FilterBar />);
  });

  it("deberia renderizar 1 item left quando el totalItem = 1", () => {
    render(<FilterBar totalItems={1} />);
    expect(screen.getByText("1 item left")).toBeVisible();
  });
  it("deberia renderizar 0 items left cuando el totalItem = 0", () => {
    render(<FilterBar totalItems={0} />);
    expect(screen.getByText("0 items left")).toBeVisible();
  });
  it("deberia renderizar X items left cuando el totalItem > 1", () => {
    render(<FilterBar totalItems={15} />);
    expect(screen.getByText(/[\d]+ items left/i)).toBeVisible();
  });

  it("deberia lanzar una excepcion si el totalItem < 0", () => {
    expect(() => render(<FilterBar totalItems={-1} />)).toThrow('mensaje');
  });

  it("Renderizar los 3 botones", () => {
    render(<FilterBar />);
    expect(screen.getAllByRole('button').length).toBe(3);
    expect(screen.getByRole('button', {name: /All/i})).toBeVisible();
    expect(screen.getByRole('button', {name: /Active/i})).toBeVisible();
    expect(screen.getByRole('button', {name: /Complete/i})).toBeVisible();
  });

  it('cuando hacemos click en all se llama al dispatch', () => {
    const mockFn = jest.fn()
    render(<FilterBar dispatch={mockFn}/>);

    userEvent.click(screen.getByRole('button', {name: /All/i}))

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'showAll'
      })
    );
  });
});
