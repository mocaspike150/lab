global.fetch = require('node-fetch');
const fs = require('fs');
const d3 = require('d3');

const error = (e) => {
  console.log(e);
}

let Makefile = `NODE=/usr/bin/node
update: pull total 

pull:
	git pull

`

const make = (d) => {
  Makefile += `collect:
`
  for(const id in d) {
    Makefile += `	$(NODE) bin/collect.js ${id}
`
  }
  Makefile += `
	git add data/collected_html
	git commit -m 'collect html by Makefile' | true
	git push
`

  Makefile += `latest: collect
`

  for(const id in d) {
      Makefile += `	$(NODE) bin/latest.js ${id}
`
  }

  Makefile += `
	git add data/html
	git commit -m 'update latest html by Makefile' | true
	git push
`

  Makefile += `convert: latest
`

  for(const id in d) {
    Makefile += `	$(NODE) bin/convert.js ${id}
`
  }

  Makefile += `
	git add data/json
	git commit -m 'update json by Makefile' | true
	git push
`
  Makefile += `total: convert
`
  Makefile += `	$(NODE) bin/total.js `
  Makefile += `
	date > data/update_time.txt
	git add data/leaderboard.json
	git add data/update_time.txt
	git commit -m 'update total by Makefile' | true
	git push
`

  fs.writeFile('Makefile', Makefile, (err) => { if (err) throw err; console.log(Makefile); })
}

d3.json('https://www.mocaspike150.org/api/club/profile.json')
  .then(make)
  .catch(error); 
