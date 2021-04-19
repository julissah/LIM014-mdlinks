const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
const { resolve } = require('path');

//Función que verifica si existe la ruta
const existsRoute = (test) => (fs.existsSync(test));

//Función que verifica si es un file/archivo
const isFile = (test => fs.statSync(test).isFile());

const isDirectory = (test) => (fs.lstatSync(test).isDirectory());

//Función que verifica si es un file/archivo con extensión .md
const isMd = (test) => (path.extname(test));

//Función que lee un archivo
const readFilePath = (test) => fs.readFileSync(test).toString();

// Función de validación de ruta absoluta o relativa
const isAbsoluteTest = (test) => {
  const testUpdate = path.isAbsolute(test) ?path.normalize(test) :path.normalize(path.resolve(test));
  return testUpdate;
}

// Función que lee los archivos que contiene un directorio
const ArrayFileNameDirectories = (test) => {
  const nameFileDirectories = fs.readdirSync(test).map(element =>
    path.join(test, element))
  return nameFileDirectories;
};

// Función que recorre los archivos .md y si es un directorio realiza recursividad
const searchRoutemd = (test) => {
  let arrayMdFilesDirec = [];
  if (isFile(test)) {
    if (isMd(test) === '.md') {
      arrayMdFilesDirec.push(test);
    }
  } else if (isDirectory(test)){
    ArrayFileNameDirectories(test).forEach((element) => {
      const getMDFilesInNewRoute = searchRoutemd(element);
      arrayMdFilesDirec = arrayMdFilesDirec.concat(getMDFilesInNewRoute);
    });
  }
  return arrayMdFilesDirec;
};

// Funcion que obtiene el nombre del path
const namePath = (test) => {
  let basename = path.basename(test);
  let dirname = path.dirname(test);
  let pathName = path.join('.', dirname, basename);
  return pathName
}
//Función de validacion de archivos (extension .md)
// eslint-disable-next-line max-statements
const validateIsFileMd = (test, value) => {
  let pathName = namePath(test)
  let arrayMdFiles = [];
  let arrayLinksMd = '';
  if(isMd(isAbsoluteTest(test)) === '.md'){
    if (fs.statSync(isAbsoluteTest(test)).size > 0) {
      arrayMdFiles.push(isAbsoluteTest(test));
      if(value === false){
        (extraerLinks(arrayMdFiles).length > 0)
        ? arrayLinksMd = extraerLinks(arrayMdFiles, pathName)
        : console.log(`El archivo ${pathName} no contiene links`)
      } else if (value === true) {
        (extraerLinks(arrayMdFiles).length > 0)
        ? arrayLinksMd = linkValidate(extraerLinks(arrayMdFiles, pathName))
        : console.log(`El archivo ${pathName} no contiene links`)
      }
    } else {
      console.log('El archivo esta vacio');
    }
  } else {
    console.log('no es ext .md');
  }
  return arrayLinksMd
}

// Funcion de extraer links
const extraerLinks = (arrayMdFiles, pathName) => {
    let arrayLinks = [];
    const renderer = new marked.Renderer();
    arrayMdFiles.forEach( file => {
      renderer.link = (href, title, text) => { // renderer define salida ouput con tres propiedades
        const linkProperties = {
          href,
          text,
          pathName
        };
        arrayLinks.push(linkProperties);
      };
      marked(readFilePath(file), { renderer });
    });
    return arrayLinks;
};

// Función Validación de links
const linkValidate = (arrayLinks) => {
  let arrayLinkProperties = [];
  arrayLinks.map(item => {
    arrayLinkProperties.push(item)
  })
  return(
  linksStatus(arrayLinkProperties)
  )
}

// Función Validación de status de links
const linksStatus = (arrayLinks) => {
  const validateLinkStatus = arrayLinks.map((element) =>
    fetch(element)
      .then(response => {
        if((response.status >= 200) && (response.status <= 399)){
          return {
            "href": element.href,
            "text": (element.text.substr(0, 50)),
            "pathName": element.pathName,
            "status": response.status,
            "statusText": 'Ok'
          }
        } else if ((response.status < 200 )|| (response.status >=400)){
          return {
            "href": element.href,
            "text": (element.text.substr(0, 50)),
            "pathName": element.pathName,
            "status": response.status,
            "statusText": 'fail'
          }
        }
      })
      .catch(() => {
        return {
        "href": element.href,
        "text": (element.text),
        "pathName": element.pathName,
        "status": 404,
        "statusText": 'fail'
        }
      }));
   return validateLinkStatus;
}

const detail = (test, options={}) => {
  return new Promise((resolve, reject) => {
    let value = options.validate
    const allRoute = searchRoutemd(test).map(data => Promise.all(validateIsFileMd(data, value)))
    Promise.all(allRoute).then(resp => resolve(resp))
  })
}

//Funcion principal mdlinks
const mdlinks = (test, options={} ) => {
  return new Promise((resolve, reject) => {
    let value = options.validate
    if (!existsRoute(test)) {
      reject("Ruta inválida")
    }
    if (isFile(test)) {
      Promise.all(validateIsFileMd(test, value))
      .then(resp => resolve(resp))
    } else {
      if (searchRoutemd(test).length === 0) {
        reject('El directorio no contiene archivos');
      } else {
          const allRoute = searchRoutemd(test).map(data => validateIsFileMd(data, value))
          const allRouteFlat = allRoute.flat()
          Promise.all(allRouteFlat)
            .then(resp => resolve(resp))
      }
    }
  });
}

module.exports = {
  existsRoute,
  isFile,
  isDirectory,
  isMd,
  readFilePath,
  isAbsoluteTest,
  ArrayFileNameDirectories,
  searchRoutemd,
  namePath,
  validateIsFileMd,
  linkValidate,
  linksStatus,
  mdlinks,
  detail
}
