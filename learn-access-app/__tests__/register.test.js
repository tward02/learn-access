import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import Register from '../src/app/register/page'

describe('Login Page', () => {

    it('Renders correctly with all elements', () => {

        render(<Register/>);

        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(screen.getByText("Re-Enter Password")).toBeInTheDocument();
        expect(screen.getByText("Already have an account? Go here to login")).toBeInTheDocument();
        expect(screen.getByText("Back")).toBeInTheDocument();
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("repassword")).toBeInTheDocument();
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
        expect(screen.queryByText("Password does not match")).not.toBeInTheDocument();
    })

    it('Login button enables correctly', () => {

        render(<Register/>);

        const submit = screen.getByRole("button", {name: "Sign Up"});
        const username = screen.getByTestId("username");
        const password = screen.getByTestId("password");
        const repassword = screen.getByTestId("repassword");

        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(repassword).toBeInTheDocument();
        expect(submit).toBeInTheDocument();

        expect(submit).toBeDisabled();
        expect(screen.queryByText("Password does not match")).not.toBeInTheDocument();

        fireEvent.change(username, {target: {value: 'user1'}});

        expect(submit).toBeDisabled();
        expect(screen.queryByText("Password does not match")).not.toBeInTheDocument();

        fireEvent.change(password, {target: {value: 'password1'}});

        expect(submit).toBeDisabled();
        expect(screen.getByText("Password does not match")).toBeInTheDocument();

        fireEvent.change(repassword, {target: {value: 'password2'}});

        expect(submit).toBeDisabled();
        expect(screen.getByText("Password does not match")).toBeInTheDocument();

        fireEvent.change(repassword, {target: {value: 'password1'}});

        expect(submit).not.toBeDisabled();
        expect(screen.queryByText("Password does not match")).not.toBeInTheDocument();

        fireEvent.change(password, {target: {value: 'password2'}});

        expect(submit).toBeDisabled();
        expect(screen.getByText("Password does not match")).toBeInTheDocument();
    })
})
