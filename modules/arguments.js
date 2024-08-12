const yargs = require('yargs/yargs');

const args = yargs(process.argv.slice(2)).option('option', {
  alias: 'o',
  describe: 'Elige una opción',
  choices: [
    'reducir calidad JPG',
    'reducir calidad PNG',
    'cambiar extensión a JPG',
    'convertir a webP',
    'reducir a tamaños para Fumisan',
  ],
}).argv;

module.exports = args;
