import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

it("Correct elements render on page initially", () => {
    render(<App/>);
    expect(screen.getByText("Dropdown")).toBeInTheDocument();
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 3")).not.toBeInTheDocument();
});

it("Correct elements render on page when dropdown open", () => {
    render(<App/>);
    const menuButton = screen.getByText("Dropdown");
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

    const menuButton = screen.getByText("Dropdown");

    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-haspopup", "true");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const menuItems = screen.getAllByRole("menuitem");

    expect(menuItems.length).toBe(3);

    menuItems.forEach((item, index) => {
        expect(item).toBeInTheDocument();
        expect(item).toHaveTextContent(`Option ${index + 1}`);
    });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
});
