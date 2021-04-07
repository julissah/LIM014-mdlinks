const {mdlinks,isFile} = require('./index')

// const test = '/src/pruebas/ejemplo1.txt'
// const test = 'C:/Users/N14/Documents/GitHub/LIM014-mdlinks/src/pruebas/ejemplo1.md'
// const test = './src/pruebas/ejemplo3.md'
// const test = './src/pruebas'
// const test = './src/pruebas2'
var myArgs = process.argv.slice(2);

if (myArgs.length === 1){
  if (isFile(myArgs[0])){
    mdlinks(myArgs[0], { validate: false })
    .then(data => console.table(data))
    .catch(err => console.error(err));
  } else {
    mdlinks(myArgs[0], { validate: false })
    .then(data => {
      data.forEach(element => {
        console.table(element)
      });
    })
    .catch(err => console.error(err));
  }
}
if (myArgs.length === 2){
    switch (myArgs[1]) {
        case '--validate':
              mdlinks(myArgs[0], { validate: true })
              .then(data => data)
            break;
        case '--stats':
          mdlinks(myArgs[0], { stats: false })
            .then(data => data)
            break;
        default:
            console.log('Lo siento, no es un comando válido.');
        }
}
if (myArgs.length === 3){
    if(myArgs[1] === '--stats' && myArgs[2] === '--validate' || myArgs[1] === '--validate' && myArgs[2] === '--stats'){
        mdlinks(myArgs[0], { stats: false})
        mdlinks(myArgs[0], { statsValidate: false})
    }
}


