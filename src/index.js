const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');

//Función que verifica si existe la ruta
const existsRoute = (test) => (fs.existsSync(test));

const isDirectory = (test) => (fs.lstatSync(test).isDirectory());

//Función que lee un archivo
const readFilePath = (test) => fs.readFileSync(test).toString();

// Función de validación de ruta absoluta o relativa
const isAbsoluteTest = (test) => {
  const testUpdate = path.isAbsolute(test) ?path.normalize(test) :path.normalize(path.resolve(test));
  return testUpdate;
}

// Función que recorre los archivos que contiene un directorio
const ArrayFileNameDirectories = (test) => {

  const nameFileDirectories = fs.readdirSync(test).map(element =>
    path.join(isAbsoluteTest(test), element));

    // console.log(nameFileDirectories.flat())
    // console.log(nameFileDirectories)

  return nameFileDirectories;
};

//Función de validacion de archivos (extension .md)
const validateIsFileMd = (test,value) => {
  let basename = path.basename(test)
  let arrayMdFiles = [];
  let arrayLinksMd = '';
  if(path.extname(isAbsoluteTest(test)) === '.md'){
    if (fs.statSync(isAbsoluteTest(test)).size > 0) {
      arrayMdFiles.push(isAbsoluteTest(test));
      if(value === false){
        (extraerLinks(arrayMdFiles).length > 0)
        ? arrayLinksMd = extraerLinks(arrayMdFiles)
        : console.log('El archivo ' + basename + ' no contiene links')
      } else if (value === true) {
        (extraerLinks(arrayMdFiles).length > 0)
        ? arrayLinksMd = linkValidate(extraerLinks(arrayMdFiles))
        : console.log('El archivo ' + basename + ' no contiene links')
      }
    } else {
      reject('El archivo esta vacio');
    }
  } else {
    reject ('no es ext .md');
  }
  return arrayLinksMd
}

// Funcion de extraer links
const extraerLinks = (arrayMdFiles) => {
    let arrayLinks = [];
    const renderer = new marked.Renderer();
    arrayMdFiles.forEach( file => {
      renderer.link = (href, title, text) => { // renderer define salida ouput con tres propiedades
        const linkProperties = {
          href,
          text,
          file
        };
        arrayLinks.push(linkProperties);
      };
      marked(readFilePath(file), { renderer });
    });
    return arrayLinks;
};

const linkValidate = (arrayLinks) => {
  let arrayLinks2 = []
  let arrayLinkProperties = [];
  arrayLinks.map(item => {
    arrayLinkProperties.push(item)
  })
  arrayLinks2.push(linksStatus(arrayLinkProperties))
  return arrayLinks2
}

const linksStatus = (arrayLinks) => {
  const validateLinkStatus = arrayLinks.map((element) =>
    fetch(element)
      .then((response) => {
        if((response.status >= 200) && (response.status <= 399)){
         return {
            href: element.href,
            text: (element.text.substr(0, 50)),
            path: element.file,
            status: response.status,
            statusText: 'Ok'
          }
        }
        else if((response.status < 200 )|| (response.status >=400)){
          return {
            href: element.href,
            text: (element.text.substr(0, 50)),
            path: element.file,
            status: res.status,
            statusText: 'fail'
          }
        }
      })
      .catch(() => {
        return {
        href: element.href,
        text: (element.text),
        path: element.file,
        status: 404,
        statusText: 'fail'
        }
      })
  );

    Promise.all(validateLinkStatus)
    // .then(response => console.table(response))
    .then(response => console.table(response))
    // .then(response => response)
    .catch(err => console.error('el error es:' + err))

}

const unique = (statusTable) => {
  // const st = statusTable.map(data => data)
  // console.log(st)
  for (let i = 0; i < 5; i++) {
    const element = statusTable[i];
    console.log(element)

  }
  // console.log(statusTable[1].status)
}

//Funcion principal mdlinks
const mdlinks = (test, options={} ) => {
  let arrayfileDirectory = '';
  let resultado = []
  return new Promise((resolve, reject) => {
    let value = options.validate
    if (!existsRoute(test)) {
      reject("Ruta inválida")
    }
    if (fs.statSync(isAbsoluteTest(test)).isFile()) {
          const testAbsolute = isAbsoluteTest(test);
          resolve(resultado = validateIsFileMd(testAbsolute,value))
    } else {
      let arrayFileNmeMd = []
      let arrayFileDirecNmeMd = []
      let allfile = []
      const arrayFileMd = ArrayFileNameDirectories(test).map( item => {
        if (path.extname(item) === '.md') {
          arrayFileNmeMd.push(item)

        } else if (isDirectory(item) === true){
          mdlinks(item, value )
          arrayFileDirecNmeMd.push(item)
        }


        return arrayFileNmeMd.concat(arrayFileDirecNmeMd)
      })

      console.log('1' + arrayFileMd)
      // console.log('2' +arrayFileDirecNmeMd)
      // console.log('3' + arrayFileNmeMd.concat(arrayFileDirecNmeMd))
       allFiles = arrayFileMd.flat()

      // console.log(allFiles)
      if (arrayFileNmeMd.length === 0) {
        reject('El directorio no contiene archivos');
      } else {
        console.log(arrayFileNmeMd)
        resolve (arrayFileNmeMd.map(data => {

          if (path.extname(data) === '.md') {
            if (options.validate === true) {
              validateIsFileMd(data,value)
            } else {
              arrayfileDirectory = validateIsFileMd(data,value)
              return arrayfileDirectory
            }
          } else if (isDirectory(data) === true){
            // mdlinks(item, value )
            // arrayFileDirecNmeMd.push(item)
            // console.log(data)
          }
        }));
      }
    }
  });
}
module.exports = {mdlinks,isAbsoluteTest}


