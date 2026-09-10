const sharp = require('sharp');
const path = require('path');

const OUTPUT = path.join(__dirname, '../src/assets/og-image.png');
const LOGO   = path.join(__dirname, '../src/assets/logo/Mandala_zloto_sygnet.png');

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0e18"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Bottom gold accent bar -->
  <rect x="0" y="${H - 5}" width="${W}" height="5" fill="#C5A342"/>

  <!-- Decorative mandala rings (right side) -->
  <circle cx="960" cy="315" r="200" fill="none" stroke="#C5A342" stroke-width="0.5" opacity="0.1"/>
  <circle cx="960" cy="315" r="155" fill="none" stroke="#C5A342" stroke-width="0.5" opacity="0.15"/>
  <circle cx="960" cy="315" r="110" fill="none" stroke="#C5A342" stroke-width="0.8" opacity="0.2"/>
  <circle cx="960" cy="315" r="68"  fill="none" stroke="#C5A342" stroke-width="1"   opacity="0.3"/>
  <line x1="960" y1="115" x2="960" y2="515" stroke="#C5A342" stroke-width="0.4" opacity="0.08"/>
  <line x1="760" y1="315" x2="1160" y2="315" stroke="#C5A342" stroke-width="0.4" opacity="0.08"/>
  <line x1="818" y1="173" x2="1102" y2="457" stroke="#C5A342" stroke-width="0.4" opacity="0.06"/>
  <line x1="1102" y1="173" x2="818"  y2="457" stroke="#C5A342" stroke-width="0.4" opacity="0.06"/>

  <!-- Left gold line accent -->
  <rect x="100" y="200" width="4" height="220" fill="#C5A342" opacity="0.7"/>

  <!-- Main title -->
  <text x="140" y="305"
    font-family="Arial, Helvetica, sans-serif"
    font-size="88" font-weight="700"
    letter-spacing="10"
    fill="#C5A342">MANDALA</text>

  <!-- Subtitle -->
  <text x="142" y="365"
    font-family="Arial, Helvetica, sans-serif"
    font-size="34" font-weight="300"
    letter-spacing="8"
    fill="#ffffff" opacity="0.88">NIERUCHOMOŚCI</text>

  <!-- Tagline -->
  <text x="142" y="430"
    font-family="Arial, Helvetica, sans-serif"
    font-size="21"
    fill="#8a9bb0">Zarządzanie nieruchomościami</text>

  <!-- Location -->
  <text x="142" y="468"
    font-family="Arial, Helvetica, sans-serif"
    font-size="19"
    fill="#5a6a7a">Poznań · Skórzewo · Wielkopolska</text>

  <!-- Domain -->
  <text x="142" y="${H - 22}"
    font-family="Arial, Helvetica, sans-serif"
    font-size="17"
    fill="#C5A342" opacity="0.6">mandalanieruchomosci.com</text>
</svg>`;

async function generate() {
  const logo = await sharp(LOGO)
    .resize(108, 108, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp(Buffer.from(svg))
    .composite([{ input: logo, top: 261, left: 906 }])
    .png()
    .toFile(OUTPUT);

  console.log('OG image created:', OUTPUT);
}

generate().catch(console.error);
