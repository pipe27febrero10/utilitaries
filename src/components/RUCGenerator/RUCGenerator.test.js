import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RUCGenerator from './RUCGenerator';
import { generateRUC } from '../../utils/generators';


jest.mock('../../utils/generators', () => ({
  generateRUC: jest.fn(),
}));

test('renders RUCGenerator component', () => {
  render(<RUCGenerator />);
  const headingElement = screen.getByText(/Generate a unique RUC/i);
  const paragraphElement = screen.getByText(/A RUC is a unique identifier for a user/i);
  expect(headingElement).toBeInTheDocument();
  expect(paragraphElement).toBeInTheDocument();
});

test('initially renders with an empty RUC input field', () => {
    render(<RUCGenerator />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('');
});

test('ensure that the RUC input field is read-only', () => {
  render(<RUCGenerator />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveAttribute('readonly');
});

test('generates a RUC when button is clicked', () => {
  const mockRUC = '20213696719';
  generateRUC.mockReturnValue(mockRUC);

  render(<RUCGenerator />);
  const buttonElement = screen.getByText(/Generate RUC/i);
  fireEvent.click(buttonElement);

  const generatedRUC = screen.getByDisplayValue(mockRUC);
  expect(generatedRUC).toBeInTheDocument();
});

test('generate multiples ruc each time the button is clicked', () => {
    const firstRUC = "17853444995"
    const secondRUC = "20292452544"
    generateRUC.mockReturnValueOnce(firstRUC).mockReturnValueOnce(secondRUC);
    render(<RUCGenerator />);
    const buttonElement = screen.getByText(/Generate RUC/i);
    fireEvent.click(buttonElement);
    expect(screen.getByDisplayValue(firstRUC)).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(screen.getByDisplayValue(secondRUC)).toBeInTheDocument();
});