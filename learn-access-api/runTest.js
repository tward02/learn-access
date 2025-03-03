const util = require("util");
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

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


function printDirectoryStructure(dir, indent = '') {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const isDirectory = fs.statSync(fullPath).isDirectory();
        console.log(indent + (isDirectory ? '📁 ' : '📄 ') + file);
        if (isDirectory) {
            printDirectoryStructure(fullPath, indent + '  '); // Recursively print subdirectories
        }
    }
}

const runJestTest = async (testPath) => {

    printDirectoryStructure('./');

    const finalPath = testPath.replace(/\\/g, "/");

    await execPromise(`npx jest --config jest.config.js --findRelatedTests ${finalPath} --json`);
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
    const testDir = process.env.TEST_PATH;
    const testType = process.env.TEST_TYPE;

    if (testType === "jest") {
        return runJestTest(testDir);
    } else if (testType === "playwright") {
        const code = process.env.CODE;
        const css = process.env.CSS;

        return runPlaywrightTest(testDir, testCode, code, css, index, testType, testName);
    }
})()
