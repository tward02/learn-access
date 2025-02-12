import express from 'express';
import {exec} from 'child_process';
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import morgan from "morgan";

const app = express();
app.use(express.json());

app.use(morgan("dev"));

const getTestsFromDatabase = async () => {

    return `
        import React from 'react';
        import { screen, render } from '@testing-library/react';
        import '@testing-library/jest-dom';
        import App from './App';

        it('renders root element', () => {
            render(<App />);
            expect(screen.getByText('Hello, JSX & CSS World!')).toBeInTheDocument();
            const rootElement = screen.getByText('Hello, JSX & CSS World!');
        });
    `;
};

const getTestsFromDatabasePw = async (testType) => {
    if (testType === 'jest') {
        return {
            type: 'jest',
            code: `
                import React from 'react';
                import { screen, render } from '@testing-library/react';
                import '@testing-library/jest-dom';
                import App from './App';

                it('renders root element', () => {
                    render(<App />);
                    expect(screen.getByText('Hello, JSX & CSS World!')).toBeInTheDocument();
                });
            `
        };
    } else if (testType === 'playwright') {
        return {
            type: 'playwright',
            code: `
                import { test, expect } from '@playwright/test';

test('checks CSS styling', async ({ page }) => {

    await page.setContent(\`
        <html>
        <head>
            <style>h1 { color: blue; text-align: center; }</style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                function App() { return <h1>Hello, JSX & CSS World!</h1>; }
                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
        </html>
    \`);

    // Wait for the component to render
    await page.waitForSelector('h1');

    // Check the applied CSS styles
    const element = await page.locator('h1');
    await expect(element).toHaveCSS('color', 'rgb(0, 0, 255)'); // Expect blue color
    await expect(element).toHaveCSS('text-align', 'center');     // Expect centered text
});
            `
        };
    }

    throw new Error('Invalid test type');
};

app.post('/test-code', async (req, res) => {
    try {
        const {code, css} = req.body;

        const tempDir = path.join("testing", 'temp', uuidv4());
        fs.mkdirSync(tempDir, {recursive: true});

        const appPath = path.join(tempDir, 'App.js');
        const testPath = path.join(tempDir, 'App.test.js');
        const cssPath = path.join(tempDir, 'styles.css');

        fs.writeFileSync(appPath, code);
        fs.writeFileSync(cssPath, css);
        fs.writeFileSync(testPath, await getTestsFromDatabase());

        exec(`npx jest --config jest.config.js --findRelatedTests ${path.normalize(testPath)} --json`, (error, stdout) => {
            fs.rmSync(tempDir, {recursive: true, force: true});

            if (error) {
                return res.status(500).json({success: false, error: error.message});
            }

            const results = JSON.parse(stdout);
            res.json({success: true, testResults: results.testResults});
        });
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
});

app.post('/test-code/pw', async (req, res) => {
    try {
        const {code, css, testType} = req.body;

        if (!['jest', 'playwright'].includes(testType)) {
            return res.status(400).json({success: false, error: 'Invalid test type'});
        }

        const tempDir = path.join("testing", 'temp', uuidv4());
        fs.mkdirSync(tempDir, {recursive: true});

        const appPath = path.join(tempDir, 'App.js');
        const cssPath = path.join(tempDir, 'styles.css');
        fs.writeFileSync(appPath, code);
        fs.writeFileSync(cssPath, css);

        const {type, code: testCode} = await getTestsFromDatabasePw(testType);
        const testPath = path.join(tempDir, type === 'jest' ? 'App.test.js' : 'playwrightTest.spec.js');
        fs.writeFileSync(testPath, testCode);

        const command = type === 'jest'
            ? `npx jest --config jest.config.js --findRelatedTests ${path.normalize(testPath)} --json`
            : `npx playwright test ${testPath.replace(/\\/g, "/")} --reporter=json`;

        exec(command, {timeout: 60000}, (error, stdout) => {
            fs.rmSync(tempDir, {recursive: true, force: true});

            if (error) {
                return res.status(500).json({success: false, error: error.message, playwright: stdout});
            }

            res.json({success: true, testResults: JSON.parse(stdout)});
        });

    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(4000, () => console.log('Server running on port 4000'));
}

