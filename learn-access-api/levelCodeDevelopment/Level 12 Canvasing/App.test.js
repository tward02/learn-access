import {render, screen} from "@testing-library/react";
import App from "./App";
import React from 'react';
import "@testing-library/jest-dom";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
        fillRect: jest.fn(),
        beginPath: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        stroke: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
    }));
});

it("Renders the main dashboard elements correctly", () => {
    render(<App />);

    expect(screen.getByRole("heading", {name: "Sales Dashboard" })).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(1);

    expect(screen.getByRole("link", { name: "View More Graphs" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Sales Reports Data" })).toBeInTheDocument();

    expect(screen.getByRole("heading", {name: "Sales Statistics" })).toBeInTheDocument();
    expect(screen.getByText("This is a dashboard about sales stats")).toBeInTheDocument();
    expect(screen.getByText("Refresh")).toBeInTheDocument();

    expect(screen.getByTestId("canvas")).toBeInTheDocument();

    expect(screen.getByRole("heading", {name: "Types:" })).toBeInTheDocument();
    expect(screen.getByText(": Projected sales")).toBeInTheDocument();
    expect(screen.getByText(": Actual sales")).toBeInTheDocument();

    expect(screen.getByText("Made by someone in React")).toBeInTheDocument();
});
