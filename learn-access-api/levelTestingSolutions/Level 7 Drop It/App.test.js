import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

it("Correct elements render on page initially", () => {
    render(<App/>);
    expect(screen.getByText("☰ Menu")).toBeInTheDocument();
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 3")).not.toBeInTheDocument();
});

it("Correct elements render on page when dropdown open", () => {
    render(<App/>);
    const menuButton = screen.getByText("☰ Menu");
    fireEvent.click(menuButton);
    expect(screen.queryByText("Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2")).toBeInTheDocument();
    expect(screen.queryByText("Option 3")).toBeInTheDocument();
    fireEvent.click(menuButton);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 3")).not.toBeInTheDocument();
});

it("Elements have correct roles and accessible names", () => {
    render(<App/>);

    const menuButton = screen.getByText("☰ Menu");

    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-haspopup", "true");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const menuItems = screen.getAllByRole("menuitem");

    expect(menuItems.length).toBe(3); // Should match dropdown items

    menuItems.forEach((item, index) => {
        expect(item).toBeInTheDocument();
        expect(item).toHaveTextContent(`Option ${index + 1}`);

        const accessibleName = item.getAttribute("aria-label") || item.textContent;
        expect(accessibleName).toBe(`Option ${index + 1}`);
    });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
});
