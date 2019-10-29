const fs = require('fs')
const sharp = require('sharp')
const w = 1920
const h = 1080

console.log(process.argv)
const input_dir = process.argv[2]  || 'images';
const output_dir = process.argv[3]  || '/tmp/images';
if (!fs.existsSync(output_dir)){
    fs.mkdirSync(output_dir, { recursive: true });
}

let count = 0;
for(let file of fs.readdirSync(input_dir)) {
  const input = `${input_dir}/${file}`
  const output = count < 10 ? `${output_dir}/0${count}.jpg` : `${output_dir}/${count}.jpg`
  count++;
  console.log(file);
  console.log(output);
  sharp(input)
    .resize({ width: w, height: h, fit: 'contain' })
    .toFile(output, (err, info) => { console.log(info) });
}

