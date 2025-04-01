import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import Login from '../src/app/login/page'

describe('Login Page', () => {

    it('Renders correctly with all elements', () => {

        render(<Login/>);

        expect(screen.getAllByText("Login").length).toBe(2);
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(screen.getByText("Don't have an account? Go here to register")).toBeInTheDocument();
        expect(screen.getByText("Back")).toBeInTheDocument();
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
    })

    it('Login button enables correctly', () => {

        render(<Login/>);

        const submit = screen.getByRole("button", {name: "Login"});
        const username = screen.getByTestId("username");
        const password = screen.getByTestId("password");

        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(submit).toBeInTheDocument();

        expect(submit).toBeDisabled();

        fireEvent.change(username, {target: {value: 'user1'}});

        expect(submit).toBeDisabled();

        fireEvent.change(password, {target: {value: 'password1'}});

        expect(submit).not.toBeDisabled();

        fireEvent.change(username, {target: {value: ''}});

        expect(submit).toBeDisabled();
    })
})
