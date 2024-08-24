const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const args = require('./modules/arguments');
const dir = './processed';
const ratio = 16 / 9;

const directoryPath = path.join(__dirname, './images');

const imgQuality = args.quality;

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  files.forEach((file) => {
    switch (args.option) {
      case 0:
        reduceQualityJpg(file, imgQuality);
        break;
      case 1:
        reduceQualityPNG(file, imgQuality);
        break;
      case 2:
        changeExtentionJpg(file, imgQuality);
        break;
      case 3:
        convertToWebp(file, imgQuality);
        break;
      case 4:
        reduceSizeFumisan(file, imgQuality);
        break;
      default:
        break;
    }
  });
});

async function reduceQualityJpg(file, imgQuality = 70) {
  const name = file.split('.')[0];
  const fileRoute = directoryPath + '/' + file;

  try {
    await sharp(fileRoute)
      .toFormat('jpeg', { quality: imgQuality })
      .toFile(`processed/${name}.jpg`);
  } catch (error) {
    console.log(error);
  }
}

async function reduceSizeFumisan(file, imgQuality = 90) {
  const name = file.split('.')[0];
  const fileRoute = directoryPath + '/' + file;

  try {
    await sharp(fileRoute)
      .resize({
        width: 350,
        height: 350,
        fit: sharp.fit.inside,
      })
      .toFormat('jpeg', { quality: imgQuality })
      .toFile(`processed/${name}.jpg`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 98,
        height: 98,
        fit: sharp.fit.inside,
      })
      .toFormat('jpeg', { quality: imgQuality })
      .toFile(`processed/${name}_tumb.jpg`);
  } catch (error) {
    console.log(error);
  }
}

async function convertToWebp(file, imgQuality = 80) {
  const name = file.split('.')[0];
  const fileRoute = directoryPath + '/' + file;
  console.log(file);
  try {
    await sharp(fileRoute)
      .webp({ quality: imgQuality, smartSubsample: true })
      .toFile(`processed/${name}.webp`);
  } catch (error) {
    console.log(error);
  }
}

async function reduceQualityPNG(file, imgQuality = 80) {
  const name = file.split('.')[0];
  const fileRoute = directoryPath + '/' + file;

  try {
    await sharp(fileRoute)
      .toFormat('png', { quality: imgQuality })
      .toFile(`processed/${name}.png`);
  } catch (error) {
    console.log(error);
  }
}

async function changeExtentionJpg(file, imgQuality = 80) {
  const name = file.split('.')[0];
  const fileRoute = directoryPath + '/' + file;

  try {
    await sharp(fileRoute)
      .toFormat('jpeg', { quality: imgQuality })
      .toFile(`processed/${name}.jpg`);
  } catch (error) {
    console.log(error);
  }
}

async function cropImage(file) {
  const name = file.split('.')[0];
  const fileRoute = directoryPath + '/' + file;

  try {
    await sharp(fileRoute)
      .resize({
        width: 1980,
        height: Math.round(1920 / ratio),
        fit: sharp.fit.inside,
      })
      .png({ quality: 90 })
      .toFile(`processed/${name}_lg.jpg`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 1980,
        height: Math.round(1920 / ratio),
        fit: sharp.fit.inside,
      })
      .webp({ quality: 95, smartSubsample: true })
      .toFile(`processed/${name}_lg.webp`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 1024,
        height: Math.round(1024 / ratio),
        fit: sharp.fit.inside,
      })
      .toFormat('jpeg', { quality: 90 })
      .toFile(`processed/${name}_md.jpg`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 1024,
        height: Math.round(1024 / ratio),
        fit: sharp.fit.inside,
      })
      .webp({ quality: 95, smartSubsample: true })
      .toFile(`processed/${name}_md.webp`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 768,
        height: Math.round(768 / ratio),
        fit: sharp.fit.inside,
      })
      .toFormat('jpeg', { quality: 90 })
      .toFile(`processed/${name}_sm.jpg`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 768,
        height: Math.round(768 / ratio),
        fit: sharp.fit.inside,
      })
      .webp({ quality: 95, smartSubsample: true })
      .toFile(`processed/${name}_sm.webp`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 380,
        height: Math.round(380 / ratio),
        fit: sharp.fit.inside,
      })
      .toFormat('jpeg', { quality: 90 })
      .toFile(`processed/${name}_xs.jpg`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 380,
        height: Math.round(380 / ratio),
        fit: sharp.fit.inside,
      })
      .webp({ quality: 95, smartSubsample: true })
      .toFile(`processed/${name}_xs.webp`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 380,
        height: Math.round(380 * ratio),
        fit: sharp.fit.inside,
      })
      .toFormat('jpeg', { quality: 100 })
      .toFile(`processed/${name}_xs_vert.jpg`);
  } catch (error) {
    console.log(error);
  }

  try {
    await sharp(fileRoute)
      .resize({
        width: 380,
        height: Math.round(380 * ratio),
        fit: sharp.fit.inside,
      })
      .webp({ quality: 100, smartSubsample: true })
      .toFile(`processed/${name}_xs_vert.webp`);
  } catch (error) {
    console.log(error);
  }
}
