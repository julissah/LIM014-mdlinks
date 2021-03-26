const mdlinks = require('./index')

const fetch = require('node-fetch');
// const test = '/src/pruebas/ejemplo1.txt'
// const test = 'C:/Users/N14/Documents/GitHub/LIM014-mdlinks/src/pruebas/ejemplo1.md'
// const test = './src/pruebas/ejemplo3.md'
// const test = './src/pruebas'
// const test = './src/pruebas2'

var myArgs = process.argv.slice(2);
console.log(myArgs)
if (myArgs.length === 1){
    mdlinks(myArgs[0], { validate: false })
    .then(data => data)
    .catch(err => console.error(err));
}
if (myArgs.length === 2){
    switch (myArgs[1]) {
        case "--validate":
            console.log(myArgs[1]);
            mdlinks(myArgs[0], { validate: true })
            // .then(data => console.log('Ingresaste validate'))
            .then(data => data)
            .catch(err => console.error(err));
            // .then(data => console.log('Ingresaste validate'))
            // .reject(err = console.log('error'))
            break;
        case '--stats':
            console.log(myArgs[1]);
            break;
        default:
            console.log('Lo siento, no es un comando valido.');
        }
}
if (myArgs.length === 3){
    if(myArgs[1] === '--stats' && myArgs[2] === '--validate' || myArgs[1] === '--validate' && myArgs[2] === '--stats'){
        console.log('Ingresaste ambas opciones')
    }
}

let link =[

  {
    href: 'https://nodejs.dev/learn/working-with-folders-in-nodejs',
    text: 'nodejs',
    file: 'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo1.md'
  },
  {
    href: 'https://www.npmjs.com/package/marked',
    text: 'marked',
    file: 'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo1.md'
  },
  {
    href: 'https://google.com4',
    text: 'google',
    file: 'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo1.md'
  }

  ]

const linksStatus = (arrayLinks) => {

  const validateLinkStatus = arrayLinks.map((element) =>
    fetch(element)
      .then((response) => {
        if((response.status >= 200) && (response.status <= 399)){
          const obj = {
            ...arrayLinks,
            href: element.href,
            text: (element.text.substring(0, 50)),
            path: element.file,
            status: response.status,
            statusText: 'OK'
          }
          return obj
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
      .catch((response) => {
        console.log('false' + response.status)
        return {
        href: element.href,
        text: (element.text),
        path: element.file,
        status:404,
        statusText: 'fail'
      }
      })
  );
      // console.log(validateLinkStatus)
  return Promise.all(validateLinkStatus)
    .then(response => {
    console.log('Array de resultados', response);
    })
    .catch(err => {
    console.error(err);
})

}


// const pruebasOk = () => {

//       const okiiiii= linksStatus(link)
//       console.log(okiiiii)


// }

// pruebasOk()
// .then(data => console.log(data))
// .catch(response => response)

// const linksStatus = (arrayLinks) => {
//   fetch(arrayLinks.href).then((res) => {
//     const mystatus = res.status;
//     const mymessage = res.statusText;
//     const newObj = {
//       ...arr,
//       status: mystatus,
//       message: mymessage,
//     };
//     return newObj;
//   })

// }
