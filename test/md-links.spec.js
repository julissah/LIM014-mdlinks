/* eslint-disable no-undef */
const { isAbsoluteTest, existsRoute, isFile, isDirectory, isMd, readFilePath, ArrayFileNameDirectories } = require('../src/index');
const file = './src/pruebas/ejemplo1.md';
const path = './src/pruebas/ejemplo6/ejemplo6-1.md'
const directory = 'C:/Users/N14/Documents/GitHub/LIM014-mdlinks/src/pruebas/ejemplo6';

const absolut = 'C:/Users/N14/Documents//////GitHub/LIM014-mdlinks/src///////pruebas/ejemplo1.md';
const absolutWin = 'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo1.md';
const readFile = `[google](https://google.com)`
const arrayDirectory = [
  'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo6\\ejemplo6-1.md',
  'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo6\\ejemplo6-2.txt',
  'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo6\\ejemplo6-3.txt',
  'C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\src\\pruebas\\ejemplo6\\ejemplo6-4'
]

describe('Comprobar si la ruta existe', () => {
  test('Validar si es una función', () => {
    expect(typeof existsRoute).toBe('function');
  });

  test('Validar si la ruta existe', () => {
    expect(existsRoute(file)).toEqual(true);
  });

  test('Si la ruta es absoluta, pero contiene especificadores relativos como // barras dobles o .. puntos, calculara la ruta real ', () => {
      expect(isAbsoluteTest(absolut)).toEqual(absolutWin);
  });
});

describe('Comprobar si es un file', () => {
  test('Validar si es una función', () => {
    expect(typeof isFile).toBe('function');
  });
  test('Validar si la ruta ingresada es un file', () => {
    expect(isFile(file)).toEqual(true)
  })
})

describe('Comprobar si es un directorio', () => {
  test('Validar si es una función', () => {
    expect(typeof isDirectory).toBe('function');
  });
  test('Validar si la ruta ingresada es un directorio', () => {
    expect(isDirectory(directory)).toEqual(true)
  })
})

describe('Comprobar si es un file con extensión md', () => {
  test('Validar si es una función', () => {
    expect(typeof isMd).toBe('function');
  });
  test('Validar si el file tiene extensión .md', () => {
    expect(isMd(file)).toEqual('.md')
  })
})

describe('Comprobar si lee un directorio', () => {
  test('Validar si es una función', () => {
    expect(typeof readFilePath).toBe('function');
  });
  test('Validar lee el contenido del file/directorio', () => {
    expect(readFilePath(path)).toContain(readFile);
  });
});

describe('Comprobar si la ruta es absoluta', () => {
    test('Validar si es una función', () => {
    expect(typeof isAbsoluteTest).toBe('function');
  });
  test('Si la ruta es relativa la convierte en absoluta ', () => {
    expect(isAbsoluteTest(file)).toEqual(absolutWin);
  });
});

describe('Comprobar si recorre los nombres de los files de un directorio', () => {
  test('Validar si es una función', () => {
  expect(typeof ArrayFileNameDirectories).toBe('function');
});
test('Obtener en un array los files de un directorio ', () => {
  expect(ArrayFileNameDirectories(directory)).toEqual(arrayDirectory);
});
});
