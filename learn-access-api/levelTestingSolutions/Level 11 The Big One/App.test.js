import {render, screen} from "@testing-library/react";
import App from "./App";
import React from 'react';
import "@testing-library/jest-dom";

it("renders the correct structure and text", () => {
    render(<App/>);

    expect(screen.getByText("Welcome to the Site")).toBeInTheDocument();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();

    expect(screen.getByRole("heading", {name: "Main Heading"})).toBeInTheDocument();
    expect(screen.getByText("Here is some important text.")).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/public/cat.svg");

    expect(screen.getByRole("button", {name: "Click Me"})).toBeInTheDocument();

    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();

    expect(screen.getByText("© 2025 My Website")).toBeInTheDocument();
});
