#!/usr/bin/env node
const { mdlinks, detail } = require('./index')
const { stats, statsValidate, statsValidateDet } = require('./option')
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
        case '--help':
          // eslint-disable-next-line no-case-declarations
          const help = `
          **********************************************************************************************************************************
          ${chalk.cyan.bold('Puede usar las siguientes opciones:')}
          ${chalk.yellow('--stats')} se utiliza para obtener el número total de links y los que no se repiten (links únicos).
          ${chalk.green('--validate')} se utiliza para validar cada link (si es OK o FAIL, dependiendo del estado) también obtener su href, texto y archivo.
          ${chalk.magentaBright('--stats --validate')} Tambien puede ingresar ambas opciones y obtendra como resultado el total de links, únicos y rotos.
          ${chalk.blueBright('--stats --validate --detail')} Tambien puede agregar el comando --detail y el resultado se mostrara de forma detallada.
          En caso de que no use ninguna opción, solo debe ingresar la${chalk.cyan(' ruta')} y tendra como resultado href, el texto y el archivo de cada link.
          **********************************************************************************************************************************`;
          console.log(help);
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
if(myArgs.length === 4){
  if((myArgs[1] === '--stats' && myArgs[2] === '--validate') || (myArgs[1] === '--validate' && myArgs[2] === '--stats')){
    switch(myArgs[3]){
    case '--detail':
      detail(myArgs[0], { "validate": true })
        .then(data => console.table(statsValidateDet(data)))
      // mdlinks(myArgs[0], { "validate": true })
      // .then(data => console.table(statsValidateDet(data)))

      break;
      default:
        console.log(chalk.blackBright('Lo siento, no es un comando válido.'));
    }
  }
}
