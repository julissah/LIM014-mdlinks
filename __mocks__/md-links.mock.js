const jest = require('jest')

 const linkValidate = jest.fn().mockReturnValue(20);

const index = jest.mock('../src/index', () => {
    return {
        linkValidate
    };
});

export default index;
