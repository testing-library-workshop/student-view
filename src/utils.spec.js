import { checkIfStringDateIsBeforeToday } from "./utils";

describe("checkIfStringDateIsBeforeToday", () => {
  it("debería devolver false si recibe un string vacío", () => {
    expect(checkIfStringDateIsBeforeToday("")).toBe(false);
  });
  it("debería lanzar excepción si recibe algo que no sea string", () => {
    expect(() => checkIfStringDateIsBeforeToday(undefined)).toThrow();
    expect(() => checkIfStringDateIsBeforeToday(null)).toThrow();
    expect(() => checkIfStringDateIsBeforeToday({})).toThrow();
    expect(() => checkIfStringDateIsBeforeToday([])).toThrow();
    expect(() => checkIfStringDateIsBeforeToday(0)).toThrow();
    expect(() => checkIfStringDateIsBeforeToday(-3)).toThrow();
  });
  it("debería lanzar excepción si la fecha no es valida", () => {
    expect(() => checkIfStringDateIsBeforeToday(' ')).toThrow();
    expect(() => checkIfStringDateIsBeforeToday('fecha invalida')).toThrow();
    expect(() => checkIfStringDateIsBeforeToday('01022025')).toThrow();
  });
  it("debería devolver false si la fecha es posterior a hoy", () => {
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

    expect(checkIfStringDateIsBeforeToday(tomorrow.toDateString())).toBe(false);
  });

  it('debería devolver false si la fecha es hoy', () => {
    const today = new Date();

    expect(checkIfStringDateIsBeforeToday(today.toDateString())).toBe(false);
  })

  it('debería devolver true si la fecha es anterior a hoy', () => {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const onMonthAgo = new Date(new Date().setDate(new Date().getMonth() - 1));
    // const oneYearAgo = new Date(new Date().setDate(new Date().setFullYear() - 1));
    // console.log("🚀 ~ it ~ oneYearAgo:", oneYearAgo)

    expect(checkIfStringDateIsBeforeToday(yesterday.toDateString())).toBe(true);
    expect(checkIfStringDateIsBeforeToday(onMonthAgo.toDateString())).toBe(true);
    // expect(checkIfStringDateIsBeforeToday(oneYearAgo.toDateString())).toBe(true);
  })


});
