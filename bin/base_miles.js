global.fetch = require('node-fetch')
const api = 'https://www.mocaspike150.org/api/relay/week.json'
const start = new Date('2019-05-13T04:00:00')
const now = new Date()
const weeks_since_start = Math.floor((now - start) / (3600 * 1000 * 24 * 7)) 
let base_miles = 0;
fetch(api).then(res => res.text())
  .then( json => {
     const data = JSON.parse(json)
     for(let i = 1; i < weeks_since_start + 1; i++) {
       let key = i < 10 ? `0${i}` : `${i}`
       let mile = 0;
       for(const team of data[key].teams) {
         mile += team.mile
       }
       base_miles += mile
     }
     console.log(base_miles)
  })
  .catch( err => { console.log(err) })
