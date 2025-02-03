import 'server-only';
import puppeteer from "puppeteer";
import {testCodeHTMLTemplate} from "@/app/lib/utility/utility";

export const renderPage = async (code) => {

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],});
    const page = await browser.newPage();
    const c = testCodeHTMLTemplate(code);
    console.log(c)
    await page.setContent(c, {waitUntil: 'networkidle0'});
    await page.waitForSelector('#root > *', {timeout: 5000});
    return {page, browser};
}
