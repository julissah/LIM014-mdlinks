/* eslint-disable consistent-return */
/* eslint-disable max-statements */
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');

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
      console.log(readFilePath(file))
      marked(readFilePath(file), { renderer });
    });
    return arrayLinks;
};

const linkValidate = (arrayLinks) => {
  let arrayLinkProperties = [];
  arrayLinks.map(item => {
    arrayLinkProperties.push(item)
  })
  return(
  linksStatus(arrayLinkProperties)
  .then(data => console.table(data))
  .catch(err => console.error(`Error: ${err}`))
  )
}

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
   return Promise.all(validateLinkStatus)
}

const totalUnique = (stat) => {
  const totalUnique = stat.length
  const PathName = path.basename(stat[0].pathName)
  const arrayHref = stat.map(data => data.href)
  const uniqueHref = (new Set(arrayHref)).size
  const objTotalUnique = {
    "file": PathName,
    "total": totalUnique,
    "unique": uniqueHref
  }
  return objTotalUnique
}

const totalBroken = (objUnique, stat) => {
  let arrayStatus = []
  linksStatus(stat)
  .then(data => {
    for (let value = 0; value < data.length; value+=1) {
      const element = data[value].status;
      arrayStatus.push(element)
    }
    const statusBroken = (arrayStatus.filter(data => data >= 404)).length
    const brokenLinks = statusBroken
    const objTotalBroken = {
      ...objUnique,
      "broken": brokenLinks
    }
    return console.log(`Broken: ${objTotalBroken.broken}`)
  })
  .catch(err => console.error(err))
}

const totalBrokenDirectory = (objUnique, stat) => {
  let arrayStatus = []
  let objTotalBroken = {}
  let arrayBrok = []
    linksStatus(stat)
    .then(data => {
      for (let value = 0; value < data.length; value+=1) {
        const element = data[value].status;
        arrayStatus.push(element)
      }
      const statusBroken = (arrayStatus.filter(data => data >= 404)).length
      const brokenLinks = statusBroken
      objTotalBroken = {
        ...objUnique,
        "broken": brokenLinks
      }
      arrayBrok.push(objTotalBroken)
      return(console.table(arrayBrok))
    })
    .catch(err => console.error(err))
}

//Funcion principal mdlinks
const mdlinks = (test, options={} ) => {
  let arrayfileDirectory = [];
  return new Promise((resolve, reject) => {
    let value = options.validate
    let valueStats = options.stats
    let valuestatsValidate = options.statsValidate
    if (!existsRoute(test)) {
      reject("Ruta inválida")
    }
    if (isFile(test)) {
      resolve(validateIsFileMd(test, value))
      if(valueStats === false) {
        const objResultStats = totalUnique(validateIsFileMd(test, valueStats))
        resolve(console.log(`Total: ${objResultStats.total} \nUnique: ${objResultStats.unique}`))
      } else if (valuestatsValidate === false) {
        const objResultStats = totalUnique(validateIsFileMd(test, valuestatsValidate))
        const statsVal = totalBroken(objResultStats, validateIsFileMd(test, valuestatsValidate))
        resolve(statsVal)
      }
    } else {
      if (searchRoutemd(test).length === 0) {
        reject('El directorio no contiene archivos');
      } else {
          const allRoute = searchRoutemd(test).map(data => {
          if (value === true) {
            return validateIsFileMd(data, value)
          } else if (valueStats === false) {
             return totalUnique(validateIsFileMd(data, valueStats))
          } else if (valuestatsValidate === false) {
            const objUnique = totalUnique(validateIsFileMd(data, valuestatsValidate))
            const objBroken = totalBrokenDirectory(objUnique, validateIsFileMd(data, valuestatsValidate))
            return objBroken
          }
            arrayfileDirectory = validateIsFileMd(data, value)
            return arrayfileDirectory
        })
        resolve (allRoute)
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
  mdlinks
}
