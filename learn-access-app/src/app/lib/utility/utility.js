export const testCodeHTMLTemplate = (code, css) => `
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
