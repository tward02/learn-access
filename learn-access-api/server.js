import express from 'express';
import {exec} from 'child_process';
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import morgan from "morgan";
import {sql} from "@vercel/postgres";
import dotenv from "dotenv";
import util from 'util';
import cors from "cors";

dotenv.config();

const execPromise = util.promisify(exec);

const app = express();
app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_DOMAIN}));
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
    expect(screen.getByText('Hello, JSX & CSS World!')).toBeInTheDocument();
    expect(screen.getByText('Hello, JSX & CSS World!')).toBeInTheDocument();
    const rootElement = screen.getByText('Hello, JSX & CSS World!');
});

it('renders root element 2', () => {
    render(<App />);
    expect(screen.getByText('Hello, JSX & CSS World!')).toBeInTheDocument();
    const rootElement = screen.getByText('Hello, JSX & CSS World!');
});

it('renders root element 3', () => {
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

test('checks CSS styling 2', async ({ page }) => {
        
    
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
            name: "Playwright Test Suite 2",
            code: playwrightTestExample

        },
        {
            type: "jest",
            code: jestTestExample,
            name: "Jest Test Suite 2"
        }
    ];
}

export const getLevel = async (userId, levelId) => {
    const result = await sql`
        WITH user_completed_levels AS (SELECT levelID
                                       FROM user_levels
                                       WHERE userID = ${userId})
        SELECT l.id                                                                   AS id,
               l.name,
               l.description,
               l.objectives,
               l.expiration,
               l.enhancedDescription,
               COALESCE(ul.levelID IS NOT NULL, FALSE)                                AS completed,
               COALESCE(l.previousLevelId IS NOT NULL AND upl.levelID IS NULL, FALSE) AS locked
        FROM levels l
                 LEFT JOIN user_completed_levels ul ON l.id = ul.levelID
                 LEFT JOIN user_completed_levels upl ON l.previousLevelId = upl.levelID
        WHERE l.id = ${levelId};`

    return result.rows;
}

const authenticate = async (user) => {
    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return false;
    }

    return user.password === dbUser.password;
}

const runJestTest = async (testDir, test, index) => {
    const testPath = path.join(testDir, 'App' + index + '.test.js');
    fs.writeFileSync(testPath, test.code);

    const resultList = [];

    try {
        const {stdout} = await execPromise(`npx jest --config jest.config.js --findRelatedTests ${path.normalize(testPath)} --json`);
        const results = JSON.parse(stdout);
        results.testResults.forEach((tests) => {
            tests.assertionResults.forEach(testResult => {
                resultList.push({
                    passed: (testResult.status === "passed"),
                    suite: test.name,
                    name: testResult.fullName,
                    type: test.type
                });
            })
        })
    } catch (error) {
        if (error.stdout) {
            const results = JSON.parse(error.stdout);
            results.testResults.forEach((tests) => {
                tests.assertionResults.forEach(testResult => {
                    const passed = testResult.status === "passed";
                    const resultObject = {passed: passed, suite: test.name, name: testResult.fullName, type: test.type};
                    if (!passed) {
                        resultObject.message = testResult.failureMessages;
                    }
                    resultList.push(resultObject);
                })
            })
        } else {
            resultList.push({passed: false, suite: test.name, message: "Error running Jest", type: test.type});
        }
    }
    return resultList;
}

const runPlaywrightTest = async (testDir, test, code, css, index) => {
    const testPath = path.join(testDir, 'playwrightTest' + index + '.spec.js');
    let formattedCode = code.replaceAll("export", "");
    formattedCode = formattedCode.replace("default", "");
    const render = getPlaywrightRender(formattedCode, css);
    const testCode = test.code.replaceAll("///Render///", render);
    fs.writeFileSync(testPath, testCode);

    const resultList = [];

    try {
        const {stdout} = await execPromise(`npx playwright test ${testPath.replace(/\\/g, "/")} --reporter=json`);
        const results = JSON.parse(stdout);
        results.suites.forEach((suite) => {
            suite.specs.forEach(spec => {
                spec.tests.forEach((testResult) => {
                    resultList.push({
                        passed: testResult.results[0].status === "passed",
                        suite: test.name,
                        name: spec.title,
                        type: test.type
                    });
                })
            })
        })
    } catch (error) {
        if (error.stdout) {
            const results = JSON.parse(error.stdout);
            results.suites.forEach((suite) => {
                suite.specs.forEach(spec => {
                    spec.tests.forEach((testResult) => {
                        const passed = testResult.results[0].status === "passed";
                        const resultObj = {passed: passed, suite: test.name, name: spec.title, type: test.type};
                        if (!passed) {
                            resultObj.message = testResult.results[0].error.message;
                        }
                        resultList.push(resultObj);
                    })
                })
            })
        } else {
            resultList.push({passed: false, suite: test.name, message: "Error running Jest", type: test.type});
        }
    }
    return resultList;
}

//TODO when deploying run npx playwright install

app.post('/test/:levelId', async (req, res) => {

    const {code, css, user} = req?.body?.data;
    const levelId = req?.params?.levelId;

    if (!user || !await authenticate(user)) {
        return res.status(401).json({message: 'Not Authenticated'});
    }

    const levelData = await getLevel(user.id, levelId);
    if (levelData.length === 0) {
        return res.status(404).json({message: 'Level Not Found'});
    }

    if (levelData[0].locked === true) {
        return res.status(403).json({message: 'You don\'t have permission to do this level'});
    }

    if (!code || !css) {
        return res.status(400).json({message: 'Missing Required Attribute'});
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
        tests.map((test, index) => {
            if (test.type === "jest") {
                return runJestTest(tempDir, test, index);
            } else if (test.type === "playwright") {
                return runPlaywrightTest(tempDir, test, code, css, index);
            }
        })
    );

    const testResultsList = results.flatMap(subArray => subArray);

    fs.rmSync(tempDir, {recursive: true, force: true});
    let passed = true;
    testResultsList.forEach(test => {
        passed = test.passed && passed;
    })

    res.status(200).json({passed: passed, tests: testResultsList});
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(4000, () => console.log('Server running on port 4000'));
}

export default app;
