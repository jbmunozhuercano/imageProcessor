const { number } = require('yargs');
const yargs = require('yargs/yargs');

const choices = [
  'reducir calidad JPG',
  'reducir calidad PNG',
  'cambiar extensión a JPG',
  'convertir a webP',
  'reducir a tamaños para Fumisan',
];

function displayChoices() {
  console.log('Selecciona una opción, por su índice:');
  choices.forEach((choice, index) => {
    console.log(`${index}: ${choice}`);
  });
}

displayChoices();

const args = yargs(process.argv.slice(2))
  .option('option', {
    alias: 'o',
    type: 'number',
    describe: 'Selecciona una opción',
    choices: Array.from(
      {
        length: choices.length,
      },
      (_, i) => i
    ),
    demandOption: true,
  })
  .option('quality', {
    alias: 'q',
    type: 'number',
    describe: 'Selecciona calidad 0-100',
    demandOption: false,
  })
  .help()
  .alias('help', 'h').argv;

module.exports = args;
