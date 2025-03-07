import {db} from '@vercel/postgres';

const client = await db.connect();

const seedTutorial = async () => {
    await client.sql`
        INSERT INTO levels (name, description, objectives, expiration, previousLevelId, enhancedDescription)
        VALUES ('Tutorial', 'Introduction to the application and the basics.',
                '1. Change the h1 element to display "I love WCAG!" \n\n2. Change the colour of the h1 element to be blue rgb(0, 0, 255) \n\n3. No other elements should be displayed',
                NULL, NULL,
                'This is a tutorial on the basics of using the application and completing levels. \n\nThe Description tells you about the content of the level, the WCAG challenges being tackled and any background knowledge needed. \n\nThe Objectives section lays out what you must do in order to complete the level and advance to the next. \n\nThe code editor will render anything coded in react into the window to the right, any console outputs being displayed below that. \n\nHints can be viewed and using the Hint button, a maximum of three hints are allowed per level. The reset button will reset the code in the editor to the default value and cannot be undone. The Test button will run the test suites on your solution in order to check if it has passed, all results will be displayed in the test console and finally the Submit button will submit your solution.')
    `

    await client.sql`
        INSERT INTO level_files (levelId, name, fileType, content, readOnly)
        VALUES (id, 'App.js', 'js', 'export default function App() {\n    return <h1>Hello world</h1>\n}', FALSE),
               (id, 'styles.css', 'css', 'h1 {\n    color: red;\n}', FALSE)
    `

    await client.sql`
        INSERT INTO level_tests (levelId, name, type, code)
        VALUES (id, 'App Structure Test Suite', 'jest',
                'import React from ''react'';\nimport { screen, render } from ''@testing-library/react'';\nimport ''@testing-library/jest-dom'';\nimport App from ''./App'';\n\nit(''Expect text I love WCAG! on screen'', () => {\n    render(<App />);\n    expect(screen.getByText(''I love WCAG!'')).toBeInTheDocument();\n});\n\nit(''Expect minimum number of elements to be displayed - 5'', () => {\n    render(<App />);\n    expect(document.querySelectorAll("*")).toHaveLength(5);\n});\n\nit(''Expect element to be h1'', () => {\n    render(<App />);\n    expect(document.querySelectorAll("h1")).toHaveLength(1);\n});'),
               (id, 'App CSS Test Suite', 'playwright',
                'import { test, expect } from ''@playwright/test'';\nimport React from "react";\n\ntest(''Expect h1 element to be blue and it to be the only styling affecting the element'', async ({ page }) => {\\n    await page.setContent(\`\\n        ///Render///\\n    \`);\\n\\n    await page.waitForSelector(''h1'');\\n\\n    const element = page.locator(''h1'');\\n    await expect(element).toHaveCSS(''color'', ''rgb(0, 0, 255)'');\\n\\n    const classCount = await element.evaluate(el => el.classList.length);\\n    expect(classCount).toBeLessThanOrEqual(1);\\n\\n    const onlyInlineColorApplied = await element.evaluate(el => {\\n        return el.style.length === 1 && el.style.color === ''blue'';\\n    });\\n\\n    const onlyClassColorApplied = await element.evaluate(el => {\\n        if (el.style.length > 0) return false;\\n\\n        const className = el.classList[0];\\n        if (!className) return false;\\n\\n        for (const sheet of document.styleSheets) {\\n            for (const rule of sheet.cssRules) {\\n                if (rule.selectorText === ''.'' + className) {\\n                    return rule.style.length === 1 && rule.style.color === ''blue'';\\n                }\\n            }\\n        }\\n        return false;\\n    });\\n\\n    const onlyElementSelectorApplied = await element.evaluate(el => {\n        if (el.style.length > 0 || el.classList.length > 0) return false;\n        for (const sheet of document.styleSheets) {\n            for (const rule of sheet.cssRules) {\n                if (rule.selectorText === ''h1'') {\n                    return rule.style.length === 1 && rule.style.color === ''blue'';\n                }\n            }\n        }\n        return false;\n    });\n\n    expect(onlyInlineColorApplied || onlyClassColorApplied || onlyElementSelectorApplied).toBe(true);\n});')
    `
}

const seedFocus = async () => {
    await client.sql`
        INSERT INTO levels (name, description, objectives, expiration, previousLevelId, enhancedDescription)
        VALUES ('Keeping Focus', 'This level explores the importance of focus and keyboard navigation in user interfaces',
                '1. Ensure that when the Modal is opened focus switches onto the button on the Modal \n\n2. When the Modal is closed ensure focus is switched back to the open button \n\n3. The user should also be able to use the keyboard to carry out operations, the Escape key should close the modal, pressing Enter or Space should activate the buttons and pressing Tab should allow the user to navigate between focusable elements',
                NULL, 6,
                'Focus Order (WCAG Refernce 2.4.3) and Keyboard Navigation (WCAG Reference 2.1.1) are both very important parts of WCAG. When they are implemented badly or not at all people who are unable to use a mouse can find it very difficult or even impossible to navigate web pages. \n\nIt is important that when users carry out certain actions the focus remains/is moved to a place on the page that is relevenat to the action and makes sense to the user. \n\n Goals:\n\n 1. Everything can be done with a keyboard except freehand movements. Esnure pointer actions have a keyboard equivalent, as many people rely on the keyboard interface, including blind and some mobility impaired people. \n\n2. Keyboard users navigate content in a correct order. Elements receive focus in an order that preserves meaning so that navigating a website with only a keyboard make sense. \\links\\https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html,https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html')
    `
}

export async function GET(request) {

    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return Response.json({error: 'Authorization header missing or invalid'}, {status: 401});
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return Response.json({error: 'Token is missing'}, {status: 401});
    }

    if (process.env.ADMIN_SECRET !== token) {
        return Response.json({error: "You do not have permission to do this"}, {status: 403});
    }

    try {
        await client.sql`BEGIN`;
        await seedTutorial();
        await seedFocus();
        await client.sql`COMMIT`;

        return Response.json({message: 'Levels seeded successfully'});
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({error}, {status: 500});
    }
}
