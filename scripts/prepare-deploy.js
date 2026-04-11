const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../public/index.html');
const destDir = path.join(__dirname, '../project/public/games');
const dest = path.join(destDir, 'index.html');

// Create directory if not exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy file
if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`READY: Copied ${src} -> ${dest}`);
} else {
    console.error(`ERROR: Source file ${src} not found. Run "npm run merge" first.`);
    process.exit(1);
}
