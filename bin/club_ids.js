const fs = require('fs')
global.fetch = require('node-fetch')

const api = 'https://www.mocaspike150.org/api/relay/week.json'

fetch(api).then(res => res.json())
  .then(data => {
    for(const weekid in data) {
      const path = `data/leaderboard/week${weekid}/`
      fs.mkdirSync(path, { recursive: true });
      const output = data[weekid].teams.map((d) => (d.id))
      fs.writeFile(`${path}/club_ids.json`, JSON.stringify(output, null, 2), (err) => { if (err) { throw err }; console.log(output); })
    }
  })
  .catch((error) => { console.log(error) })

