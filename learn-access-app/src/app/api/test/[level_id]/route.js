import {getUser, hasSession} from "@/app/lib/dal";
import {renderPage} from "@/app/lib/testing/testRunner";

export async function POST(request) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const {code} = await request.json();
    try {

        const {page, browser} = await renderPage(code);
        console.log("page rendered")

        const testResults = await page.evaluate(() => {
            const root = document.getElementById('root');
            return {
                hasContent: root && root.childElementCount > 0,
                innerHTML: root ? root.innerHTML : null,
            };
        });

        await browser.close();
        console.log("tests run")

        return Response.json({success: true, testResults});
    } catch (error) {
        console.log(error)
        return Response.json({success: false, error: error.message});
    }
}