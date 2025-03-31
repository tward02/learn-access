import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

it("Form renders correctly with all required components", () => {
    const result = render(<App/>);
    expect(screen.getByText("Accessible Login Form")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(result.container.querySelector('#email')).toBeInTheDocument();
    expect(result.container.querySelector('#password')).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
})

it("Renders the login form with labels correctly associated with inputs", () => {
    const result = render(<App/>);
    const emailLabel = screen.getByText("Email:");
    const passwordLabel = screen.getByText("Password:");

    expect(emailLabel).toHaveAttribute("for", "email");
    expect(passwordLabel).toHaveAttribute("for", "password");

    expect(screen.getByLabelText("Email:")).toEqual(result.container.querySelector('#email'))
    expect(screen.getByLabelText("Password:")).toEqual(result.container.querySelector('#password'))

    const emailInput = screen.getByRole("textbox", {name: /email/i});
    const passwordInput = screen.getByLabelText("Password:");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

it("Form validates email correctly with expected error message", async () => {
    const result = render(<App/>);
    const emailInput = result.container.querySelector('#email')
    const passwordInput = result.container.querySelector('#password')
    const submitButton = screen.getByRole("button", {name: /login/i});

    fireEvent.change(emailInput, {target: {value: "invalidEmail"}})
    fireEvent.change(passwordInput, {target: {value: "password"}});
    submitButton.click();

    const error = await screen.findByRole("alert");
    expect(error).toHaveTextContent("Invalid Email");
});

it("Form validates password correctly with expected error message", () => {
    const result = render(<App/>);
    const emailInput = result.container.querySelector('#email')
    const passwordInput = result.container.querySelector('#password')
    const submitButton = screen.getByRole("button", {name: /login/i});

    fireEvent.change(emailInput, {target: {value: "test@example.com"}});
    fireEvent.click(submitButton);

    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("Invalid Password");
});

it("Shows no errors when input is valid", () => {
    const result = render(<App/>);
    const emailInput = result.container.querySelector('#email')
    const passwordInput = result.container.querySelector('#password')
    const submitButton = screen.getByRole("button", {name: /login/i});

    fireEvent.change(emailInput, {target: {value: "test@example.com"}});
    fireEvent.change(passwordInput, {target: {value: "password"}});
    fireEvent.click(submitButton);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
