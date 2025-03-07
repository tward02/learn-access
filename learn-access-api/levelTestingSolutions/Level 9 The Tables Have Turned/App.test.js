import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import React from 'react'

it("Ensure table renders correctly with all the correct data", () => {
    render(<App />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const colheaders = screen.queryAllByRole("columnheader");
    const rowHeaders = screen.queryAllByRole("rowheader");

    const headers = colheaders.concat(rowHeaders);

    expect(headers).toHaveLength(8);
    expect(headers[0]).toHaveTextContent("Monday");
    expect(headers[1]).toHaveTextContent("Tuesday");
    expect(headers[2]).toHaveTextContent("Wednesday");
    expect(headers[3]).toHaveTextContent("Thursday");
    expect(headers[4]).toHaveTextContent("Friday");
    expect(headers[5]).toHaveTextContent("09:00 – 11:00");
    expect(headers[6]).toHaveTextContent("11:00 – 13:00");
    expect(headers[7]).toHaveTextContent("13:00 – 16:00");
});

it("Header scopes are assigned correctly", () => {
    render(<App />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(5);
    expect(columnHeaders[0]).toHaveTextContent("Monday");
    expect(columnHeaders[1]).toHaveTextContent("Tuesday");
    expect(columnHeaders[2]).toHaveTextContent("Wednesday");
    expect(columnHeaders[3]).toHaveTextContent("Thursday");
    expect(columnHeaders[4]).toHaveTextContent("Friday");

    const rowHeaders = screen.getAllByRole("rowheader");
    expect(rowHeaders).toHaveLength(3);
    expect(rowHeaders[0]).toHaveTextContent("09:00 – 11:00");
    expect(rowHeaders[1]).toHaveTextContent("11:00 – 13:00");
    expect(rowHeaders[2]).toHaveTextContent("13:00 – 16:00");
});

it("Table has correct caption and is assigned to the table correctly using aria-describedby", () => {
    render(<App />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const caption = screen.getByText("Shop Opening Times");
    expect(caption).toBeInTheDocument();

    const captionRole = screen.getByRole("caption");
    expect(captionRole).toBeInTheDocument();
    expect(captionRole).toHaveTextContent("Shop Opening Times");

    const captionId = caption.getAttribute("id");
    const tableDescribedById = table.getAttribute("aria-describedby");
    expect(tableDescribedById).toBe(captionId);
});
