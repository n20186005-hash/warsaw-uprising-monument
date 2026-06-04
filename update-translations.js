const fs = require('fs');

const langs = ['zh', 'en', 'pl', 'ru', 'de'];

for (const lang of langs) {
  const filePath = `src/messages/${lang}.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (lang === 'zh') {
      data.gallery.showAllPhotos = "显示全部照片";
      data.gallery.hidePhotos = "收起";
    } else if (lang === 'en') {
      data.gallery.showAllPhotos = "Show all photos";
      data.gallery.hidePhotos = "Show less";
    } else if (lang === 'pl') {
      data.gallery.showAllPhotos = "Pokaż wszystkie zdjęcia";
      data.gallery.hidePhotos = "Pokaż mniej";
    } else if (lang === 'ru') {
      data.gallery.showAllPhotos = "Показать все фото";
      data.gallery.hidePhotos = "Свернуть";
    } else if (lang === 'de') {
      data.gallery.showAllPhotos = "Alle Fotos anzeigen";
      data.gallery.hidePhotos = "Weniger anzeigen";
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  }
}
console.log('Updated translations.');
