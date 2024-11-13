const puppeteer = require('puppeteer');

// URL of the website you want to automate
const url = 'https://en.m.wikipedia.org/wiki/Vande_Bharat_Express';
const xpath = '/html/body/div[1]/div/main/div[3]/div/div[1]/section[1]/p[2]/a[2]';

// Function to automate the website
const automateWebsite = async () => {
    // Launch a headless browser
    // if headless is false then Chrome will be appeared to be running,
    const browser = await puppeteer.launch({ headless: false });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the website
    await page.goto(url);

    // Wait for the button to be available and click it
    // await page.waitForSelector('button'); // You can replace 'button' with the actual selector of the button
    // await page.click('button');


    await page.waitForXPath(xpath);
    const [link] = await page.$x(xpath);
    if (link) {
        await link.click();
    } else {
        console.error('Link not found.');
    }


    // Wait for the page to load after clicking the button
    await page.waitForNavigation();

    // Take a screenshot (optional)
    await page.screenshot({ path: 'screenshot.png' });

    // Extract and output some data (optional)
    const title = await page.title();
    console.log('Page Title:', title);

    // Close the browser
    await browser.close();
};

// Run the automation function
automateWebsite();

// <a href="/wiki/Shatabdi_Express" title="Shatabdi Express">Shatabdi Express</a>
// /html/body/div[1]/div/main/div[3]/div/div[1]/section[1]/p[2]/a[2]
// /html/body/div[1]/div/main/div[3]/div/div[1]/section[1]/p[2]/a[2]
// React: react-bootstrap, mui, chakra ui, NextJS, M(mysql, mongo)ERN, 