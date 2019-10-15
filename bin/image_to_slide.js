const fs = require('fs')
const sharp = require('sharp')

const dir = 'docs/slides'
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

/*
axios.get(data)
  .then( (res) => {
    for(const d of res.data) {
      const image = d['post-image'] ? d['post-image'] : placeholder
      if(!d['post-image']) {
         console.log('missing post-image', d.id)
      }
      const subdir = `${dir}/${d.id}`
      if (!fs.existsSync(subdir)) { fs.mkdirSync(subdir, { recursive: true }) }
      const fn = `${subdir}/img.html`
      const w = 1920
      const h = 1080
      axios.get(image, { responseType: 'arraybuffer' })
       .then( (response) => {
         buffer = Buffer.from(response.data, 'binary')
         sharp(buffer).resize({ width: w, height: h, fit: 'contain' })
           .toBuffer()
           .then( (data) => { 
             const html = `<img width="100%" src="data:image/png;base64,${data.toString('base64')}"/>`
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
         console.log(error.response.data)
       })
    }
  })
  .catch((error) => {
    console.log(error.res.data)
  });
*/
