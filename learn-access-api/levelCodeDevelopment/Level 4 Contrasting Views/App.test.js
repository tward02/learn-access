import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";
import React from "react";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

test("UI should have all required elements", async () => {
    render(<App/>);
    expect(screen.getByText("Toggle High Contrast")).toBeInTheDocument();
    expect(screen.getByText("Color Contrast Challenge")).toBeInTheDocument();
});
