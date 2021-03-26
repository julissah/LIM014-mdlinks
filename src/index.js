const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');

//Función que verifica si existe la ruta
const existsRoute = (test) => (fs.existsSync(test));

//Función que lee un archivo
const readFilePath = (test) => fs.readFileSync(test).toString();

// Función de validación de ruta absoluta o relativa
const isAbsoluteTest = (test) => {
  return testUpdate = path.isAbsolute(test) ?path.normalize(test) :path.normalize(path.resolve(test));
}

// Función que recorre los archivos que contiene un directorio
const ArrayFileNameDirectories = (test) => {
  const nameFileDirectories = fs.readdirSync(test).map(element =>
    path.join(isAbsoluteTest(test), element));
  return nameFileDirectories;
};

//Función de validacion de archivos (extension .md)
const validateIsFileMd = (test,value) => {
  return new Promise((resolve, reject) => {
  let arrayMdFiles = [];
  if(path.extname(isAbsoluteTest(test)) === '.md'){
    if (fs.statSync(isAbsoluteTest(test)).size > 0) {
      arrayMdFiles.push(isAbsoluteTest(test));
      if(value === false){
        // (extraerLinks(arrayMdFiles).length > 0)
        resolve (extraerLinks(arrayMdFiles))
        // reject('El archivo no contiene links');
      } else if (value === true) {
        resolve (linkValidate(extraerLinks(arrayMdFiles)))
        // reject('El archivo no contiene links');
      }
    } else {
      reject('El archivo esta vacio');
    }
  } else {
    reject ('no es ext .md');
  }
});
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
  console.log('Ingresaste a link linkValidateStatus')
  let arrayLinks2 = []
  let arrayLinkProperties = [];
  arrayLinks.map(item => {
    arrayLinkProperties.push(item)
  })
  // const resultStatus = linksStatus(arrayLinkProperties)
  arrayLinks2.push(linksStatus(arrayLinkProperties))
  return arrayLinks2
}

const linksStatus = (arrayLinks) => {
  console.log('Ingresaste a link status')
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
      console.log(validateLinkStatus)
    return Promise.all(validateLinkStatus)
    .then(response => {
    console.table(response);
    // (response);
    })
    .then(response => response)
    .catch(err => {
    console.error('el error es:' + err);
})
}

//Funcion principal mdlinks
const mdlinks = (test, options={} ) =>{
  return new Promise((resolve, reject) => {
    let value = options.validate
    if (!existsRoute(test)) {
      reject("Ruta inválida")
    }
    if (fs.statSync(isAbsoluteTest(test)).isFile()) {
          const testAbsolute = isAbsoluteTest(test);
          if (options.validate === true){
            console.log(value)
            resolve(console.log('elegiste option validate'))
            validateIsFileMd(testAbsolute,value)
            .then(data => console.table(data))
            .catch(err => console.error(err));
          }
          else {
            console.log(value)
            validateIsFileMd(testAbsolute,value)
            .then(data => console.table(data))
            .catch(err => console.error(err));
          }
    } else {
      if (ArrayFileNameDirectories(test).length === 0) {
        reject('El directorio no contiene archivos');
      } else {
        resolve (ArrayFileNameDirectories(test).map(data => {
          if (path.extname(data) === '.md') {
            validateIsFileMd(data,value)
            .then(data => console.table(data))
            .catch(err => console.error(err))
          }
        }));
      }
    }
  });
}

module.exports = mdlinks;
