const fs = require('fs')
const QRCode = require('qrcode')
const axios = require('axios')
const data = 'https://www.mocaspike150.org/data/ambassadors.json'
const dir = 'docs/ambassadors-slideshow'
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const qr = (path, fn) => {
  QRCode.toDataURL(path, function (err, url) {
    const html = `
      <img width="100%" src="${url}"/>
      `
    fs.writeFile(fn, html, (err) => {
      if(err) {
        console.log(err)
      }
      else {
        console.log(fn)
      }
    })
  })
}

const url = 'https://www.crowdrise.com/o/en/campaign/moca-spike-150'
qr(url, 'docs/moca-spike-150.html')
