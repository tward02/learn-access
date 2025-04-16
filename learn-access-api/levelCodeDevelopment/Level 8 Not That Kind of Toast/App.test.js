import {render, screen, fireEvent, act} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import React from 'react';

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

jest.useFakeTimers();

it("Initial screen renders with all required elements", () => {
    render(<App/>);

    expect(screen.getByText("Toast Notifications")).toBeInTheDocument();
    expect(screen.getByText("Show Info Message")).toBeInTheDocument();
    expect(screen.getByText("Show Success Message")).toBeInTheDocument();
    expect(screen.getByText("Show Error Message")).toBeInTheDocument();
});

it("Toasts appear with correct text and elements", () => {
    render(<App/>);

    fireEvent.click(screen.getByText("Show Info Message"));
    expect(screen.getByText("Info message")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Show Success Message"));
    expect(screen.getByText("Success message")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Show Error Message"));
    expect(screen.getByText("Error message")).toBeInTheDocument();
});

it("Renders and announces an error toast with assertive aria-live and correct role", () => {
    render(<App/>);

    fireEvent.click(screen.getByText("Show Error Message"));

    const toast = screen.getByTestId("toast-error")
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent("Error message");
    expect(toast).toHaveAttribute("aria-live", "assertive");
    expect(toast).toHaveAttribute("role", "status");
});

it("Renders and announces a success toast with polite aria-live and correct role", () => {
    render(<App/>);

    fireEvent.click(screen.getByText("Show Success Message"));

    const toast = screen.getByTestId("toast-success")
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent("Success message");
    expect(toast).toHaveAttribute("aria-live", "polite");
    expect(toast).toHaveAttribute("role", "status");
});

it("Renders and announces an info toast with polite aria-live and correct role", () => {
    render(<App/>);

    fireEvent.click(screen.getByText("Show Info Message"));

    const toast = screen.getByTestId("toast-info")
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent("Info message");
    expect(toast).toHaveAttribute("aria-live", "polite");
    expect(toast).toHaveAttribute("role", "status");
});

it("Toast can be dismissed by clicking the close button", () => {
    render(<App/>);

    fireEvent.click(screen.getByText("Show Info Message"));

    const toast = screen.getByTestId("toast-info")
    expect(toast).toBeInTheDocument();

    fireEvent.click(screen.getByText("✖"));

    expect(toast).not.toBeInTheDocument();
});

it("Toast automatically disappears after timeout", () => {
    render(<App/>);

    fireEvent.click(screen.getByText("Show Success Message"));

    const toast = screen.getByTestId("toast-success")
    expect(toast).toBeInTheDocument();

    act(() => {
        jest.runAllTimers();
    });

    expect(toast).not.toBeInTheDocument();
});

it("Toast does not take the focus when it appears on screen", () => {
    render(<App/>);

    fireEvent.click(screen.getByText("Show Info Message"));

    const toast = screen.getByTestId("toast-info")
    expect(toast).not.toHaveFocus();
});
