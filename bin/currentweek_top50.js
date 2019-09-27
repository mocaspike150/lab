const fs = require('fs')

const weekdata = (leaderboard) => {
  let output = [];
  for (let id in leaderboard){
    let club = leaderboard[id]
    for (let c of club){
      const mile = c[2]
      if(mile) {
      let runner = {
        club_id : id,
        name : c[1],
        mile : (c[2] ? parseFloat(c[2])*0.621371 : 0),
        count : c[3]
      }
      output.push(runner)
      }
    }
  }
  return output
}

const by_mile_and_name =  (a, b) => {  
  if(b.mile < a.mile) {
    return -1
  }
  if(b.mile > a.mile ) {
    return 1
  }
  return b.name <= a.name ? 1 : -1
}

const uniq = (input) => {
  let previous = input[0]
  let output = [previous]
  for (const i of input) {
    if (i.name != previous.name || i.mile != previous.mile  ) {
      previous = i
      output.push(i)
    }
  }
  return output
}

const top50 = (weekid) => {
  const path = `data/leaderboard/week${weekid}`
  const club_ids = JSON.parse(fs.readFileSync(`${path}/club_ids.json`, 'utf8'))
  const input = `${path}/leaderboard.json` 
  if(! fs.existsSync(input) ) {
    console.log(`${input} doesn't exist`)
    return;
  }
  const all_leaderboard = JSON.parse(fs.readFileSync(input, 'utf8'))

  let leaderboard = {}
  for( let id of club_ids) {
    leaderboard[id] = all_leaderboard[id]
  }
  const top50 = uniq(weekdata(leaderboard).sort(by_mile_and_name)).slice(0, 50)

  fs.writeFile(`${path}/top50.json`, JSON.stringify(top50, null, 2), (err) => { if (err) { throw err }; console.log(`${path}/top50.json`) })

  let csv = `"Club ID", "Runner", "Distance", "Runs"\n`
  for(const runner of top50) {
    csv += `"${runner.club_id}","${runner.name}","${runner.mile}","${runner.count}"\n`
  }
  fs.writeFile(`${path}/top50.csv`, csv, (err) => { if (err) { throw err }; console.log(`${path}/top50.csv`) })
}


const today = new Date()
const start = new Date('2019-05-13T00:00:00')
const weeks_since_start = Math.floor((today - start) / (3600 * 1000 * 24 * 7)) + 1
const weekid = (weeks_since_start < 10) ? `0${weeks_since_start}` : `${weeks_since_start}`

const leaderboard = fs.readFileSync('data/leaderboard.json', 'utf8')
fs.writeFileSync(`data/leaderboard/week${weekid}/leaderboard.json`, leaderboard)

console.log(leaderboard)
console.log(today)
console.log(weekid)
top50(weekid)

