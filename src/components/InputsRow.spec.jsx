import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import InputsRow from "./InputsRow";

describe('InputsRow', ()=>{
  it('should render both text inputs', ()=>{
    render(<InputsRow />);
    const input1 = screen.getByPlaceholderText('WHAT needs to be done?');
    const input2 = screen.getByPlaceholderText('WHEN needs to be done?');
    expect(input1).toBeVisible();
    expect(input2).toBeVisible();
  });

  it('should change todo title on typing', ()=>{
    render(<InputsRow />);
    const todoInput = screen.getByPlaceholderText('WHAT needs to be done?');
    expect(todoInput).toHaveValue("");

    userEvent.type(todoInput, "My todo");

    expect(screen.getByPlaceholderText('WHAT needs to be done?')).toHaveValue("My todo");
  });

  it('should change to type date on focus', () =>{
    render(<InputsRow />);
    const dateInput = screen.getByPlaceholderText('WHEN needs to be done?');

    expect(dateInput).toHaveAttribute("type", "text");
    
    fireEvent.focus(dateInput);

    expect(dateInput).toHaveAttribute("type", "date");
  });

  it('should change to type text on blur', () =>{
    render(<InputsRow />);
    const dateInput = screen.getByPlaceholderText('WHEN needs to be done?');
    fireEvent.focus(dateInput);

    expect(dateInput).toHaveAttribute("type", "date");
    
    fireEvent.blur(dateInput);
    
    expect(dateInput).toHaveAttribute("type", "text");
  });

  it('debería establecer el texto del input a vacío al pulsar enter', () => {
    const mockFn = jest.fn();
    render(<InputsRow addTodo={mockFn}/>);
    const todoInput = screen.getByPlaceholderText('WHAT needs to be done?');
    userEvent.type(todoInput, "My todo");

    userEvent.type(todoInput, "{Enter}");
    
    expect(todoInput).toHaveValue("");
  });
  
})