import {test, expect} from "@playwright/test";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                .container {
    text-align: center;
    font-family: Arial, sans-serif;
}

.gallery {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

.gallery img {
    width: 200px;
    border: 2px solid #ddd;
    cursor: pointer;
}

.video-container {
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

function App() {
    return (
        <div className="container">
            <h1>Media Gallery</h1>
            <ImageGallery />
            <VideoPlayer />
        </div>
    );
}

                     ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Video has captions displayed", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    await page.waitForTimeout(1000);

    const video = page.locator("video");
    await video.click();
    await page.waitForTimeout(2000);

    const captions = await page.locator("track").getAttribute("kind");
    expect(captions).toBe("captions");
});