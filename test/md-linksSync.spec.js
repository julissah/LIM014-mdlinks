/* eslint-disable no-undef */
const { mdlinks } = require('../src/index')

describe('Probando función md-links | file / directorio', () => {
    test('Validar si retorna los resultados (href, text, pathName) al ingresar ruta de un file', done => {
        const arraLinks = [
          {
            "href": 'https://github.com/',
            "text": 'github',
            "pathName": 'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\test\\fileTest\\test1.md'
          }
        ]
        mdlinks(`${__dirname}/fileTest/test1.md`, { "validate": false })
        .then(data => {
            expect(data).toEqual(arraLinks);
            done();
        });
    });

    test('Validar si retorna los resultados (href, text, pathName) al ingresar ruta de un directorio', done => {
      const arraLinks = [
        {
          "href": "https://jestjs.io/docs/getting-started1",
          "pathName": "C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\test\\fileTest\\fileTest1\\test2.md",
          "text": "jest"
        },
        {
          "href": "https://github.com/",
          "pathName": "C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\test\\fileTest\\test1.md",
          "text": "github"
        }
      ]
      mdlinks(`${__dirname}/fileTest/`, { "validate": false })
      .then(data => {
          expect(data).toEqual(arraLinks);
          done();
      });
  });
});

describe('Probando función md-links opción: --validate | file / directorio', () => {
  test('Validar si retorna el status de los liks al ingresar la ruta de un file', done => {
    const arraLinks = [
      {
        "href": 'https://github.com/',
        "text": 'github',
        "pathName": 'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\test\\fileTest\\test1.md',
        "status": 200,
        "statusText": 'Ok'
      }
    ]
    mdlinks(`${__dirname}/fileTest/test1.md`, { "validate": true })
    .then(data => {
        expect(data).toEqual(arraLinks);
        done();
    });
  });

  test('Validar si retorna el status de los liks al ingresar la ruta de un directorio', done => {
    const arraLinks = [
      {
        "href": "https://jestjs.io/docs/getting-started1",
        "pathName": "C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\test\\fileTest\\fileTest1\\test2.md",
        "text": "jest",
        "status": 404,
        "statusText": 'fail'
      },
      {
        "href": 'https://github.com/',
        "text": 'github',
        "pathName": 'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\test\\fileTest\\test1.md',
        "status": 200,
        "statusText": 'Ok'
      }
    ]
    mdlinks(`${__dirname}/fileTest/`, { "validate": true })
    .then(data => {
        expect(data).toEqual(arraLinks);
        done();
    });
  });
});

