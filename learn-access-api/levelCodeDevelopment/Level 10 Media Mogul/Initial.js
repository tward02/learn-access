import React from "react";
import "./styles.css";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes

export default function App() {

    const images = [
        {src: "/public/house.svg"},
        {src: "/public/penguin.svg"},
        {src: "/public/apple.svg"}
    ];

    return (
        <div className="container">
            <h1>Media Gallery</h1>
            <div className="images">
                {images.map((image, index) => (
                    <img key={index} src={image.src}/>
                ))}
            </div>
            <div>
                <video className={"videoPlayer"} data-testid="video" controls>
                    <source data-testid="source"
                            src="https://videos.pexels.com/video-files/4872339/4872339-hd_1920_1080_30fps.mp4"
                            type="video/mp4"/>
                </video>
            </div>
        </div>
    );
}
