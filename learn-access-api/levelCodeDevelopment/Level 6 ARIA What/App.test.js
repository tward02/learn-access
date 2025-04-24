import {render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import React from 'react';

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

it("Correct roles to exist in document: banner, navigation, main, contentinfo", () => {
    render(<App/>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

it("Semantic elements are used and the correct elements exist within each", () => {
    const {container} = render(<App/>);

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
    expect(within(main).getByText("This is some main content the webpage displays...")).toBeInTheDocument();
    expect(within(main).getByText("This is some more content that is different from the stuff above.")).toBeInTheDocument();

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(within(header).getByText("Website Banner")).toBeInTheDocument();

    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
    expect(within(footer).getByText("Made by someone in React")).toBeInTheDocument();
});

it("Semantic elements have the correct roles on them", () => {
    const {container} = render(<App/>);

    const nav = container.querySelector("nav");
    expect(nav.getAttribute("role")).toBe("navigation");

    const main = container.querySelector("main");
    expect(main.getAttribute("role")).toBe("main");

    const header = container.querySelector("header");
    expect(header.getAttribute("role")).toBe("banner");

    const footer = container.querySelector("footer");
    expect(footer.getAttribute("role")).toBe("contentinfo");
});
