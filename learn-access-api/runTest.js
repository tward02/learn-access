import path from "path";
import fs from "fs";
import util from "util";
import {exec} from "child_process";

const execPromise = util.promisify(exec);

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

const runJestTest = async (testDir, testCode, index, testName, testType) => {
    const testPath = path.join(testDir, 'App' + index + '.test.js');
    fs.writeFileSync(testPath, testCode);

    const resultList = [];

    try {
        const {stdout} = await execPromise(`npx jest --config jest.config.js --findRelatedTests ${path.normalize(testPath)} --json`);
        const results = JSON.parse(stdout);
        results.testResults.forEach((tests) => {
            tests.assertionResults.forEach(testResult => {
                resultList.push({
                    passed: (testResult.status === "passed"),
                    suite: testName,
                    name: testResult.fullName,
                    type: testType
                });
            })
        })
    } catch (error) {
        if (error.stdout) {
            const results = JSON.parse(error.stdout);
            results.testResults.forEach((tests) => {
                tests.assertionResults.forEach(testResult => {
                    const passed = testResult.status === "passed";
                    const resultObject = {passed: passed, suite: testName, name: testResult.fullName, type: testType};
                    if (!passed) {
                        resultObject.message = testResult.failureMessages;
                    }
                    resultList.push(resultObject);
                })
            })
        } else {
            resultList.push({passed: false, suite: testName, message: "Error running Jest", type: testType});
        }
    }
    return resultList;
}

const transformReactImports = (source) => {

    const importRegex = /^import\s+(?:React,\s*)?\{\s*([^}]+?)\s*}\s+from\s+["']react["'];?$/gm;

    return source.replace(importRegex, (match, hooksGroup) => {
        const hooksList = hooksGroup.split(",").map(hook => hook.trim());
        return `const { ${hooksList.join(", ")} } = React;`;
    });
}

const runPlaywrightTest = async (testDir, playwrightTestCode, code, css, index, testType, testName) => {
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
    const testCode = playwrightTestCode.replaceAll("///Render///", render);
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
                        suite: testName,
                        name: spec.title,
                        type: testType
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
                        const resultObj = {passed: passed, suite: testName, name: spec.title, type: testType};
                        if (!passed) {
                            resultObj.message = testResult.results[0].error.message;
                        }
                        resultList.push(resultObj);
                    })
                })
            })
        } else {
            resultList.push({passed: false, suite: testName, message: "Error running Jest", type: testType});
        }
    }
    return resultList;
}


(async() => {
    const testDir = process.env.TEST_DIR;
    const testType = process.env.TEST_TYPE;
    const index = process.env.INDEX;
    const testCode = process.env.TEST_CODE;
    const testName = process.env.TEST_NAME;

    if (testType === "jest") {
        return runJestTest(testDir, testCode, index, testName, testType);
    } else if (testType === "playwright") {
        const code = process.env.CODE;
        const css = process.env.CSS;

        return runPlaywrightTest(testDir, testCode, code, css, index, testType, testName);
    }
})()
