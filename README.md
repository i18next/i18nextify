# i18nextify

Just drop this [script](https://github.com/i18next/i18nextify/blob/master/i18nextify.min.js) on your page and you're ready to deliver your pages in any language.

See the [sample](https://i18next.github.io/i18nextify) ([code](https://github.com/i18next/i18nextify/tree/gh-pages))!

_i18nextify_ uses Virtual DOM to update your page with translations based on the current content. `MutationObserver` is used to trigger translations on newly added content.

_i18nextify_ comes bundled with [i18next](https://i18next.com).

Should play well with any static or dynamic page not using its own Virtual DOM.

# Getting started

The easiest way for guaranteed success is using [locizify](https://www.npmjs.com/package/locizify) on [locize.com](https://locize.com).

Alternatively:

Drop this [script](https://github.com/i18next/i18nextify/blob/master/i18nextify.min.js) on your page.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/i18nextify.min.js"></script>
  </head>
  ...
</html>
```

Request your page with querystring params `?debug=true&saveMissing` and open the browser console to see _i18nextify_ in action. It will output all missing translations - start serving them from `/locales/{{lng}}/translation.json`.

See the [example](https://github.com/i18next/i18nextify/tree/master/example) for details.

## Initialize with options

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/i18nextify.min.js"></script>
    <script>
      window.i18nextify.init({
        // defaults that are set
        autorun: true, // setting to false init will return an object with start function
        ele: document.body, // pass in another element if you like to translate another html element
        ignoreTags: ['SCRIPT'], // tags to ignore

        // using keys instead of content as keys
        keyAttr: 'i18next-key', // node attribute to use as key
        ignoreWithoutKey: false, // set to true to only support nodes having a key

        // per default not set
        ignoreIds: ['ignoreMeId'],
        ignoreClasses: ['ignoreMeClass'],

        // attributes to translate
        translateAttributes: ['placeholder', 'title', 'alt', 'value#input.type=button', 'value#input.type=submit'],

        // merging content (eg. a tags in p tags)
        mergeTags: [], // tags to merge innerHtml to one key
        inlineTags: [], // tags to inline (eg. a, span, abbr, ...)
        ignoreInlineOn: [], // tags to ignore inlining tags under inlineTags

        // cleanup for keys
        cleanIndent: true, // removes indent, eg. if a p tag spans multiple lines
        ignoreCleanIndentFor: ['PRE', 'CODE'], // ignores cleaning up of indent for those tags needing that extra spaceing
        cleanWhitespace: true, // removes surrounding whitespace from key

        namespace: false, // set a filename - default namespace will be translation
        namespaceFromPath: false // set true will use namepace based on window.location.pathname
        ns: ['common'] // -> only set if accessing more then one namepace

        // + all options available in i18next
      });
    </script>
  </head>
  ...
</html>
```

## Merge content / using html in translations

Just set translated attribute:

```html
<p merge>
  all inside will be used as on segment, even if having other
  <a>elements inside</a>
</p>

// key = all inside will be used as on segment, even if having other
<a>elements inside</a>
```

Same could be done using options:

```js
mergeTags: [], // tags to merge innerHtml to one key
inlineTags: [], // tags to inline (eg. a, span, abbr, ...)
ignoreInlineOn: [], // tags to ignore inlining tags under inlineTags
```

## Fragment replacement for links and images

```html
<img src="/images/{{a.png}}" alt="big A" />
```

You will find `a.png` to be a key in your translation files - it's value can be replaced to eg. `a-de.png` for German (all other languages will fallback to `a.png`)

```html
<a href="/{{statistic}}">Open my statistics</a>
```

`statistic` will be a regular key that can be translated. But be aware you will need to provide that routes - eg. using [localized routes on the server](https://github.com/i18next/i18next-express-middleware#add-localized-routes)

## Avoid translating

#### an element

Just set translated attribute:

```html
<div translated>this won't get translated - nor this elements children</div>
```

#### By ignoring tag, class, id

Just add needed items to the specific array:

```js
window.i18nextify.init({
  ignoreTags: ['SCRIPT'], // need to be uppercased
  ignoreIds: ['ignoreMeId'],
  ignoreClasses: ['ignoreMeClass']
});
```

```html
<script>
  // this won't get translated - nor this elements children
</script>
<div id="ignoreMeId">
  this won't get translated - nor this elements children
</div>
<div class="ignoreMeClass">
  this won't get translated - nor this elements children
</div>
```

Just add `translated`-attribute

## Translating an element with options

For [extended translations](https://www.i18next.com/translation-function) like plurals, interpolation, ... you need to add options to the element

```html
<div i18next-options='{"foo": "bar"}'>
  foo {{bar}}
  <p i18next-options='{"foo2": "bar2"}'>foo {{foo}}; foo2 {{foo2}}</p>
</div>
```

## Translating JavaScript code

You can use the [i18next](https://i18next.com) instance used to provide the translation functionality directly. Just make sure the instance is initialized already:

```js
<script>
  // use t function of i18next
  // https://www.i18next.com/translation-function/essentials
  function useI18next() {
    var translated = i18nextify.i18next.t('some key');
  }

  if (i18nextify.i18next.isInitialized) {
    useI18next();
  } else {
    i18nextify.i18next.on('initialized', function(options) {
      useI18next();
    })
  }
</script>
```

Options get inherited from parent to child nodes.

## Set different namespaces

Default would be translation.

#### Set a different one:

```js
window.i18nextify.init({
  namespace: 'myNamespace'
});
```

#### autogenerate one per route:

```js
window.i18nextify.init({
  namespaceFromPath: true
});
```

## Access different namespaces

This is useful for reused elements that are on every page, eg. like footer,... and you're using namespaceFromPath. So you can avoid having that segments on every routes namespace file.

```js
window.i18nextify.init({
  namespace: 'translation', // -> set the default namespace
  ns: ['common'] // -> add additional namespaces to load
});
```

```html
<div i18next-options='{"ns": "common"}'>
  <p>different namespace: i18next-options='{"ns": "common"}'</p>
  <p>
    set it on i18next options and assert to add it to
    <strong>i18next.options.ns array on init</strong>
  </p>
</div>
```

## Avoid flickering on initial load

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/i18nextify.min.js"></script>
  </head>
  <body style="display: none">
    ...
  </body>
</html>
```

Just set the element style display to none. _i18nextify_ will change it to block when ready.

## Change File to use

You can change the namespace after loading to some other file (eg. before transitioning to another page).

```js
window.i18nextify.changeNamespace('newNamespace');
```

## force a retranslation:

```js
window.i18nextify.forceRerender();
```


---

<h3 align="center">Gold Sponsors</h3>

<p align="center">
  <a href="https://locize.com/" target="_blank">
    <img src="https://raw.githubusercontent.com/i18next/i18next/master/assets/locize_sponsor_240.gif" width="240px">
  </a>
</p>