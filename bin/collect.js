const fs = require('fs');
const puppeteer = require('puppeteer');

const collect = (id) => {
  if(id) {
    const url = `https://www.strava.com/clubs/${id}`;

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setDefaultTimeout(60000);

      await page.goto(url, {waitUntil: 'networkidle2'});
      const html = await page.evaluate(() => document.body.querySelector('.leaderboard').innerHTML);
      console.log(html)
      await browser.close()
   })()
  }
}

collect(process.argv[2])
