const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'public', 'libs');
const destFile = path.join(destDir, 'three.min.js');
const localCandidates = [
  path.join(__dirname, '..', 'node_modules', 'three', 'build', 'three.min.js'),
  path.join(__dirname, '..', 'node_modules', 'three', 'build', 'three.js'),
  path.join(__dirname, '..', 'node_modules', 'three', 'build', 'three.module.js'),
];
const urls = [
  'https://unpkg.com/three@0.180.0/build/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.min.js',
];

// Try to copy from local node_modules first
for (const candidate of localCandidates) {
  if (fs.existsSync(candidate)) {
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(candidate, destFile);
    console.log(`Copied local three.js from ${candidate} to ${destFile}`);
    process.exit(0);
  }
}

fs.mkdirSync(destDir, { recursive: true });

console.log(`Downloading three.js to ${destFile}`);

function tryDownload(index = 0) {
  if (index >= urls.length) {
    console.error('All download attempts failed');
    process.exit(1);
  }

  const url = urls[index];
  console.log(`Trying ${url}`);

  https.get(url, (res) => {
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(destFile);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('three.min.js downloaded');
      });
    } else {
      console.warn(`Failed to download from ${url}: status ${res.statusCode}`);
      tryDownload(index + 1);
    }
  }).on('error', (err) => {
    console.error(`Error downloading from ${url}:`, err.message);
    tryDownload(index + 1);
  });
}

tryDownload();
