import {render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import React from 'react';

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

it("Correct roles to exist in document: banner, navigation, main, contentinfo", () => {
    render(<App />);
    expect(screen.getByRole("banner", { hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("main", { hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo", { hidden: true })).toBeInTheDocument();
});

it("Semantic elements are used and the correct elements exist within each", () => {
    const {container} = render(<App />);

    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
    const links = within(nav).getAllByRole("link")
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "#home");
    expect(links[1]).toHaveAttribute("href", "#about");
    expect(links[2]).toHaveAttribute("href", "#contact");

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(within(main).getByText("Welcome")).toBeInTheDocument();
    expect(within(main).getByText("This is the main content area.")).toBeInTheDocument();

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(within(header).getByText("Website Title")).toBeInTheDocument();

    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
    expect(within(footer).getByText("© 2024 Company Name")).toBeInTheDocument();
});

it("Semantic elements have the correct roles on them", () => {
    const {container} = render(<App />);

    const nav = container.querySelector("nav");
    expect(nav.getAttribute("role")).toBe("navigation");

    const main = container.querySelector("main");
    expect(main.getAttribute("role")).toBe("main");

    const header = container.querySelector("header");
    expect(header.getAttribute("role")).toBe("banner");

    const footer = container.querySelector("footer");
    expect(footer.getAttribute("role")).toBe("contentinfo");
});
