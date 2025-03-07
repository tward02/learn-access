import React from "react";
import "./styles.css";

const ImageGallery = () => {
    const images = [
        { src: "/public/react.svg"},
        { src: "/public/node.svg"},
        { src: "/public/next.svg"}
    ];

    return (
        <div className="gallery">
            {images.map((image, index) => (
                <img key={index} src={image.src} />
            ))}
        </div>
    );
};

const VideoPlayer = () => {
    return (
        <div className="video-container">
            <video data-testid="video" controls>
                <source data-testid="source" src="https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default function App() {
    return (
        <div className="container">
            <h1>Media Gallery</h1>
            <ImageGallery />
            <VideoPlayer />
        </div>
    );
}
