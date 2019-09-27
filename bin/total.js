const fs = require('fs')
const src = `data/json`
const files = fs.readdirSync(src).filter(fn => fn.endsWith('.json'))

let output = {}

for (const file of files) {
  const fn = `${src}/${file}`
  const id = file.replace(/\.json/, '')
  const data = JSON.parse(fs.readFileSync(fn, 'utf8'))
  output[id] = data
}

fs.writeFile('data/leaderboard.json', JSON.stringify(output, null, 2), (err) => { if (err) { throw err }; console.log(output); })
