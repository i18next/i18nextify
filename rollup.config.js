import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import { argv } from 'yargs';

const format = argv.format || argv.f || 'iife';
const compress = argv.uglify;

const babelOptions = {
  exclude: 'node_modules/**',
  presets: ['es2015-rollup', 'stage-0'],
  babelrc: false
};

const dest = {
  amd: `dist/amd/i18nextify${compress ? '.min' : ''}.js`,
  umd: `dist/umd/i18nextify${compress ? '.min' : ''}.js`,
  iife: `dist/iife/i18nextify${compress ? '.min' : ''}.js`
}[format];

export default {
  entry: 'src/index.js',
  format,
  plugins: [
    babel(babelOptions),
    nodeResolve({ jsnext: true, main: true }),
    // json({
    //   // All JSON files will be parsed by default,
    //   // but you can also specifically include/exclude files
    //   include: ['node_modules/entities/**', 'node_modules/ent/**'],  // Default: undefined
    //   //exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
    //   preferConst: false, // Default: false
    // }),
    commonjs()
  ].concat(compress ? uglify() : []),
  moduleName: 'i18nextify',
  //moduleId: 'i18nextify',
  dest
};
