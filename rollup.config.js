import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { argv } from 'yargs';

const format = argv.format || argv.f || 'iife';
const compress = argv.uglify;

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      }
    ],
    '@babel/react'
  ],
  babelrc: false
};

const file = {
  amd: `dist/amd/i18nextify${compress ? '.min' : ''}.js`,
  umd: `dist/umd/i18nextify${compress ? '.min' : ''}.js`,
  iife: `dist/iife/i18nextify${compress ? '.min' : ''}.js`
}[format];

export default {
  input: 'src/index.js',
  plugins: [
    babel(babelOptions),
    replace({
      'process.env.NODE_ENV': JSON.stringify(compress ? 'production' : 'development')
    }),
    nodeResolve({ jsnext: true, main: true }),
    commonjs({})
  ].concat(compress ? terser() : []),
  // external: ['react', 'react-dom'],
  // moduleId: 'react-i18next',
  output: {
    name: 'i18nextify',
    format,
    file
  }
};
