import {render, screen, within} from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import React from 'react';

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

it("UI render with all correct components", () => {
    render(<App />);
    expect(screen.getByText("Media Gallery")).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);
    expect(images[0].getAttribute("src")).toBe("/public/react.svg")
    expect(images[1].getAttribute("src")).toBe("/public/node.svg")
    expect(images[2].getAttribute("src")).toBe("/public/next.svg")
    const video = screen.getAllByTestId("video");
    expect(video.length).toBe(1);
    const source = within(video[0]).getAllByTestId("source");
    expect(source.length).toBe(1);
    expect(source[0].getAttribute("src")).toBe("https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4");
    expect(source[0].getAttribute("type")).toBe("video/mp4");
});

it("All images have non-empty alt attributes and they are appropriate to the image", () => {
    render(<App />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);

    expect(images[0].getAttribute("alt")).not.toBe(null);
    expect(images[1].getAttribute("alt")).not.toBe(null);
    expect(images[2].getAttribute("alt")).not.toBe(null);

    const reactAlt = images[0].getAttribute("alt").trim().toLowerCase();
    const nodeAlt = images[1].getAttribute("alt").trim().toLowerCase();
    const nextAlt = images[2].getAttribute("alt").trim().toLowerCase();

    const reactSim = (reactAlt.includes("react") || (reactAlt.includes("logo") || reactAlt.includes("brand"))) || reactAlt.includes("nucleus");
    expect(reactSim).toBe(true);

    const nodeSim = (nodeAlt.includes("node") || (nodeAlt.includes("logo") || nodeAlt.includes("brand"))) || (nodeAlt.includes("node.js"));
    expect(nodeSim).toBe(true);

    const nextSim = (nextAlt.includes("next") || (nextAlt.includes("logo") || nextAlt.includes("brand"))) || nextAlt.includes("next.js");
    expect(nextSim).toBe(true);
});

it("Video description exists and is linked to video element", () => {
    render(<App />);

    const description = screen.getByText("This video is of a large rabbit yawning");
    expect(description).toBeInTheDocument();
    const descriptionId = description.getAttribute("id");

    const video = screen.getByTestId("video");

    expect(video).toHaveAttribute("aria-describedby", descriptionId);
});

it("Video has correct captions added onto it", () => {
    render(<App />);
    const track = screen.getByTestId("video").querySelector("track");
    expect(track).toHaveAttribute("src", "/public/captions.vtt");
    expect(track).toHaveAttribute("kind", "captions");
    expect(track).toHaveAttribute("label", "English captions");
    expect(track).toHaveAttribute("default");
});

it("Video has correct transcript for it", () => {
    render(<App />);
    expect(screen.getByText("[Narrator] A large rabbit climbs out of a hole. The rabbit does a big yawn. It then scratches his head.")).toBeInTheDocument();
});
