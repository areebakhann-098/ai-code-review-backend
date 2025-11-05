import prettier from 'prettier';

export const formatCode = async (code) => {
  return prettier.format(code, {
    parser: 'babel',
    semi: true,
    singleQuote: true,
  });
};
