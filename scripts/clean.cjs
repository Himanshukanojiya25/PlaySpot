const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const three = path.join(__dirname, '..', 'public', 'libs', 'three.min.js');

function rm(fileOrDir) {
  if (!fs.existsSync(fileOrDir)) return;
  const stat = fs.statSync(fileOrDir);
  if (stat.isDirectory()) {
    fs.rmSync(fileOrDir, { recursive: true, force: true });
  } else {
    fs.unlinkSync(fileOrDir);
  }
}

rm(dist);
rm(three);
console.log('Cleaned dist and public/libs/three.min.js');
