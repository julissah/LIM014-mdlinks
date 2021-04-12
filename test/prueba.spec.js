/* eslint-disable no-undef */

const fetch = require('node-fetch');
const { linksStatus } = require('../src/index');
jest.mock('node-fetch');
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
    ];

    fetch.mockImplementation(() => Promise.resolve({
      "status": 200,
      "statusText": "Ok"
    }));

    return Promise.all(linksStatus(arrayLinks)).then((res) => {
      expect(res).toEqual(result)
  });

});

});
