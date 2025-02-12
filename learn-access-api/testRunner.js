const puppeteer = require("puppeteer");

const renderPage = async (code, css) => {

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],});
    const page = await browser.newPage();
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
    const html = testCodeHTMLTemplate(code, css);
    await page.setContent(html, {waitUntil: 'networkidle0'});
    await page.waitForSelector('#root > *', {timeout: 30000});
    console.log("root rendered");
    return {page, browser};
}

const testCodeHTMLTemplate = (code, css) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>React JSX Code Test</title>
        <!-- React and ReactDOM from CDN -->
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <!-- Babel Standalone for JSX transpilation -->
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <style>
            ${css || ''}
        </style>
    </head>
    <body>
        <div id="root"></div>
        <script type="text/babel">
            ${code}
        </script>
    </body>
    </html>
`;

module.exports = { renderPage };
