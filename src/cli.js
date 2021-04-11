const { mdlinks, isFile } = require('./index')
const { stats, statsValidate } = require('./option')
let myArgs = process.argv.slice(2);

if (myArgs.length === 1){
  mdlinks(myArgs[0], { "validate": false })
    .then(data => console.table(data.flat()))
}
if (myArgs.length === 2){
    switch (myArgs[1]) {
        case '--validate':
            mdlinks(myArgs[0], { "validate": true })
            .then(data => console.table(data.flat()))
            break;
        case '--stats':
          mdlinks(myArgs[0], { "validate": true })
            .then(data => console.log(`Total: ${stats(data.flat()).total} \nUnique: ${stats(data.flat()).unique}`))
            break;
        default:
            console.log('Lo siento, no es un comando válido.');
        }
}
if (myArgs.length === 3){
    if((myArgs[1] === '--stats' && myArgs[2] === '--validate') || (myArgs[1] === '--validate' && myArgs[2] === '--stats')){

      mdlinks(myArgs[0], { "validate": true })
        .then(data => console.log(`Total: ${stats(data.flat()).total} \nUnique: ${stats(data.flat()).unique} \nBroken: ${statsValidate(data.flat())}`))
    } else {
      console.log('Lo siento, no es un comando válido.')
    }
}
