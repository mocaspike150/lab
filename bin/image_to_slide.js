const fs = require('fs')
const sharp = require('sharp')
const w = 1920
const h = 1080

const dir = 'docs/slides'
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

for(let file of fs.readdirSync('images')) {
  console.log(file);
  const input = `images/${file}`
  const output = `docs/slides/${file}.html`
  sharp(input)
    .resize({ width: w, height: h, fit: 'contain' })
    .toBuffer()
    .then( (data) => {
       const html = `<img width="100%" src="data:image/png;base64,${data.toString('base64')}"/>`
       fs.writeFile(output, html, (err) => {
         if(err) {
           console.log(err)
         }
         else {
           console.log(output)
         }
       })
    })
}

