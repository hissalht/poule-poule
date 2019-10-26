const PACKAGE_NAME = 'poule-poule-lib';
const OUPUT_FOLDER = 'dist';
module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: `${OUPUT_FOLDER}/${PACKAGE_NAME}.cjs.js`,
      format: 'cjs'
    },
    {
      file: `${OUPUT_FOLDER}/${PACKAGE_NAME}.esm.js`,
      format: 'esm'
    }
  ]
};
