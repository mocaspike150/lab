global.fetch = require('node-fetch')
const fs = require('fs')
const api = 'https://www.mocaspike150.org/api/relay/week.json'
const start = new Date('2019-05-13T04:00:00')
const now = new Date()
const weeks_since_start = Math.floor((now - start) / (3600 * 1000 * 24 * 7)) 
let current_miles = {}
let name = {}
fetch(api).then(res => res.text())
  .then(json => {
     const data = JSON.parse(json)
     for(let i = 1; i < weeks_since_start + 1; i++) {
       let key = i < 10 ? `0${i}` : `${i}`
       for(const team of data[key].teams) {
         current_miles[team.id] = 0
         name[team.id] = team.name
       }
       for(const team of data[key].teams) {
         current_miles[team.id] += team.mile
       }
     }
     const teams = data[weeks_since_start+1].teams.map(d=>d.id)
     const leaderboard = JSON.parse(fs.readFileSync('data/leaderboard.json', 'utf8'))
     for(const id of teams) {
       if(leaderboard[id].length > 0) {
         const km = leaderboard[id].map( d => parseFloat(d[2]) * 0.621371)
         const miles = parseInt(km.reduce((x, y) => (x + y)))
         current_miles[id] += miles
       }
     }
     team_ranking = Object.keys(current_miles).map((k) => [k, name[k], current_miles[k]]).sort((x,y) => (x[2] < y[2] ? 1 : -1))
     console.log(`"Rank","ID","Name","Total miles"`)
     let rank = 1
     for(const team of team_ranking) {
        console.log(`${rank},"${team[0]}","${team[1]}",${team[2]}`)
        rank++;
     }
  })

  .catch( err => { console.log(err) })
