// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import axios from 'axios';
import {jest} from "@jest/globals";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock("./src/app/actions/auth", () => ({
    login: jest.fn(),
    signup: jest.fn(),
}));


jest.mock('axios');
axios.interceptors = jest.fn();
