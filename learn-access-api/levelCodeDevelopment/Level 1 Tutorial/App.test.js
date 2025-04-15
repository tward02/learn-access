import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes
it('Expect text I love WCAG! on screen', () => {
    render(<App />);
    expect(screen.getByText('I love WCAG!')).toBeInTheDocument();
});

it('Expect minimum number of elements to be displayed - 5', () => {
    render(<App />);
    expect(document.querySelectorAll("*")).toHaveLength(5);
});

it('Expect element to be h1', () => {
    render(<App />);
    expect(document.querySelectorAll("h1")).toHaveLength(1);
});
