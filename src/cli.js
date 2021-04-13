#!/usr/bin/env node
const { mdlinks } = require('./index')
const { stats, statsValidate } = require('./option')
const chalk = require('chalk');
let myArgs = process.argv.slice(2);

if (myArgs.length === 1){
  mdlinks(myArgs[0], { "validate": false })
    .then(data => console.table(data))
    .catch(err => console.error(err))
}

if (myArgs.length === 2){
    switch (myArgs[1]) {
        case '--validate':
            mdlinks(myArgs[0], { "validate": true })
            .then(data => console.table(data))
            break;
        case '--stats':
          mdlinks(myArgs[0], { "validate": true })
            .then(data => console.log(`Total: ${chalk.yellow(stats(data).total)} \nUnique: ${chalk.cyan(stats(data).unique)}`))
            break;
        case '--hepl':
          // eslint-disable-next-line no-case-declarations
          const hepl = `
          **********************************************************************************************************************************
          ${chalk.magenta('Puedes usar las siguientes opciones:')}\n
          ${chalk.cyan('--stats')} se utiliza para obtener el número total de links y los que no se repiten (links únicos).\n
          ${chalk.yellow('--validate')} se utiliza para validar cada link (si es OK o FAIL, dependiendo del estado) también obtener su href, texto y archivo.\n
          ${chalk.greenBright('--stats --validate')} Tambien puede ingresar ambas opciones y obtendra como resultado el total de links, únicos y rotos.

          En caso de que no use ninguna opción, ${chalk.blueBright('solo debe insertar la ruta')} y tendra como resultado href, el texto y el archivo de cada link.

          **********************************************************************************************************************************
          `;
          console.log(hepl);
          break;
        default:
          console.log(chalk.blackBright('Lo siento, no es un comando válido.'));
        }
}
if (myArgs.length === 3){
    if((myArgs[1] === '--stats' && myArgs[2] === '--validate') || (myArgs[1] === '--validate' && myArgs[2] === '--stats')){
      mdlinks(myArgs[0], { "validate": true })
        .then(data => console.log(`Total: ${chalk.yellow(stats(data).total)} \nUnique: ${chalk.cyan(stats(data).unique)} \nBroken: ${chalk.red(statsValidate(data))}`))
    } else {
      console.log(chalk.blackBright('Lo siento, no es un comando válido.'))
    }
}
