import {render, screen} from "@testing-library/react";
import App from "./App";
import React from 'react';
import "@testing-library/jest-dom";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

it("renders the correct structure and text", () => {
    render(<App/>);

    expect(screen.getByText("Website Name")).toBeInTheDocument();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();

    expect(screen.getByRole("heading", {name: "Welcome"})).toBeInTheDocument();
    expect(screen.getByText("This is some main content the webpage displays...")).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/public/cat.svg");

    expect(screen.getByRole("button", {name: "Cat Button"})).toBeInTheDocument();

    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();

    expect(screen.getByText("Made by someone in React")).toBeInTheDocument();
});
