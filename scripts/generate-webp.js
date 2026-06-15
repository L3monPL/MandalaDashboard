const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '../src/assets');

function findImages(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...findImages(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(item.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function convertToWebP() {
  const images = findImages(assetsDir);
  console.log(`Found ${images.length} images to convert...`);

  for (const imgPath of images) {
    const webpPath = imgPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    if (!fs.existsSync(webpPath)) {
      await sharp(imgPath).webp({ quality: 85 }).toFile(webpPath);
      console.log(`  converted: ${path.relative(assetsDir, imgPath)}`);
    } else {
      console.log(`  skipped:   ${path.relative(assetsDir, path.basename(webpPath))} (exists)`);
    }
  }
  console.log('Done.');
}

convertToWebP().catch(console.error);
