const fs = require('fs');
const path = require('path');

const dir = 'public/gallery';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.startsWith('images (') && file.endsWith(').jpg')) {
    const num = file.match(/\d+/)[0];
    const newName = `image-${num}.jpg`;
    fs.renameSync(path.join(dir, file), path.join(dir, newName));
  }
}
console.log('Renamed all images.');
