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

Request your page with querystring params `?debug=true&saveMissing` and open the browser console to see i18nextify in action. It will output all missing translations - start serving them from `/locales/lng/translation.json`.

See the [example](https://github.com/i18next/i18nextify/tree/master/example) for details.


## Initialize with options

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/i18nextify.min.js"></script>
    <script>
      window.i18nextify.init({
        autorun: true, // setting to false init will return an object with start function
        ele: document.body, // pass in another element if you like to translate another html element
        ignoreTags: ['SCRIPT'], // tags to ignore

        // + all options available in i18next
      });
    </script>
  </head>
  ...
```

## Avoid translating an element

```html
<div translated>this won't get translated - nor this elements children</div>
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
