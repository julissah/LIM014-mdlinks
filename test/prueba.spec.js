/* eslint-disable no-undef */
jest.mock('node-fetch');
const fetch = require('node-fetch');
const linkValidate = require('../src/index');

describe('Comprobar validación de links', () => {
  test('Validar el status = 200', () => {
    const arrayLinks = [
      {
        "href": 'https://github.com/',
        "text": 'github',
        "pathName": 'test\\fileTest\\test1.md'
      }
    ]
    const result = [
      {
        "href": "https://github.com/",
        "pathName": "test\\fileTest\\test1.md",
        "text": "github",
        "status": 200,
        "statusText": "Ok"
      }
    ]

  });
});
