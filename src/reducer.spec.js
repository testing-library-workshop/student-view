import { todoNotCompleted } from "./mocks";
import reducer, { filterStates, todosActions } from "./reducer";

describe("reducer", () => {
  let dateNowSpy;
  beforeEach(() => {
    dateNowSpy = jest.spyOn(Date, "now");
    dateNowSpy.mockReturnValue(Date.parse("2023-01-01"));
  });
  afterEach(() => {
    dateNowSpy.mockClear();
  });
  
  it("deberia lanzar error si el payload no tiene formato correcto", () => {
    const estadoInicial = { todos: [], filter: filterStates.all };
    expect(() => reducer(estadoInicial, undefined)).toThrow();
    expect(() => reducer(estadoInicial, null)).toThrow();
  });
  it("deberia devolver el mismo estado del que parte cuando se llama con una accion erronea", () => {
    const estadoInicial = { todos: [], filter: filterStates.all };
    expect(reducer(estadoInicial, { type: "no existe", payload: {} })).toEqual(estadoInicial);
    expect(reducer(estadoInicial, { type: todosActions.addTodo, payload: undefined })).toEqual(estadoInicial);
    expect(reducer(estadoInicial, { type: todosActions.addTodo, payload: "string" })).toEqual(estadoInicial);
    expect(reducer(estadoInicial, { type: todosActions.addTodo, payload: 3 })).toEqual(estadoInicial);
  });

  it("deberia añadir un todo cuando llamamos a addTodo con un todo correcto en el payload", () => {
    const estadoInicial = { todos: [], filter: filterStates.all };
    expect(reducer(estadoInicial, { type: todosActions.addTodo, payload: todoNotCompleted })).toEqual(
      expect.objectContaining({ todos: expect.arrayContaining([todoNotCompleted]) })
      // {
      // ...estadoInicial, todos: [todoCompleted]
    );
  });
});
