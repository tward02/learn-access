import {test, expect} from "@playwright/test";

test("Video has captions displayed", async ({ page }) => {
    await page.setContent(`
        ///Render///
    `);

    await page.waitForTimeout(1000);

    const video = page.locator("video");
    await video.click();
    await page.waitForTimeout(2000);

    const captions = await page.locator("track").getAttribute("kind");
    console.log(captions);
    expect(captions).toBe("captions");
});
