import { defineConfig } from 'tsdown'

const srcEntry = { index: 'src/index.js' }

export default defineConfig([
  // ── ESM build (consumed via `import` / `./esm` subpath) ──
  // Dependencies stay external — npm consumers install them themselves.
  {
    entry: srcEntry,
    format: ['esm'],
    outDir: 'dist/esm',
    outExtensions: () => ({ js: '.js' }),
    dts: false,
    sourcemap: false,
    clean: true,
  },
  // ── CJS build (consumed via `require` / `./cjs` subpath) ──
  {
    entry: srcEntry,
    format: ['cjs'],
    outDir: 'dist/cjs',
    outExtensions: () => ({ js: '.js' }),
    dts: false,
    sourcemap: false,
    clean: true,
  },
  // ── IIFE bundle for direct <script> use (unminified + minified) ──
  // Inlines every dependency so the script tag is a self-contained drop-in.
  // The default IIFE filename template is `[name].iife.js`; override to keep
  // the legacy `i18nextify.js` / `i18nextify.min.js` names that CDNs and
  // consumers already link to.
  {
    entry: { i18nextify: 'src/index.js' },
    format: ['iife'],
    globalName: 'i18nextify',
    outDir: '.',
    outputOptions: { entryFileNames: '[name].js' },
    target: 'es2020',
    deps: { alwaysBundle: [/.*/] },
    define: { 'process.env.NODE_ENV': '"development"' },
    dts: false,
    sourcemap: false,
    clean: false,
  },
  {
    entry: { 'i18nextify.min': 'src/index.js' },
    format: ['iife'],
    globalName: 'i18nextify',
    outDir: '.',
    outputOptions: { entryFileNames: '[name].js' },
    target: 'es2020',
    deps: { alwaysBundle: [/.*/] },
    define: { 'process.env.NODE_ENV': '"production"' },
    minify: true,
    dts: false,
    sourcemap: false,
    clean: false,
  },
])
