import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import React from 'react';

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

it("All expected elements in structure including skip to content button", () => {
    render(<App/>);
    expect(screen.getByText("Skip to Content")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Welcome to a Website")).toBeInTheDocument();
    expect(screen.getByText("Input Data Here:")).toBeInTheDocument();
    expect(screen.getByText("Here is some not very relevant information")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("skip to this input")).toBeInTheDocument();
});

it("App renders with the correct structure", () => {
    render(<App/>);

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();

    const list = screen.getByRole("list");
    expect(navbar).toContainElement(list);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(2);
    expect(listItems.length).toBeLessThan(5);

    expect(screen.getByRole("link", {name: "Home"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "About"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "Contact"})).toBeInTheDocument();

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    const heading = screen.getByRole("heading", {level: 1, name: "Welcome to a Website"});
    expect(main).toContainElement(heading);

    expect(screen.getByLabelText("Input Data Here:")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("skip to this input");

    expect(input).toHaveAttribute("id", "mainInput");
});
