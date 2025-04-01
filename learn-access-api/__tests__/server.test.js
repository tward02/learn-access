import request from "supertest";
import app from "../server.js";
import {passLevel} from "../server.js";
import {sql} from "@vercel/postgres";
import * as appModule from "../server.js";

jest.mock("@vercel/postgres", () => ({
    sql: jest.fn(),
}));

const validCode = `export default function App() {
    return <h1>I love WCAG!</h1>
}
`

const validCodeFailsTests = `export default function App() {
    return <h1>Hello world</h1>
}
`

const validCSS = `h1 {
    color: blue;
}
`

const tests = [
    {
        id: 1,
        levelid: 1,
        name: 'App Structure Test Suite',
        type: 'jest',
        code: "import React from 'react';\n" +
            "import { screen, render } from '@testing-library/react';\n" +
            "import '@testing-library/jest-dom';\n" +
            "import App from './App';\n" +
            '\n' +
            "it('Expect text I love WCAG! on screen', () => {\n" +
            '    render(<App />);\n' +
            "    expect(screen.getByText('I love WCAG!')).toBeInTheDocument();\n" +
            '});\n' +
            '\n' +
            "it('Expect minimum number of elements to be displayed - 5', () => {\n" +
            '    render(<App />);\n' +
            '    expect(document.querySelectorAll("*")).toHaveLength(5);\n' +
            '});\n' +
            '\n' +
            "it('Expect element to be h1', () => {\n" +
            '    render(<App />);\n' +
            '    expect(document.querySelectorAll("h1")).toHaveLength(1);\n' +
            '});'
    },
    {
        id: 7,
        levelid: 1,
        name: 'App CSS Test Suite',
        type: 'playwright',
        code: "import { test, expect } from '@playwright/test';\r\n" +
            'import React from "react";\r\n' +
            '\r\n' +
            "test('Expect h1 element to be blue rgb(0, 0, 255)', async ({ page }) => {\r\n" +
            '\r\n' +
            '    await page.setContent(`\r\n' +
            '        ///Render///\r\n' +
            '    `);\r\n' +
            '\r\n' +
            "    await page.waitForSelector('h1');\r\n" +
            '\r\n' +
            "    const element = await page.locator('h1');\r\n" +
            "    await expect(element).toHaveCSS('color', 'rgb(0, 0, 255)');\r\n" +
            '    const classCount = await element.evaluate(el => el.classList.length);\r\n' +
            '    expect(classCount).toBeLessThanOrEqual(1);\r\n' +
            '    const color = await element.evaluate(el => getComputedStyle(el).color);\r\n' +
            '\r\n' +
            "    expect(color).toBe('rgb(0, 0, 255)');\r\n" +
            '});'
    }
]

describe("Express App Endpoints", () => {

    test("GET /hello should return Hello, World!", async () => {

        const res = await request(app).get("/hello");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({message: "Hello, World!"});
    });

    describe("POST /test/:levelId", () => {

        test("if not authenticated when test/1 then return 401", async () => {

            const response = await request(app).post("/test/1")
                .send({data: {code: "<h1>Hello</h1>", css: "", user: null}});

            expect(response.status).toBe(401);
            expect(response.body).toEqual({message: "Not Authenticated"});
        })

        test("if incorrect authentication when test/1 then return 401", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});

            const response = await request(app).post("/test/1")
                .send({data: {code: "<h1>Hello</h1>", css: "", user: {id: 1, password: "wrong"}}});

            expect(response.status).toBe(401);
            expect(response.body).toEqual({message: "Not Authenticated"});
        })

        test("if no level when test/1 then return 404", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: []});

            const response = await request(app).post("/test/1")
                .send({data: {code: "<h1>Hello</h1>", css: "", user: {id: 1, username: "user", password: "password"}}});

            expect(response.status).toBe(404);
            expect(response.body).toEqual({message: "Level Not Found"});
        })

        test("if level locked when test/1 then return 403", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: true}]});

            const response = await request(app).post("/test/1")
                .send({data: {code: "<h1>Hello</h1>", css: "", user: {id: 1, username: "user", password: "password"}}});

            expect(response.status).toBe(403);
            expect(response.body).toEqual({message: "You don't have permission to do this level"});
        })

        test("if no code when test/1 then return 400", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: false}]});

            const response = await request(app).post("/test/1")
                .send({data: {code: null, css: "", user: {id: 1, username: "user", password: "password"}}});

            expect(response.status).toBe(400);
            expect(response.body).toEqual({message: "Missing Required Attribute"});
        })

        test("if unsafe code when test/1 then return 400", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: false}]});

            const response = await request(app).post("/test/1")
                .send({
                    data: {
                        code: "require('fs'); \n console.log(\"Hello World\")",
                        css: "",
                        user: {id: 1, username: "user", password: "password"}
                    }
                });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({message: "Your React code failed to compile or is unsafe"});
        })

        //IMPORTANT - Playwright tests cannot be spawned by Jest processes meaning that they will have to be tested manually and cannot be tested within these tests
        test("if valid code and passed tests when test/1 then return 200 with correct response object", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: false}]});
            sql.mockResolvedValueOnce({rows: tests});

            const response = await request(app).post("/test/1")
                .send({data: {code: validCode, css: validCSS, user: {id: 1, username: "user", password: "password"}}});

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                "passed": true,
                "tests": [
                    {
                        "passed": true,
                        "suite": "App Structure Test Suite",
                        "name": "Expect text I love WCAG! on screen",
                        "type": "jest"
                    },
                    {
                        "passed": true,
                        "suite": "App Structure Test Suite",
                        "name": "Expect minimum number of elements to be displayed - 5",
                        "type": "jest"
                    },
                    {
                        "passed": true,
                        "suite": "App Structure Test Suite",
                        "name": "Expect element to be h1",
                        "type": "jest"
                    }
                ]
            });
        })

        test("if valid code and failed tests when test/1 then return 200 with correct response object", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: false}]});
            sql.mockResolvedValueOnce({rows: tests});

            const response = await request(app).post("/test/1")
                .send({
                    data: {
                        code: validCodeFailsTests,
                        css: validCSS,
                        user: {id: 1, username: "user", password: "password"}
                    }
                });

            expect(response.status).toBe(200);
            expect(response.body.passed).toEqual(false);
            expect(response.body.tests.length).toEqual(3)
            expect(response.body.tests[0].passed).toEqual(false);
            expect(response.body.tests[0].suite).toEqual("App Structure Test Suite");
            expect(response.body.tests[0].name).toEqual("Expect text I love WCAG! on screen");
            expect(response.body.tests[0].type).toEqual("jest");
            expect(response.body.tests[0].message[0].startsWith("TestingLibraryElementError: Unable to find an element with the text: I love WCAG!. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.")).toEqual(true);
            expect(response.body.tests[1]).toEqual({
                "passed": true,
                "suite": "App Structure Test Suite",
                "name": "Expect minimum number of elements to be displayed - 5",
                "type": "jest"
            });
            expect(response.body.tests[2]).toEqual({
                "passed": true,
                "suite": "App Structure Test Suite",
                "name": "Expect element to be h1",
                "type": "jest"
            });
        });
    });

    describe("POST /submit/:levelId", () => {

        test("if not authenticated when submit/1 then return 401", async () => {

            const response = await request(app).post("/submit/1")
                .send({data: {code: "<h1>Hello</h1>", css: "", user: null}});

            expect(response.status).toBe(401);
            expect(response.body).toEqual({message: "Not Authenticated"});
        })

        test("if incorrect authentication when submit/1 then return 401", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});

            const response = await request(app).post("/submit/1")
                .send({data: {code: "<h1>Hello</h1>", css: "", user: {id: 1, password: "wrong"}}});

            expect(response.status).toBe(401);
            expect(response.body).toEqual({message: "Not Authenticated"});
        })

        test("if no level when submit/1 then return 404", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: []});

            const response = await request(app).post("/submit/1")
                .send({data: {code: "<h1>Hello</h1>", css: "", user: {id: 1, username: "user", password: "password"}}});

            expect(response.status).toBe(404);
            expect(response.body).toEqual({message: "Level Not Found"});
        })

        test("if level locked when submit/1 then return 403", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: true}]});

            const response = await request(app).post("/submit/1")
                .send({data: {code: "<h1>Hello</h1>", css: "", user: {id: 1, username: "user", password: "password"}}});

            expect(response.status).toBe(403);
            expect(response.body).toEqual({message: "You don't have permission to do this level"});
        })

        test("if no code when submit/1 then return 400", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: false}]});

            const response = await request(app).post("/submit/1")
                .send({data: {code: null, css: "", user: {id: 1, username: "user", password: "password"}}});

            expect(response.status).toBe(400);
            expect(response.body).toEqual({message: "Missing Required Attribute"});
        })

        test("if unsafe code when submit/1 then return 400", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: false}]});

            const response = await request(app).post("/submit/1")
                .send({
                    data: {
                        code: "require('fs'); \n console.log(\"Hello World\")",
                        css: "",
                        user: {id: 1, username: "user", password: "password"}
                    }
                });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({message: "Your React code failed to compile or is unsafe"});
        })

        //IMPORTANT - Playwright tests cannot be spawned by Jest processes meaning that they will have to be tested manually and cannot be tested within these tests
        test("if valid code and passed tests when submit/1 then return 200 with correct response object", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: false}]});
            sql.mockResolvedValueOnce({rows: tests});

            const response = await request(app).post("/submit/1")
                .send({data: {code: validCode, css: validCSS, user: {id: 1, username: "user", password: "password"}}});

            expect(response.status).toBe(200);
            expect(response.body).toEqual({success: true});
        })

        test("if valid code and failed tests when submit/1 then return 200 with correct response object", async () => {
            sql.mockResolvedValueOnce({rows: [{id: 1, username: "user", password: "password"}]});
            sql.mockResolvedValueOnce({rows: [{id: 1, locked: false}]});
            sql.mockResolvedValueOnce({rows: tests});

            const passLevelSpy = jest.spyOn(appModule, "passLevel");

            const response = await request(app).post("/submit/1")
                .send({
                    data: {
                        code: validCodeFailsTests,
                        css: validCSS,
                        user: {id: 1, username: "user", password: "password"}
                    }
                });

            expect(passLevelSpy).not.toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual({success: false})

            passLevelSpy.mockRestore();
        })
    });
});