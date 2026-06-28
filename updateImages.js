import fs from 'fs';
import https from 'https';

const filePath = 'src/data/navalAssets.js';
let content = fs.readFileSync(filePath, 'utf-8');

const getImageUrl = (title) => {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1280`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId !== '-1' && pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
};

const shipQueries = {
  'ins-mormugao-d67': 'INS Mormugao',
  'ins-imphal-d68': 'INS Imphal',
  'ins-surat-d65': 'INS Surat',
  'ins-delhi-d61': 'INS Delhi (D61)',
  'ins-nilgiri-p17a': 'Nilgiri-class frigate (2019)', // INS Nilgiri
  'ins-dunagiri-p17a': 'INS Dunagiri (2022)',
  'ins-tarkash-f50': 'INS Tarkash (F50)',
  'ins-kavaratti-p31': 'INS Kavaratti (P31)',
  'ins-arnala-aswswc': 'Anti-Submarine Warfare Shallow Water Craft', // Arnala class
  'ins-arighat-s74': 'INS Arighat',
  'ins-vagsheer-s55': 'INS Vagsheer (S55)',
  'ins-shardul-l16': 'INS Shardul (L16)',
  'icgs-sagar-samudra': 'Samudra-class pollution control vessel',
  'icgs-vikram-opv': 'Vikram-class offshore patrol vessel',
  'icgs-sachet-opv': 'Samarth-class offshore patrol vessel', // Sachet is flight II
  'ins-samarthak-mpv': 'Indian Navy', // generic
  'aditya-mpv-marcos': 'Mahindra Marksman', // generic armored
  'ins-sanshodhak-j19': 'Sandhayak-class survey ship (2021)',
  'ins-deepak-a50': 'INS Deepak (A50)',
  'ins-rajput-d51-historic': 'INS Rajput (D51)',
  'ins-godavari-f20-historic': 'INS Godavari (F20)',
  'ins-chakra-s73-historic': 'INS Chakra (1987)'
};

async function update() {
  for (const [id, title] of Object.entries(shipQueries)) {
    const url = await getImageUrl(title);
    if (url) {
      console.log(`Found image for ${id}: ${url}`);
      // find the block for this id
      const idIndex = content.indexOf(`id: '${id}'`);
      if (idIndex !== -1) {
        const imageIndex = content.indexOf('image: null', idIndex);
        if (imageIndex !== -1 && imageIndex < idIndex + 1000) {
          content = content.substring(0, imageIndex) + `image: '${url}'` + content.substring(imageIndex + 11);
        }
      }
    } else {
      console.log(`No image for ${id} (${title})`);
    }
  }
  
  // For those that still have image: null, give them some generic placeholders based on class/category
  content = content.replace(/image: null/g, "image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Indian_Navy_ships_in_formation_during_TROPEX_2017.jpg/1280px-Indian_Navy_ships_in_formation_during_TROPEX_2017.jpg'");

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Done!');
}

update();
