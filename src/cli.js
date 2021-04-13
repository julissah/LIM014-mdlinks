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
