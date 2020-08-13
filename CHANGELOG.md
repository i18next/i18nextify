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
