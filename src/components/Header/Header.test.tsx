import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe(Header, () => {
  it("Should have the heading text Mark's To-Drink List", () => {
    // Arrange
    render(<Header />);
    const headingText = screen.getByRole("heading");
    // Assert
    expect(headingText).toHaveTextContent("Mark's To-Drink List");
  });
});
