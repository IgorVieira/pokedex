import { render, screen } from "@testing-library/react";
import { CurrentYear } from ".";

describe("CurrentYear", () => {
  it("renders the CurrentYear component with the current date and Igor Vieira name", () => {
    render(<CurrentYear />);
    const linkElement = screen.getByText(/Igor Vieira/i);
    expect(linkElement).toBeInTheDocument();
  });
});
