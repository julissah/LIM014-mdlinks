const path = require('path');
const fs = require('fs');
const { el } = require('date-fns/locale');

// const test = 'temp\////\myfile.html'


const ArrayFileNameDirectories = (test) => {
  return fs.readdirSync(test).map(element =>//se crea una nueva matriz con los elementos encontrados
    path.join(path.normalize(path.resolve(test)), element)); //une los segmentos de ruta especificados en una ruta
};

const mdlinks = (test) =>{
  return new Promise((resolve, reject) => {
    let testUpdate = '';
    const isAbsoluteTest = (test) => {
      if(path.isAbsolute(test)){
        testUpdate = path.normalize(test);
        console.log('Ok! La ruta es absoluta' +  testUpdate)        
      } else {
        testUpdate = path.normalize(path.resolve(test));
        console.log('no es absoluta' + testUpdate)
      }
      return testUpdate;
    }
    
    isAbsoluteTest(test)
    let arrayMdFiles = [];
    if(fs.statSync(testUpdate).isFile()){
      if(path.extname(testUpdate)=== '.md'){
        arrayMdFiles.push(testUpdate)
        resolve('Ok! ext .md')
      } else {
        reject(new Error('Error - no es ext .md'));
      }
    } else {
      ArrayFileNameDirectories(test).forEach((element) => {// recorrido por cada elemento de directorio
        const filesOfNewRoute = element;
        const getMDFilesInNewRoute = mdlinks(filesOfNewRoute);// recursion searchRoutemd se llama a si mismo
        arrayMdFiles = arrayMdFiles.concat(getMDFilesInNewRoute); 
      });
      resolve(arrayMdFiles)
      // reject(new Error('Error - no es un file'));
    }
    console.log('archivos md: ' + arrayMdFiles + 'fin')


  })
}


// const name = path.basename(test);
// console.log(name)


// const validateAbsolute = (test) =>{

//     path.isAbsolute(test) ? (
//       testUpdate = path.normalize(test),
//       console.log('Ok! La ruta es absoluta' + testUpdate)
//   ) : (
//       testUpdate = path.normalize(path.resolve(test)),
//       console.log('la ruta fue convertida en absoluta' + testUpdate )
//   );
// }


// try {
//   const stats = fs.statSync('./src/pruebas').isDirectory();
//   const content = fs.readFile('./src/pruebas/ejemplo1.txt' ,'utf8', function(error, datos){
//     // console.log(content);
//     // console.log(datos);
//   })
//   console.log(stats)
// } catch (err) {
//   console.error(err)
// }


// validateAbsolute(test)

module.exports = mdlinks