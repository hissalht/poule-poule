import run from 'rollup-plugin-run'
import commonjs from 'rollup-plugin-commonjs';

const PACKAGE_NAME = 'index'
const OUPUT_FOLDER = 'dist'

const watch = process.env.ROLLUP_WATCH === 'true'

module.exports = {
  input: 'src/bin/www.js',
  output: {
    file: `${OUPUT_FOLDER}/${PACKAGE_NAME}.js`,
    format: 'cjs'
  },
  plugins: [
    commonjs({
      include: 'generated/**'
    }),
    watch && run()
  ]
}
