const {isFile, isAbsoluteTest} = require('../src/index');
const path = require('path');

describe("Validación si la ruta existe", () => {
  test('Validación si la ruta existe', () => {

  })
})



describe('Validación de ruta absoluta', () => {
  test('Si la ruta es absoluta, pero contiene especificadores relativos como // barras dobles o .. puntos, calculara la ruta real ', () => {
      const test = 'C:/Users/N14/Documents//////GitHub/LIM014-mdlinks/src///////pruebas/ejemplo1.md';
      const test2 = 'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo1.md';
      expect(isAbsoluteTest(test)).toEqual(test2);
  });

  // test('Si la ruta es relativa la convierte en absoluta ', () => {
  //     const test = './src/pruebas/ejemplo1.md';
  //     const test2 = 'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo1.md';
  //     expect(isAbsoluteTest(test)).toEqual(test2);
  // });
});
