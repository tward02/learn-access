import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";
import React from "react";

test("UI should have all required elements", async () => {
    render(<App />);
    expect(screen.getByText("Toggle High Contrast")).toBeInTheDocument();
    expect(screen.getByText("Color Contrast Challenge")).toBeInTheDocument();
});
