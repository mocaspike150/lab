global.fetch = require('node-fetch')
const fs = require('fs')

const strava = (id) => {
  if(id) {
    const api = `https://mocaspike150-strava-leaderboard.ontouchstart.now.sh/${id}`;

    fetch(api).then(res => res.text())
      .then( html => {
        const output = `data/collected_html/${id}.html`;
        fs.writeFile(output, html, (err) => { if (err) { throw err }; console.log(output); })
      })
      .catch( err => { console.log(err) })
  }
}

strava(process.argv[2])
