
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

async function downloadImage(url, filepath) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
            // Try to read body to see error
            const text = await response.text();
            console.error('Body:', text.substring(0, 200));
            return;
        }

        const fileStream = fs.createWriteStream(filepath);
        await pipeline(Readable.fromWeb(response.body), fileStream);
        console.log(`Successfully downloaded ${filepath}`);
    } catch (error) {
        console.error(`Error downloading ${url}:`, error);
    }
}

const images = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Jeff_Bezos_2016.jpg', path: 'public/images/jeff-bezos.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Peter_Thiel.jpg', path: 'public/images/peter-thiel.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Sam_Altman_CropEdit_James_Tamim.jpg', path: 'public/images/sam-altman.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ken_Howery_State_Headshot_%28crop%29.jpg/896px-Ken_Howery_State_Headshot_%28crop%29.jpg', path: 'public/images/ken-howery.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/M%C3%BAt%C3%A9_Bourup_Egede_May_2021.jpg', path: 'public/images/mute-bourup-egede.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Inuit_Ataqatigiit_logo2020_png-600x600.png', path: 'public/images/inuit-ataqatigiit.png' }
];

async function main() {
    for (const img of images) {
        await downloadImage(img.url, img.path);
    }
}

main();
