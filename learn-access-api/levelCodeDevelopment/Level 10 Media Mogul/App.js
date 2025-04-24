import React from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

const ImageGallery = () => {
    const images = [
        {src: "/public/house.svg", alt: "house image"},
        {src: "/public/penguin.svg", alt: "penguin image"},
        {src: "/public/apple.svg", alt: "apple image"},
    ];

    return (
        <div className="images" role="list">
            {images.map((image, index) => (
                <img key={index} src={image.src} alt={image.alt}/>
            ))}
        </div>
    );
};

const VideoPlayer = () => {
    return (
        <div>
            <video className="videoPlayer" data-testid="video" controls aria-describedby="video-description">
                <source data-testid="source"
                        src="https://videos.pexels.com/video-files/4872339/4872339-hd_1920_1080_30fps.mp4"
                        type="video/mp4"/>
                <track src="/public/captions.vtt" kind="captions" label="English captions" default/>
            </video>
            <p id="video-description">This video is of some ducks eating</p>
            <div className="transcript">
                <h2>Video Transcript</h2>
                <p>[Narrator] Here are some ducks. They appear to be looking for food and eating. [Ducks] Quack Quack
                    Quack.</p>
            </div>
        </div>
    );
};

export default function App() {
    return (
        <div className="container">
            <h1>Media Gallery</h1>
            <ImageGallery/>
            <VideoPlayer/>
        </div>
    );
}
