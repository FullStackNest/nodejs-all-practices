const axios = require('axios');
const cheerio = require('cheerio');

// URL to scrape
const url = 'https://en.m.wikipedia.org/wiki/Vande_Bharat_Express';

// Make a GET request to the URL
axios.get(url)
    .then(response => {
        // Load the HTML into Cheerio
        const $ = cheerio.load(response.data);

        // Extract data using CSS selectors
        const titles = [];
        $('h2').each((index, element) => {
            titles.push($(element).text().trim().replaceAll('\n', ''));
        });

        // Output the scraped data
        console.log('Titles:', titles);
    })
    .catch(error => {
        console.error('Error:', error);
    });
