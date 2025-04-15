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
    expect(images[0].getAttribute("src")).toBe("/public/house.svg")
    expect(images[1].getAttribute("src")).toBe("/public/penguin.svg")
    expect(images[2].getAttribute("src")).toBe("/public/apple.svg")
    const video = screen.getAllByTestId("video");
    expect(video.length).toBe(1);
    const source = within(video[0]).getAllByTestId("source");
    expect(source.length).toBe(1);
    expect(source[0].getAttribute("src")).toBe("https://videos.pexels.com/video-files/4872339/4872339-hd_1920_1080_30fps.mp4");
    expect(source[0].getAttribute("type")).toBe("video/mp4");
});

it("All images have non-empty alt attributes and they are appropriate to the image", () => {
    render(<App />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);

    expect(images[0].getAttribute("alt")).not.toBe(null);
    expect(images[1].getAttribute("alt")).not.toBe(null);
    expect(images[2].getAttribute("alt")).not.toBe(null);

    const houseAlt = images[0].getAttribute("alt").trim().toLowerCase();
    const penguinAlt = images[1].getAttribute("alt").trim().toLowerCase();
    const appleAlt = images[2].getAttribute("alt").trim().toLowerCase();

    const houseSim = (houseAlt.includes("house") || houseAlt.includes("home") || houseAlt.includes("building"));
    expect(houseSim).toBe(true);

    const penguinSim = penguinAlt.includes("penguin") || penguinAlt.includes("animal");
    expect(penguinSim).toBe(true);

    const appleSim = appleAlt.includes("apple");
    expect(appleSim).toBe(true);
});

it("Video description exists and is linked to video element", () => {
    render(<App />);

    const description = screen.getByText("This video is of some ducks eating");
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
    expect(screen.getByText("[Narrator] Here are some ducks. They appear to be looking for food and eating. [Ducks] Quack Quack Quack.")).toBeInTheDocument();
});
