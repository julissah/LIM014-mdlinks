/* eslint-disable no-undef */
const {
  existsRoute,
  isFile,
  isDirectory,
  isMd,
  readFilePath,
  isAbsoluteTest,
  ArrayFileNameDirectories,
  searchRoutemd,
  namePath,
  validateIsFileMd,
  linkValidate,
  linksStatus
 } = require('../src/index');

describe('Comprobar si la ruta existe', () => {
  test('Validar si es una función', () => {
    expect(typeof existsRoute).toBe('function');
  });

  test('Validar si la ruta existe', () => {
    expect(existsRoute(`${__dirname}/fileTest/test1.md`)).toEqual(true);
  });

});

describe('Comprobar si es un file', () => {
  test('Validar si es una función', () => {
    expect(typeof isFile).toBe('function');
  });
  test('Validar si la ruta ingresada es un file', () => {
    expect(isFile(`${__dirname}/fileTest/test1.md`)).toEqual(true)
  })
})

describe('Comprobar si es un directorio', () => {
  test('Validar si es una función', () => {
    expect(typeof isDirectory).toBe('function');
  });
  test('Validar si la ruta ingresada es un directorio', () => {
    expect(isDirectory(`${__dirname}/fileTest/`)).toEqual(true)
  })
})

describe('Comprobar si es un file con extensión md', () => {
  test('Validar si es una función', () => {
    expect(typeof isMd).toBe('function');
  });
  test('Validar si el file tiene extensión .md', () => {
    expect(isMd(`${__dirname}/fileTest/test1.md`)).toEqual('.md')
  })
})

describe('Comprobar si lee un directorio', () => {
  test('Validar si es una función', () => {
    expect(typeof readFilePath).toBe('function');
  });
  test('Validar lee el contenido del file/directorio', () => {
    const result = [`[github](https://github.com/)`]
    expect(readFilePath(`${__dirname}/fileTest/test1.md`)).toContain(result);
  });
});

describe('Comprobar si la ruta es absoluta', () => {
    test('Validar si es una función', () => {
    expect(typeof isAbsoluteTest).toBe('function');
  });

  test('Si la ruta es absoluta, pero contiene especificadores relativos como // barras dobles o .. puntos, calculara la ruta real ', () => {
      const result = `${__dirname}\\fileTest\\test1.md`
      expect(isAbsoluteTest(`${__dirname}/fileTest/test1.md`)).toEqual(result);
  });
});

describe('Comprobar si recorre los nombres de los files de un directorio', () => {
  test('Validar si es una función', () => {
  expect(typeof ArrayFileNameDirectories).toBe('function');
});
test('Obtener en un array los files de un directorio ', () => {
  const result = [
    `${__dirname}\\fileTest\\fileTest1`,
    `${__dirname}\\fileTest\\hi.html`,
    `${__dirname}\\fileTest\\test1.md`
  ]
  expect(ArrayFileNameDirectories(`${__dirname}/fileTest/`)).toEqual(result);
});
});

describe('Comprobar si lee los documentos con extensión .md de un file o directorio - recursión', () => {
  test('Validar si es una función', () => {
  expect(typeof searchRoutemd).toBe('function');
});
test('Obtener en un array de los files con extensión .md de un directorio ', () => {
  const result = [`${__dirname}/fileTest/test1.md`]
  expect(searchRoutemd(`${__dirname}/fileTest/test1.md`)).toEqual(result);
});

  test('Obtener en un array de los files con extensión .md de un directorio dentro de otro directorio - recursión ', () => {
    const arrayDir = [
    `${__dirname}\\fileTest`,
    `${__dirname}\\fileTest\\fileTest1\\`
    ]
  const result = [`${__dirname}\\fileTest\\fileTest1\\test2.md`]
  expect(searchRoutemd(arrayDir[1])).toEqual(result);
});
});

describe('Comprobar si obtiene el nombre del file', () => {
  test('Validar si es una función', () => {
  expect(typeof namePath).toBe('function');
});
test('Obtener en un array los files de un directorio ', () => {
  expect(namePath('./test/fileTest/test1.md')).toEqual('test\\fileTest\\test1.md');
});
});

describe('Comprobar si el file .md muestra los resultados con la opcion validate false y true ', () => {
  test('Validar si es una función', () => {
  expect(typeof validateIsFileMd).toBe('function');
});

test('Obtener href, pathName, text del file ingresado - __validate false', () => {
  const result = [
    {
      "href": "https://github.com/",
      "pathName": "C:\\Users\\N14\\Documents\\GitHub\\LIM014-mdlinks\\test\\fileTest\\test1.md",
      "text": "github"
    }
  ]
  expect(validateIsFileMd(`${__dirname}/fileTest/test1.md`, false)).toEqual(result);
});
});

describe('Comprobar si obtiene la validación de links', () => {
  test('Validar si es una función', () => {
  expect(typeof linkValidate).toBe('function');
});

});
