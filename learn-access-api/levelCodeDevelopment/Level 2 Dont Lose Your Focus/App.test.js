import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

it('Correct elements shown when Modal closed and opened', () => {
    render(<App/>);
    const openButton = screen.getByText("Open Modal");
    expect(openButton).toBeInTheDocument();
    expect(screen.queryByText("Close Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Accessible Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Press Escape to close or use Tab to navigate.")).not.toBeInTheDocument();

    fireEvent.click(openButton);

    const closeButton = screen.getByText("Close Modal");
    expect(closeButton).toBeInTheDocument();
    expect(screen.getByText("Accessible Modal")).toBeInTheDocument();
    expect(screen.getByText("Press Escape to close or use Tab to navigate.")).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(screen.queryByText("Close Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Accessible Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Press Escape to close or use Tab to navigate.")).not.toBeInTheDocument();
});

it("Focus switches between open and close buttons correctly", () => {
    render(<App/>);

    const openButton = screen.getByText("Open Modal");
    fireEvent.click(openButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const closeButton = screen.getByText("Close Modal");
    expect(closeButton).toHaveFocus();
    fireEvent.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(openButton).toHaveFocus();
});
