import fs from 'fs';
import path from 'path';

// Percorso della cartella immagini
const imagesDir = path.resolve(__dirname, '../public/images/ftsos'); // cambia se necessario

// Estensioni supportate
const validExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.bmp',
  '.tiff',
  '.svg',
]);

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('❌ Errore nella lettura della cartella:', err);
    return;
  }

  files.forEach((file) => {
    const ext = path.extname(file);
    const isImage = validExtensions.has(ext.toLowerCase());

    if (isImage) {
      const oldPath = path.join(imagesDir, file);
      const newFilename = file.toLowerCase();
      const newPath = path.join(imagesDir, newFilename);

      if (oldPath !== newPath) {
        fs.rename(oldPath, newPath, (renameErr) => {
          if (renameErr) {
            console.error(`❌ Errore nel rinominare "${file}":`, renameErr);
          } else {
            console.log(`✅ ${file} → ${newFilename}`);
          }
        });
      }
    }
  });
});
