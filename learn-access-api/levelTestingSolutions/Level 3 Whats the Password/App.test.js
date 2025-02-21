import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";

it("Form renders correctly with all required components", () => {
    const result = render(<App/>);
    expect(screen.getByText("Accessible Login Form")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByRole("textbox", {name: /email/i})).toBeInTheDocument();
    expect(result.container.querySelector('#email')).toBeInTheDocument();
    expect(result.container.querySelector('#password')).toBeInTheDocument();
})

it("renders the login form with labels correctly associated with inputs", () => {
    render(<App/>);
    const emailLabel = screen.getByText("Email:");
    const passwordLabel = screen.getByText("Password:");

    // Verify that the label's htmlFor matches the corresponding input's id.
    expect(emailLabel).toHaveAttribute("for", "email");
    expect(passwordLabel).toHaveAttribute("for", "password");

    // Also verify that the inputs exist with the expected IDs.
    const emailInput = screen.getByRole("textbox", {name: /email/i});
    const passwordInput = screen.getByLabelText("Password:");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

it("shows error when email is invalid", async () => {
    render(<App/>);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", {name: /login/i});

    emailInput.value = "";
    emailInput.focus();

    fireEvent.change(emailInput, {target: {value: "invalidEmail"}})
    emailInput.value = "invalidEmail";
    passwordInput.value = "mypassword";
    submitButton.click();

    const error = await screen.findByRole("alert");
    expect(error).toHaveTextContent("Please enter a valid email address.");
});

it("shows error when password is empty", () => {
    render(<App/>);
    const emailInput = screen.getByLabelText("Email:");
    const submitButton = screen.getByRole("button", {name: /login/i});

    fireEvent.change(emailInput, {target: {value: "test@example.com"}});
    fireEvent.click(submitButton);

    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("Password cannot be empty.");
});
