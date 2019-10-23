const fs = require('fs');
const puppeteer = require('puppeteer');

const collect = (id) => {
  const base = `docs/leaderboard`;

  if(id) {
    const url = `https://www.strava.com/clubs/${id}`;
    const output = `${base}/${id}.html`;

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setDefaultTimeout(60000);

      await page.goto(url, {waitUntil: 'networkidle2'});
      const html = await page.evaluate(() => document.body.querySelector('.leaderboard').innerHTML);
      fs.writeFile(output, html, (err) => { if (err) { throw err }; console.log(output); })
      await browser.close()
   })()
  }
}

const id = process.argv[2] || '128445';
collect(id)
