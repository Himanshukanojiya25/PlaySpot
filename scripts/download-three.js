const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'public', 'libs');
const destFile = path.join(destDir, 'three.min.js');
const url = 'https://unpkg.com/three@0.180.0/build/three.min.js';

fs.mkdirSync(destDir, { recursive: true });

console.log(`Downloading three.js from ${url} to ${destFile}`);

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download three.js: status ${res.statusCode}`);
    process.exit(1);
  }

  const file = fs.createWriteStream(destFile);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('three.min.js downloaded');
  });
}).on('error', (err) => {
  console.error('Error downloading three.js', err.message);
  process.exit(1);
});
