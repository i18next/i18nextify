# i18nextify

Just drop the [script](https://github.com/i18next/i18nextify/blob/master/i18nextify.min.js) on your page and your ready to deliver your pages in any language.

See the [sample](http://i18next.github.io/i18nextify) ([code](https://github.com/i18next/i18nextify/tree/gh-pages))!!

i18nextify uses virtual-dom to update your page with translations based on the current content. MutationObserver is used to trigger translations on newly added content.

i18nextify comes bundled with [i18next](http://i18next.com/).

Should play well with any static or dynamic page not using a own virtual-dom.

# Getting started

Drop the [script](https://github.com/i18next/i18nextify/blob/master/i18nextify.min.js) on your page.


```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/i18nextify.min.js"></script>
  </head>
  ...
```

Request your page with querystring params `?debug=true&saveMissing` and open the browser console to see i18nextify in action. It will output all missing translations - start serving them from `/locales/{{lng}}/translation.json`.

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

        // per default not set
        ignoreIds: ['ignoreMeId'],
        ignoreClasses: ['ignoreMeClass'],

        namespace: false, // set a filename - default namespace will be translation
        namespaceFromPath: false // set true will use namepace based on window.location.pathname
        ns: ['common'] // -> only set if accessing more then one namepace

        // + all options available in i18next
      });
    </script>
  </head>
  ...
```

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
  ignoreClasses: ['ignoreMeClass'],
});
```

```html
<SCRIPT>this won't get translated - nor this elements children</SCRIPT>
<div id="ignoreMeId">this won't get translated - nor this elements children</div>
<div class="ignoreMeClass">this won't get translated - nor this elements children</div>
```

Just add `translated`-attribute

## Translating an element with options

For [extended translations](http://i18next.com/translate/) like plurals, interpolation, ... you need to add options to the element

```html
<div i18next-options='{"foo": "bar"}'>
  foo {{bar}}
  <p i18next-options='{"foo2": "bar2"}'>foo {{foo}}; foo2 {{foo2}}</p>
</div>
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
  <p>set it on i18next options and assert to add it to <strong>i18next.options.ns array on init</strong></p>
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
```

Just set the element style display to none. I18nextify will change it to block when ready.

## Change File to use

You can change the namespace after loading to some other file (eg. before transitioning to another page).

```js
window.i18nextify.changeNamespace('newNamespace');
```
