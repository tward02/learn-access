import 'server-only';
import puppeteer from "puppeteer";
import {testCodeHTMLTemplate} from "@/app/lib/utility/utility";

export const renderPage = async (code, css) => {

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],});
    const page = await browser.newPage();
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
    const html = testCodeHTMLTemplate(code, css);
    await page.setContent(html, {waitUntil: 'networkidle0'});
    await page.waitForSelector('#root > *', {timeout: 5000});
    return {page, browser};
}
