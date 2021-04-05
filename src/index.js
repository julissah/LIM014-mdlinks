const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
const { resolve } = require('path');

//Función que verifica si existe la ruta
const existsRoute = (test) => (fs.existsSync(test));
const isFile = (test => fs.statSync(test).isFile());

const isDirectory = (test) => (fs.lstatSync(test).isDirectory());

const isMd = (test) => (path.extname(test));
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
    path.join(test, element)
    )
  return nameFileDirectories;
};


const searchRoutemd = (test) => {
  let arrayMdFilesDirec = [];
  const filePath = isAbsoluteTest(test);
  if (isFile(test)) {
    if (isMd(test) === '.md') {
      arrayMdFilesDirec.push(test);
    }
  } else {
    ArrayFileNameDirectories(test).forEach((element) => {
      const filesOfNewRoute = element;
      const getMDFilesInNewRoute = searchRoutemd(filesOfNewRoute);
      arrayMdFilesDirec = arrayMdFilesDirec.concat(getMDFilesInNewRoute);
    });
  }
  return arrayMdFilesDirec;
};

//Función de validacion de archivos (extension .md)
const validateIsFileMd = (test,value) => {
  let basename = path.basename(test)
  let dirname = path.dirname(test)
  let pathName = path.join('.',dirname,basename)
  let arrayMdFiles = [];
  let arrayLinksMd = '';
  if(path.extname(isAbsoluteTest(test)) === '.md'){
    if (fs.statSync(isAbsoluteTest(test)).size > 0) {
      arrayMdFiles.push(isAbsoluteTest(test));
      if(value === false){
        (extraerLinks(arrayMdFiles).length > 0)
        ? arrayLinksMd = extraerLinks(arrayMdFiles,pathName)
        : console.log('El archivo ' + pathName + ' no contiene links')
      } else if (value === true) {
        (extraerLinks(arrayMdFiles).length > 0)
        ? arrayLinksMd = linkValidate(extraerLinks(arrayMdFiles,pathName))
        : console.log('El archivo ' + pathName + ' no contiene links')
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
            pathName: element.pathName,
            status: response.status,
            statusText: 'Ok'
          }
        }
        else if((response.status < 200 )|| (response.status >=400)){
          return {
            href: element.href,
            text: (element.text.substr(0, 50)),
            pathName: element.pathName,
            status: res.status,
            statusText: 'fail'
          }
        }
      })
      .catch(() => {
        return {
        href: element.href,
        text: (element.text),
        pathName: element.pathName,
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
  let arrayfileDirectory = [];
  let resultado = []
  return new Promise((resolve, reject) => {
    let value = options.validate
    if (!existsRoute(test)) {
      reject("Ruta inválida")
    }
    if (isFile(test)) {
          resolve(resultado = validateIsFileMd(test,value))
    } else {
      if (searchRoutemd(test).length === 0) {
        reject('El directorio no contiene archivos');
      } else {
          const allRoute = searchRoutemd(test).map(data => {
          if (options.validate === true) {
            validateIsFileMd(data,value)
          } else {
            arrayfileDirectory = validateIsFileMd(data,value)
            return arrayfileDirectory
          }
        })
        resolve (allRoute)
      }
    }
  });
}
module.exports = {mdlinks,isAbsoluteTest}


