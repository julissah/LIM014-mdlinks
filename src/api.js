const fs = require('fs');
const path = require('path')
const mdlinks = require('./index')
// const test = '/src/pruebas/ejemplo1.txt'
// const test = 'C:/Users/N14/Documents/GitHub/LIM014-mdlinks/src/pruebas/ejemplo1.md'
// const test = './src/pruebas/ejemplo1.md'
const test = './src/pruebas'

mdlinks(test)
    .then(response => console.log(response))
    // .then(test => {
    //     const isFile = fs.statSync(test).isFile();
    //     console.log(isFile)
    //     // return mdlinks(test)
    // })
    // .then(test => {
    //     (isFile === 'true' )? console.log( test + ' es un file') :  console.log(test + ' no es un file')
    // })
    .catch(err => console.error(err));








// const dir = fs.readdirSync(test)
// console.log('dir ' + dir)

// const dir2 = fs.readdirSync(test).map(fileName => {
//     return path.join(path.normalize(path.resolve(test)), fileName)
//   })

// console.log( dir2)




