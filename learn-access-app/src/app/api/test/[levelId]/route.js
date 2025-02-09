import {hasSession} from "@/app/lib/dal";
import {renderPage} from "@/app/lib/testing/testRunner";

const tests = [
    "(function() { return document.getElementById('root').childElementCount > 0; })()",
    "(function() { return document.querySelector('.greeting') !== null; })()",
    "(async function() { const el = document.querySelector('.greeting'); return el && el.textContent === 'Hello, JSX & CSS World!'; })()"
]

export async function POST(request, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const levelId = (await params).levelId;

    const body = await request.json();
    const code = body?.code;
    const css = body?.css;
    try {

        const {page, browser} = await renderPage(code, css);

        const render = await page.evaluate(() => {
            const root = document.getElementById('root');
            return {
                hasContent: root && root.childElementCount > 0,
                innerHTML: root ? root.innerHTML : null,
            };
        });

        let testResults = [];
        if (Array.isArray(tests) && tests.length > 0) {
            testResults = await page.evaluate(async (tests) => {
                return await Promise.all(
                    tests.map(async (testCode) => {
                        try {
                            const result = await eval(testCode);
                            return {success: true, result};
                        } catch (error) {
                            return {success: false, error: error.toString()};
                        }
                    })
                );
            }, tests);
        }

        await browser.close();

        return Response.json({success: true, testResults});
    } catch (error) {
        console.log(error)
        return Response.json({success: false, error: error.message});
    }
}
