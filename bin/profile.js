const fs = require('fs')
const axios = require('axios')
const data = 'https://www.mocaspike150.org/data/ambassadors.json'

const dir = 'docs/ambassadors-slideshow'
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

axios.get(data)
  .then( (res) => {
    res.data.forEach((d) => {
      const subdir = `${dir}/${d.id}`
      const img = fs.readFileSync(`${subdir}/img.html`, 'utf-8')
      const qr = fs.readFileSync(`${subdir}/qr.html`, 'utf-8')
      const html = `
<div class="slide">
${img}
<div class="qr">
${qr}
</div>
<h1 class="name">${d.firstname} ${d.lastname}</h1>
</div>
`
     const fn = `${subdir}/profile.html`
     fs.writeFile(fn, html, (err) => {
      if(err) {
        console.log(err)
      }
      else {
        console.log(fn)
      }
    })
    })
  })
  .catch((error) => {
    console.log(error.res.data)
  });
