const cron = require("node-cron");
const express = require("express");

const PORT = 5100;
const app = express();

/**
 *  1(sec)        2(min)         3(hrs)       4(Day)       5(Month)       6(Day of Week)
 *   *(0-59)       *(0-59)        * (0-23)      * (1-31)     * (1-12)        * (0 to 7 Sun to Sat)
 * 
 */



cron.schedule("*/30 * * * * *", () => {
    console.log(`Working on every 30 sec`);

})

// cron.schedule("*/5 * * * * *", () => {
//     console.log(`Working on 30 sec`);

// })

// cron.schedule('* * * 1-12 Wednesday', () => {
//     console.log('running on Wednesdays of every month');
// });

app.listen(PORT, () => {
    console.log(`Server started at `, PORT);

})

