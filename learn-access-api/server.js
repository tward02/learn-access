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
<html lang="en">
        <head>
            <title>test</title>
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

const getUserById = async (id) => {
    const {rows} = (await sql`
        SELECT id, username, password
        FROM users
        WHERE id = ${id};`);

    return rows[0];
}

const getTests = async (levelId) => {
    const {rows} = (await sql`
        SELECT *
        from level_tests
        WHERE levelId = ${levelId};
    `)
    rows.map((test) => {
        test.code = test.code.replace(/\\n/g, '\n');
    })
    return rows;
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

export const passLevel = async (userId, levelId) => {
    await sql`
        INSERT INTO user_levels (userID, levelID, datetime)
        VALUES (${userId}, ${levelId}, NOW())
    `;
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

const transformReactImports = (source) => {

    const importRegex = /^import\s+(?:React,\s+)?\{\s*([^}]+?)\s*\}\s+from\s+["']react["'];?$/gm;

    return source.replace(importRegex, (match, hooksGroup) => {
        const hooksList = hooksGroup.split(",").map(hook => hook.trim());
        return `const { ${hooksList.join(", ")} } = React;`;
    });
}

const runPlaywrightTest = async (testDir, test, code, css, index) => {
    const testPath = path.join(testDir, 'playwrightTest' + index + '.spec.js');
    let formattedCode = transformReactImports(code);
    formattedCode = formattedCode.replaceAll("import React from \'react\'", "")
    formattedCode = formattedCode.replaceAll("import React from \"react\"", "")
    formattedCode = formattedCode.replaceAll("import React from \"react\"", "")
    formattedCode = formattedCode.replaceAll("import \'./styles.css\'", "")
    formattedCode = formattedCode.replaceAll("import \"./styles.css\"", "")
    formattedCode = formattedCode.replace("export default App", "")
    formattedCode = formattedCode.replaceAll("export", "");
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

const runTests = async (levelId, code, css) => {
    const tempDir = path.join("testing", 'temp', uuidv4());
    fs.mkdirSync(tempDir, {recursive: true});

    const appPath = path.join(tempDir, 'App.js');
    const cssPath = path.join(tempDir, 'styles.css');

    let jestCode = code;

    if (!code.includes("import React from \'react\'") && !code.includes("import React from \"react\"")) {
        jestCode = "import React from \'react\';\n" + jestCode;
    }

    if (!code.includes("import \'./styles.css\'\n") && !code.includes("import \"./styles.css\"\n")) {
        jestCode = "import \'./styles.css\'\n" + jestCode;
    }

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

    fs.rmSync(tempDir, {recursive: true, force: true});
    return results.flatMap(subArray => subArray);
}

//TODO when deploying run npx playwright install

app.post('/submit/:levelId', async (req, res) => {

    let {code, css, user} = req?.body?.data;
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

    if (!code) {
        return res.status(400).json({message: 'Missing Required Attribute'});
    }

    if (!css) {
        css = "";
    }

    const testResultsList = await runTests(levelId, code, css);

    let passed = true;
    testResultsList.forEach(test => {
        passed = test.passed && passed;
    })

    if (passed) {
        await passLevel(user.id, levelId);
    }

    res.status(200).json({success: passed});
});

app.post('/test/:levelId', async (req, res) => {

    let {code, css, user} = req?.body?.data;
    const levelId = await req?.params?.levelId;

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

    if (!code) {
        return res.status(400).json({message: 'Missing Required Attribute'});
    }

    if (!css) {
        css = "";
    }

    const testResultsList = await runTests(levelId, code, css);

    let passed = true;
    testResultsList.forEach(test => {
        passed = test.passed && passed;
    })

    if (testResultsList.length === 0) {
        passed = false;
    }

    res.status(200).json({passed: passed, tests: testResultsList});
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(4000, () => console.log('Server running on port 4000'));
}

export default app;
