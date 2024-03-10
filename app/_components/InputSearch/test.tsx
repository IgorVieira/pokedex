import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { InputSearch } from ".";

describe("Input", () => {
  it("renders with correct value and placeholder", () => {
    const handleChange = jest.fn();
    const placeholderText = "Search...";
    const inputValue = "Test input";

    const { getByPlaceholderText, getByDisplayValue } = render(
      <InputSearch
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholderText}
      />
    );

    const inputElement = getByDisplayValue(inputValue);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", placeholderText);
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    const placeholderText = "Search...";
    const inputValue = "Test input";

    const { getByPlaceholderText } = render(
      <InputSearch
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholderText}
      />
    );

    const inputElement = getByPlaceholderText(placeholderText);
    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("focuses input when keyboard shortcut is pressed", () => {
    const handleChange = jest.fn();
    const placeholderText = "Search...";
    const inputValue = "Test input";

    const { getByPlaceholderText } = render(
      <InputSearch
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholderText}
      />
    );

    const inputElement = getByPlaceholderText(placeholderText);
    fireEvent.keyDown(window, { key: "/", metaKey: true });
    expect(document.activeElement).toEqual(inputElement);
  });
});
