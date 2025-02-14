import express from 'express';
import {exec} from 'child_process';
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import morgan from "morgan";
import {sql} from "@vercel/postgres";
import dotenv from "dotenv";
import util from 'util';

dotenv.config();

const execPromise = util.promisify(exec);

const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.get("/hello", (req, res) => {
    res.status(200).json({message: "Hello, World!"});
});

const getPlaywrightRender = (reactCode, css) => `
<html>
        <head>
            <style>${css}</style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                ${reactCode}
                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

const jestTestExample = `
import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

it('renders root element', () => {
    render(<App />);
    expect(screen.getByText('Hello, JSX & CSS World!')).toBeInTheDocument();
    const rootElement = screen.getByText('Hello, JSX & CSS World!');
});
`

const playwrightTestExample = `
import { test, expect } from '@playwright/test';

test('checks CSS styling', async ({ page }) => {
        
    
    await page.setContent(\`
        ///Render///
    \`);

    await page.waitForSelector('h1');

    const element = await page.locator('h1');
    await expect(element).toHaveCSS('color', 'rgb(0, 0, 255)');
    await expect(element).toHaveCSS('text-align', 'center');     // Expect centered text
});

`

const getUserById = async (id) => {
    const {rows} = (await sql`
        SELECT id, username, password
        FROM users
        WHERE id = ${id};`);

    return rows[0];
}

const getTests = async (levelId) => {
    // const {rows} = (await sql`
    //     SELECT *
    //     from level_tests
    //     WHERE levelId = ${levelId};
    // `)
    // return rows;
    return [
        {
            type: "jest",
            code: jestTestExample,
            name: "Jest Test Suite 1"
        },
        {
            type: "playwright",
            name: "Playwright Test Suite 1",
            code: playwrightTestExample
        },
        {
            type: "playwright",
            name: "Playwright Test Suite 1",
            code: playwrightTestExample
        },
        {
            type: "jest",
            code: jestTestExample,
            name: "Jest Test Suite 1"
        }
    ];
}

async function authenticate(user) {
    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return false;
    }

    return user.password === dbUser.password;
}

const runJestTest = async (testDir, test) => {
    const testPath = path.join(testDir, 'App.test.js');
    fs.writeFileSync(testPath, test.code);

    try {
        const {stdout} = await execPromise(`npx jest --config jest.config.js --findRelatedTests ${path.normalize(testPath)} --json`);
        const results = JSON.parse(stdout);
        return {passed: true, name: test.name, message: results.testResults, type: test.type};
    } catch (error) {
        return {
            passed: false,
            name: test.name,
            error: error.message,
            message: error.stdout ? JSON.parse(error.stdout) : "Error running Jest",
            type: test.type
        };
    }
}

const runPlaywrightTest = async (testDir, test, code, css) => {
    const testPath = path.join(testDir, 'playwrightTest.spec.js');
    let formattedCode = code.replaceAll("export", "");
    formattedCode = formattedCode.replace("default", "");
    const render = getPlaywrightRender(formattedCode, css);
    const testCode = test.code.replace("///Render///", render);
    fs.writeFileSync(testPath, testCode);

    try {
        const {stdout} = await execPromise(`npx playwright test ${testPath.replace(/\\/g, "/")} --reporter=json`);
        const results = JSON.parse(stdout);
        return {passed: true, name: test.name, message: results, type: test.type};
    } catch (error) {
        return {
            passed: false,
            name: test.name,
            error: error.message,
            message: error.stdout || "Error running Playwright test",
            type: test.type
        };
    }
}

//TODO when deploying run npx playwright install

app.post('/test/:levelId', async (req, res) => {

    const {code, css, user} = req.body;
    const levelId = req.params.levelId;

    if (!user) {
        return res.status(401).json({success: false, error: 'Not Authenticated'});
    }

    if (!await authenticate(user)) {
        return res.status(403).json({success: false, error: 'You don\'t have permission to do this'});
    }

    if (!code || !css) {
        return res.status(400).json({success: false, error: 'Missing required attribute'});
    }

    const tempDir = path.join("testing", 'temp', uuidv4());
    fs.mkdirSync(tempDir, {recursive: true});

    const appPath = path.join(tempDir, 'App.js');
    const cssPath = path.join(tempDir, 'styles.css');

    const jestCode = "import React from \'react\';\nimport \'./styles.css\'\n" + code;

    fs.writeFileSync(appPath, jestCode);
    fs.writeFileSync(cssPath, css);

    const tests = await getTests(levelId);

    const results = await Promise.all(
        tests.map(test => {
            if (test.type === "jest") {
                return runJestTest(tempDir, test);
            } else if (test.type === "playwright") {
                return runPlaywrightTest(tempDir, test, code, css);
            }
        })
    );

    fs.rmSync(tempDir, {recursive: true, force: true});

    let passed = true;
    results.forEach(test => {
        passed = test.passed && passed;
    })

    res.status(200).json({passed: passed, tests: results});
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(4000, () => console.log('Server running on port 4000'));
}

export default app;
