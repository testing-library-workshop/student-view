import { renderHook, act } from "@testing-library/react";
import useTodos from "./useTodos";
import { todoCompleted } from "./mocks";
import useLocalStorage from "./useLocalStorage";

jest.mock('./useLocalStorage.js')

describe("useTodos", () => {

    beforeEach(() => {
      jest.mocked(useLocalStorage).mockReturnValue([[], jest.fn]);
    });
    afterEach(() => {
      jest.clearAllMocks()
    });

  it("deberia devolver array vacio en los todos por defecto", () => {
    const { result } = renderHook(() => useTodos());

    expect(result.current).toEqual(expect.objectContaining({ todos: [] }));
  });
  it("deberia devolver los todos cargados del local storage", () => {
    jest.mocked(useLocalStorage).mockReturnValue([[todoCompleted], jest.fn]);
    const { result } = renderHook(() => useTodos());

    expect(result.current).toEqual(expect.objectContaining({ todos: [todoCompleted] }));
  });

  it("deberia devolver el valor inicial si no hay nada guardado en el localstorage", () => {
    const { result } = renderHook(() => useTodos([todoCompleted]));

    expect(result.current).toEqual(expect.objectContaining({ todos: [todoCompleted] }));
  });


});
