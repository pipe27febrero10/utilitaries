import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import RUTGenerator from "./RUTGenerator";
import { generateRUTs } from "../../utils/generators";

jest.mock("../../utils/generators", () => ({
  generateRUTs: jest.fn(),
}));

test("renders RUTGenerator component", () => {
  render(<RUTGenerator />);
  const headingElement = screen.getByText(/Generate a unique RUT/i);
  const paragraphElement = screen.getByText(
    /A RUT is a unique identifier for a Chilean citizen or resident/i
  );
  expect(headingElement).toBeInTheDocument();
  expect(paragraphElement).toBeInTheDocument();
});

test("initially renders with an empty RUT input field", () => {
  render(<RUTGenerator />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveValue("");
});

test("ensure that the RUT input field is read-only", () => {
  render(<RUTGenerator />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveAttribute("readonly");
});

test("generates a RUT when button is clicked", () => {
  render(<RUTGenerator />);
  const rut = "111111111";
  generateRUTs.mockReturnValue(rut);
  const button = screen.getByText(/Generate RUT/i);
  fireEvent.click(button);
  expect(screen.getByDisplayValue(rut)).toBeInTheDocument();
});