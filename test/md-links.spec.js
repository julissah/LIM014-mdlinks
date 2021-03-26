const mdLinks = require('../src/index');
const path = require('path');



describe('mdLinks', () => {
  const isAbsoluteTest = (test) => {
    return testUpdate = path.isAbsolute(test) ?path.normalize(test) :path.normalize(path.resolve(test));
  }
  test('Deberia validar la ruta', () => {
    const prueba = './src/pruebas/ejemplo1.md';
    const prueba2 = 'C:/Users/N14/Documents////GitHub/LIM014-mdlinks/src/pruebas/ejemplo1.md';
      expect(isAbsoluteTest(prueba)).toEqual(prueba2);
  });
});
