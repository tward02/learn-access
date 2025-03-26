import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import React from 'react';

it("All expected elements in structure", () => {
    render(<App />);
    const skipLink = screen.getByText(/Skip to Content/i);
    expect(skipLink).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Our Site")).toBeInTheDocument();
    expect(screen.getByText("Here is some content you can skip to.")).toBeInTheDocument();
    expect(screen.getByTitle("main-input")).toBeInTheDocument();
});

it("App renders with the correct structure", () => {
    render(<App />);

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();

    const list = screen.getByRole("list");
    expect(navbar).toContainElement(list);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(2);

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    const heading = screen.getByRole("heading", { level: 1, name: /welcome to our site/i });
    expect(main).toContainElement(heading);

    expect(screen.getByLabelText(/Here is some content you can skip to\./i)).toBeInTheDocument();
    const input = screen.getByTitle(/main-input/);

    expect(input).toHaveAttribute("id", "main-input");
    expect(input).toHaveAttribute("name", "main-input");
});
