import {test, expect} from "@playwright/test";
import React from "react";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                .container {
    text-align: center;
}

.images {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

.images img {
    width: 200px;
    border: 2px solid #ddd;
}

.videoPlayer {
    height: 250px;
    margin-top: 20px;
}

            </style>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">

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

function App() {
    return (
        <div className="container">
            <h1>Media Gallery</h1>
            <ImageGallery/>
            <VideoPlayer/>
        </div>
    );
}
                     ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Video has captions displayed", async ({page}) => {
    await page.setContent(getPlaywrightRender());

    await page.waitForTimeout(1000);

    const video = page.locator("video");
    await video.click();
    await page.waitForTimeout(2000);

    const captions = await page.locator("track").getAttribute("kind");
    expect(captions).toBe("captions");
});