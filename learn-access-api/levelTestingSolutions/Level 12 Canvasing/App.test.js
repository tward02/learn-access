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

    expect(screen.getByRole("heading", {name: "Dashboard" })).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(1);

    expect(screen.getByRole("link", { name: "View Analytics" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download Reports" })).toBeInTheDocument();

    expect(screen.getByRole("heading", {name: "Statistics" })).toBeInTheDocument();
    expect(screen.getByText("This is a dashboard about the stats!")).toBeInTheDocument();
    expect(screen.getByText("🔄")).toBeInTheDocument();

    expect(screen.getByTestId("canvas")).toBeInTheDocument();

    expect(screen.getByRole("heading", {name: "Notifications" })).toBeInTheDocument();
    expect(screen.getByText("Alert: System Update Required")).toBeInTheDocument();
    expect(screen.getByText("Info: New Report Available")).toBeInTheDocument();

    expect(screen.getByText("© 2025 Dashboard")).toBeInTheDocument();
});
