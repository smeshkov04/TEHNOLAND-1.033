const fs = require('fs');
const path = require('path');

const partsDir = path.join(__dirname, '../src');
const assetsDir = path.join(__dirname, '../assets');
const publicDir = path.join(__dirname, '../public');
const publicAssetsDir = path.join(publicDir, 'assets');
const outputFile = path.join(publicDir, 'index.html');

/**
 * Порядок слияния: HTML-обёртка -> визуализатор -> 3 игры
 */
const MERGE_ORDER = [
    'ManipulatorVisualizer.jsx',
    '2_proto.jsx',
    '3_model.jsx',
    '4_code.jsx'
];

let baseContent = fs.readFileSync(path.join(partsDir, '1_base.html'), 'utf8');
let moduleContent = '';

for (const file of MERGE_ORDER) {
    const filePath = path.join(partsDir, file);
    if (!fs.existsSync(filePath)) {
        console.error(`MISSING SOURCE PART: ${filePath}`);
        process.exitCode = 1;
        continue;
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    moduleContent += '\n/* START OF ' + file + ' */\n' + fileContent + '\n/* END OF ' + file + ' */\n\n';
}

const finalContent = baseContent.replace('// [MODULE_INJECTION_MARKER]', () => moduleContent);

try {
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(outputFile, finalContent, 'utf8');
    console.log(`COMPILED ${MERGE_ORDER.length + 1} parts -> ${outputFile}`);
    
    // Sync with React project public/games
    const projectPublicDir = path.join(__dirname, '../project/public/games');
    const projectOutputFile = path.join(projectPublicDir, 'index.html');
    if (fs.existsSync(path.join(__dirname, '../project'))) {
        if (!fs.existsSync(projectPublicDir)) fs.mkdirSync(projectPublicDir, { recursive: true });
        fs.writeFileSync(projectOutputFile, finalContent, 'utf8');
        console.log(`SYNCED -> ${projectOutputFile}`);
    }
} catch (err) {
    console.error(`ERROR WRITING OUTPUT:`, err);
}

try {
    if (fs.existsSync(assetsDir)) {
        if (fs.cpSync) {
            fs.cpSync(assetsDir, publicAssetsDir, { recursive: true });
        } else {
            if (!fs.existsSync(publicAssetsDir)) fs.mkdirSync(publicAssetsDir, { recursive: true });
            const entries = fs.readdirSync(assetsDir, { withFileTypes: true });
            for (const entry of entries) {
                if (entry.isFile()) {
                    fs.copyFileSync(path.join(assetsDir, entry.name), path.join(publicAssetsDir, entry.name));
                }
            }
        }
        console.log(`ASSETS COPIED -> ${publicAssetsDir}`);

        // Sync assets with React project
        const projectAssetsDir = path.join(__dirname, '../project/public/games/assets');
        if (fs.existsSync(path.join(__dirname, '../project'))) {
            if (!fs.existsSync(projectAssetsDir)) fs.mkdirSync(projectAssetsDir, { recursive: true });
            if (fs.cpSync) {
                fs.cpSync(assetsDir, projectAssetsDir, { recursive: true });
            }
            console.log(`ASSETS SYNCED -> ${projectAssetsDir}`);
        }
    }
} catch (err) {
    console.error(`ERROR COPYING ASSETS:`, err);
}
