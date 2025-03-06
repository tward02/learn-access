import React from "react";
import "./styles.css";

const ImageGallery = () => {
    const images = [
        { src: "/public/react.svg", alt: "react logo image" },
        { src: "/public/node.svg", alt: "node logo image" },
        { src: "/public/next.svg", alt: "next logo image" },
    ];

    return (
        <div className="gallery" role="list">
            {images.map((image, index) => (
                <img key={index} src={image.src} alt={image.alt} />
            ))}
        </div>
    );
};

const VideoPlayer = () => {
    return (
        <div className="video-container">
            <video data-testid="video" controls aria-describedby="video-description">
                <source data-testid="source" src="https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4" type="video/mp4" />
                <track src="/public/captions.vtt" kind="captions" label="English captions" default />
            </video>
            <p id="video-description">This video is of a large rabbit yawning</p>
            <div className="transcript">
                <h2>Video Transcript</h2>
                <p>[Narrator] A large rabbit climbs out of a hole. The rabbit does a big yawn. It then scratches his head.</p>
            </div>
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
