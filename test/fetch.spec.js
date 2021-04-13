/* eslint-disable no-undef */

const fetch = require('node-fetch');
const { linksStatus } = require('../src/index');
jest.mock('node-fetch');

describe('Comprobar links 200 - ok', () => {
  test('Validar status = 200', () => {
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

describe('Comprobar links 404 - fail', () => {
  test('Validar status = 404', () => {
    const arrayLinks = [
      {
        "href": 'https://jestjs.io/docs/getting-started1/',
        "text": 'jest',
        "pathName": 'test\\fileTest\\fileTest1\\test2.md'
      }
    ]
    const result = [
      {
        "href": "https://jestjs.io/docs/getting-started1/",
        "pathName": "test\\fileTest\\fileTest1\\test2.md",
        "text": "jest",
        "status": 404,
        "statusText": "fail"
      }
    ];
    fetch.mockImplementation(() => Promise.resolve({
      "status": 404,
      "statusText": "fail"
    }));
    return Promise.all(linksStatus(arrayLinks)).then((res) => {
      expect(res).toEqual(result)
    });
  });
});
