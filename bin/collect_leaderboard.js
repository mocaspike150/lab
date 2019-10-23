const fs = require('fs');
const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');

const total = (input) => {
  const dom = new JSDOM(input)
  const table = dom.window.document.querySelector('table');

  if(!table) {
     console.log(`No table in data file ${input}`);
     return;
  }
  const html =  table.innerHTML;
  const text =  table.textContent;
  const lines = text.split('\n').filter((d) => (d.length > 0));

  let total = 0;
  let data = [[], [], [], [], [], [], []];
  let count = -6;
  if (text.match(/There are no results./)) {
    console.log('no data');
  }
  else {
    for (let line of lines) {
      if(count > 0) {
        for (let i of [1, 2, 3, 4, 5, 6]) {
          if(count % 7 == i) {
            data[i - 1].push(line.replace(/--/, 0));
          }
        }
        if(count %7 == 0) {
          data[6].push(line.replace(/--/, 0));
        }
      
      }
      count++;
    }
  }
 

  let leaderboard = [];

  let c = 0;
  for( let i in data[0] ) {
    let tmp = [];
    for( let j in [1, 2, 3, 4, 5, 6, 7] ) {
      tmp.push(data[j][c]);
    }
    leaderboard.push(tmp);
    total += parseFloat(tmp[2])
    c++;
  } 
  return parseInt(total)
}

const collect = (id) => {
  const base = `docs/leaderboard`;

  if(id) {
    const url = `https://www.strava.com/clubs/${id}`;
    const output = `${base}/${id}.html`;
    const old_total = total(fs.readFileSync(output, 'utf8'));
    console.log('old_total', `${old_total} km`, `${(old_total * 0.621371).toFixed(1)} miles`);

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setDefaultTimeout(60000);

      await page.goto(url, {waitUntil: 'networkidle2'});
      const html = await page.evaluate(() => document.body.querySelector('.leaderboard').innerHTML);
      const new_total = total(html)
      console.log('new_total', `${new_total} km`, `${(new_total * 0.621371).toFixed(1)} miles`);
      if(new_total > old_total) {
        console.log(`${new_total} > ${old_total}`)
        fs.writeFile(output, html, (err) => { if (err) { throw err }; console.log(output); })
      }
      else {
        console.log(`${new_total} <= ${old_total}`, 'data not saved')
      }
      await browser.close()
   })()
  }
}

const id = process.argv[2] || '128445';
collect(id)
