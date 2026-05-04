### 5.0.0

- BREAKING: bumped `i18next-http-backend` to v4. v4 dropped its `cross-fetch` dependency, so i18nextify no longer ships the `cross-fetch` / `node-fetch` fallback in its bundle. Native `fetch` is now required (Node ≥ 18, modern browsers, Deno, Bun — all of which ship it). For runtimes without native `fetch`, supply a ponyfill via `i18next-http-backend`'s new `alternateFetch` option, or stay on i18nextify v4.
- BREAKING: minimum Node version is now 18 (`engines.node = ">=18"`), inherited from the v4 transitive bump.
- BREAKING: dropped the AMD output format (`dist/amd/`). No README references it and no known consumers; the IIFE / UMD-equivalent `i18nextify.js` and `i18nextify.min.js` cover `<script>`-tag use, and `dist/cjs/` and `dist/esm/` cover module consumers via the new `exports` map.
- BREAKING: dropped the runtime `@babel/runtime` dependency (no babel transpilation in v5).
- build: replaced babel + rollup 1 + terser with [`tsdown`](https://tsdown.dev) (rolldown + oxc). One config produces ESM, CJS, and IIFE bundles.
- build: simplified output layout — `dist/{commonjs,es,umd,amd}/` collapsed to `dist/{cjs,esm}/`. The root `i18nextify.js` / `i18nextify.min.js` are emitted directly by tsdown, no `cp` step needed. `package.json#exports` map added.
- build: minified browser bundle: 132 KB → 120 KB (−9%); unminified 273 KB → 226 KB (−17%).
- lint: replaced ESLint 8 + babel-eslint + import / react / jsx-a11y plugins with ESLint 9 + [`neostandard`](https://github.com/neostandard/neostandard) flat config (`eslint.config.mjs`). The React lint stack was unused — the source has no JSX or React.
- test: replaced Jest 24 with [Vitest](https://vitest.dev) (jsdom environment). Manual mocks moved from project-root `__mocks__/` to `test/__mocks__/` (kept adjacent to the tests that use them) and registered explicitly via `test/setup.js` since Vitest does not auto-resolve manual mocks the way Jest does for node_modules. Six spec files migrated; `require()`-based loads converted to top-level imports so `vi.mock` interception applies (Vitest's CJS shim does not).
- chore: declared `"type": "module"` and `"sideEffects": false` for native ESM and bundler tree-shaking.
- chore: relative ESM imports now carry explicit `.js` extensions (Node ESM strict resolution).
- chore: source style — neostandard's no-semi default applied via `eslint --fix`. No functional change.
- chore: dropped 24 dev/runtime dependencies (~all babel + rollup + jest packages, plus `@babel/polyfill`, `mkdirp`, `rimraf`, `yargs`). Net devDeps: ~24 → 7. Vulnerabilities: 47 → 0.
- chore: added `.github/workflows/node.yml` — first CI workflow for this repo. Runs lint + build + test on Node 20 / 22 / 24.

### 4.0.8

Security release — all issues found via an internal audit. See published advisory [GHSA-6457-mxpq-4fqq](https://github.com/i18next/i18nextify/security/advisories/GHSA-6457-mxpq-4fqq).

- security: drop dangerous URL schemes (`javascript:`, `data:`, `vbscript:`, `file:`) when substituted into translated `href` / `src` attribute values. No legitimate translation use case needs these schemes; the previous substitution logic applied them unchanged to the live DOM. Scheme matching is case-insensitive and ignores leading whitespace ([GHSA-6457-mxpq-4fqq](https://github.com/i18next/i18nextify/security/advisories/GHSA-6457-mxpq-4fqq))
- security: new `sanitize(html, ctx)` option — if configured, it is invoked with each translated HTML body before it is parsed into the virtual DOM. Defaults to pass-through because rendering HTML from translations is i18nextify's core purpose; applications whose translation sources are not fully trusted (user-contributed locales, third-party translation CDN, etc.) can wire it to DOMPurify or a similar sanitizer.
- security: fix `debug` / `saveMissing` URL-parameter detection. The previous substring match (`window.location.search.indexOf('debug=true') > -1`) activated these modes for any URL containing the substring — for example `?nosaveMissing=true` silently enabled `saveMissing`, and `?track_debug=true` enabled verbose debug logging. Now uses `URLSearchParams` for an exact parameter match.
- chore: bump pinned `i18next` to 26.0.6 and `i18next-http-backend` to 3.0.5 — both security releases. See their respective CHANGELOG entries and GHSA advisories.
- chore: ignore `.env*` and `*.pem`/`*.key` files in `.gitignore`.

### 4.0.7

- update i18next dependencies

### 4.0.6

- update i18next dependency

### 4.0.5

- update i18next dependencies

### 4.0.4

- update i18next dependency

### 4.0.3

- update i18next dependencies

### 4.0.2

- update i18next dependencies

### 4.0.1

- update i18next dependencies

### 4.0.0

- update i18next dependencies to the current major versions
  - for more information read:
    - https://github.com/i18next/i18next/blob/master/CHANGELOG.md#2400
    - https://github.com/i18next/i18next-http-backend/blob/master/CHANGELOG.md#300
    - https://github.com/i18next/i18next-browser-languageDetector/blob/master/CHANGELOG.md#800

### 3.3.4

- update i18next-http-backend dep (before next major)

### 3.3.3

- added ability to pass supportedLngs, namespace, load and loadPath via script tag

### 3.3.2

- last update of i18next deps before next major

### 3.3.1

- update deps

### 3.3.0

- update deps

### 3.2.3

- support SVG in ignoreTags

### 3.2.1

- use correct keyAttr for title tag

### 3.2.0

- update i18next dependencies
- ability to define fallbacklng in script
- translatable title and description
- set html lng attribute

### 3.1.2

- update i18next dependencies

### 3.1.1

- update i18next dependencies

### 3.1.0

- update i18next dependencies
- fix image sources and links placeholders

### 3.0.5

- update i18next dependencies

### 3.0.4

- update i18next dependencies

### 3.0.3

- update i18next dependencies

### 3.0.2

- update i18next dependency

### 3.0.1

- update i18next dependency

### 3.0.0

- update to major i18next version

### 2.6.0

- update i18next dependencies

### 2.5.11

- update i18next dependencies

### 2.5.10

- update i18next dependencies

### 2.5.9

- update i18next dependency

### 2.5.8

- update i18next dependencies

### 2.5.7

- update dependencies

### 2.5.6

- update not using internals of i18next

### 2.5.5

- update dependencies

### 2.5.4

- do never set key attribute for orginal Value if already translated (avoid sideeffects)

### 2.5.3

- lowercased attribute

### 2.5.2

- use deept on appending name on parent

### 2.5.1

- fixes usedValue/Key for reforced translation

### 2.5.0

- save original content on nodes
- function to enforce a retranslation

### 2.4.0

- introducing key usage `keyAttr: 'i18next-key'`, `ignoreWithoutKey: false`

### 2.3.0

- nothing special - just an update to latest dependencies incl. i18next

### 2.2.0

- nothing special - just an update to latest dependencies incl. i18next

### 2.1.0

- adds onInitialTranslate options to be called on translated initially

### 2.0.2

- update dependencies

### 2.0.1

- update dependencies

### 2.0.0

- change options enabling cleanup as default (cleanIndent, cleanWhitespace)

### 1.5.1

- fixes taking attributes not only properties of node for translation

### 1.5.0

- update i18next dependencies
- allow setting translateAttributes in init options (incl. conditions)

### 1.4.0

- option mergeTags will merge innerhtml of those as content/key

### 1.3.0

- adds ignoreInlineOn to exclude tags from being merged
- merging now also works on root elements
- merging now excludes surrounding element from being passed in key
- setting merge to false on element will now exclude it

### 1.2.1

- only merge if we have a parent - asserts we trigger done on observer

### 1.2.0

- adds cleanups and merge feature (currently enabling needs setting init options)

### 1.1.4

- fixes fragment replacement in safari (some how that comes unencoded)

### 1.1.3

- avoid retranslating virtual text nodes inside a node

### 1.1.2

- allow ignoreTags to be caseinsensitive
- ignoreTags in translations

### 1.1.1

- fix ignore classes if being not the only class on element

### 1.1.0

- enables translation of alt attributes
- enables fragment replacement in src and href
