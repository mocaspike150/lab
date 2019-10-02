const fs = require('fs')
const axios = require('axios')
const data = 'https://www.mocaspike150.org/data/ambassadors.json'

const dir = 'docs/ambassadors-slideshow'
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

let html = `
<html>
<head>
<style>
* {
  position: absolute;
  padding: 0;
  margin: 0;
  color: #FFFFFF;
  background: #000000;
}

#container {
  opacity: 0;
  transition-duration: 2s;
}

.slide {
  width: 100%;
  transition-duration: 0s;
  opacity: 0;
}

.slide .qr {
  top: 108px;
  width: 128px;
  height: 128px;
}

.slide h1.name {
  padding: 17px;
  font-size: 64px;
  font-family: Arial, Helvetica, sans-serif;
  color: #FFFFFF;
  background: rgba(255, 161, 10, 0.5);
}

.slide h1.title {
  top: 702px;
  padding: 17px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 17px;
  font-size: 64px;
  color: #FFFFFF;
  background: rgba(255, 161, 10, 0.5);
}

</style>
</head>
<body>
<h1>Please wait</h1>
<div id="container">
`

axios.get(data)
  .then( (res) => {
    for(const d of res.data) {
      const subdir = `${dir}/${d.id}`
      const profile = fs.readFileSync(`${subdir}/profile.html`, 'utf-8')
      html += profile
    }

    html += `
</div>
<script>
   window.onload = () => {
	 const container = document.getElementById('container')
	 container.style.opacity = 1;
     let slides = document.querySelectorAll('.slide');
     let i = 0;
     const show = () => {
       console.log(i);
       if (i == slides.length) { 
         slides[i-1].style.opacity = 0
         i = 0;
       }
       slides[i].style.opacity = 1
       if(i > 0) {
         slides[i-1].style.opacity = 0
       }
       i++;
     }
     show();
     setInterval(show, 5000);
   } 

   window.onresize = () => {
     container.style.width = \`\${window.innerWidth}px\`
     container.style.height = \`\${window.innerHeight}px\`
   }
   window.onresize();
</script>
</body>
</html>
`

    const fn = `${dir}/slideshow.html`
     fs.writeFile(fn, html, (err) => {
      if(err) {
        console.log(err)
      }
      else {
        console.log(fn)
      }
    })
  })
  .catch((error) => {
    console.log(error.res.data)
  });
