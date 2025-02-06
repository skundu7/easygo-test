import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { chromium, Browser, Page, request} from "@playwright/test";
import { pageFixture } from "./pageFixture";


let browser: Browser;
let page: Page

Before({tags: "not @api "},async function () {
    
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage();
   pageFixture.page = page;
})

After({tags: "not @api "},async function () {
    await page.close()
    await browser.close()
})
