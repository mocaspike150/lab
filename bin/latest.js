const fs = require('fs');
const skipped = [
  '72363',   // ChiRunners 
  '128445',  // BURN
  '204946'   // NewBee  (the last element has no comma)
];
const latest = (id) => {
  if(id) {
    if( skipped.includes(id) ) {
     console.log(`Skip ${id}`);
    } 
    else {
      const input = `data/collected_html/${id}.html`;
      const output = `data/html/${id}.html`;
      const html = fs.readFileSync(input, 'utf8');
      fs.writeFile(output, html, (err) => { if (err) throw err; console.log(output); })
    }
  }
}

latest(process.argv[2])
