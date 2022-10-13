export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function getAttribute(node, attr) {
  return (
    node.properties &&
    node.properties.attributes &&
    node.properties.attributes[attr]
  );
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf("###") > -1 ? key.replace(/###/g, ".") : key;
  }

  function canNotTraverseDeeper() {
    return !object || typeof object === "string";
  }

  const stack = typeof path !== "string" ? [].concat(path) : path.split(".");
  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};

    const key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    object = object[key];
  }

  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift()),
  };
}

export function setPath(object, path, newValue) {
  const { obj, k } = getLastOfPath(object, path, Object);

  obj[k] = newValue;
}

export function pushPath(object, path, newValue, concat) {
  const { obj, k } = getLastOfPath(object, path, Object);

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}

export function getPath(object, path) {
  const { obj, k } = getLastOfPath(object, path);

  if (!obj) return undefined;
  return obj[k];
}

export function getPathname() {
  const path = location.pathname;
  if (path === "/") return "root";

  const parts = path.split("/");
  let ret = "root";

  parts.forEach((p) => {
    if (p) ret += `_${p}`;
  });

  return ret;
}

const lowerCaseTags = ["SVG", "RECT", "PATH"];
export const parseOptions = (options) => {
  if (options.namespace) {
    options.ns.push(options.namespace);
    options.defaultNS = options.namespace;
  } else if (options.namespaceFromPath) {
    const ns = getPathname();
    options.ns.push(ns);
    options.defaultNS = ns;
  }

  if (!options.ns.length) options.ns = ["translation"];

  if (options.ignoreTags) {
    options.ignoreTags = options.ignoreTags.map((s) => {
      if (lowerCaseTags.indexOf(s)) return s.toLowerCase();
      return s.toUpperCase();
    });
  }
  if (options.ignoreCleanIndentFor) {
    options.ignoreCleanIndentFor = options.ignoreCleanIndentFor.map((s) =>
      s.toUpperCase()
    );
  }
  if (options.inlineTags) {
    options.inlineTags = options.inlineTags.map((s) => s.toUpperCase());
  }
  if (options.ignoreInlineOn) {
    options.ignoreInlineOn = options.ignoreInlineOn.map((s) => s.toUpperCase());
  }
  if (options.mergeTags) {
    options.mergeTags = options.mergeTags.map((s) => s.toUpperCase());
  }
  options.translateAttributes = options.translateAttributes.reduce(
    (mem, attr) => {
      const res = { attr };
      if (attr.indexOf("#") > -1) {
        const [a, c] = attr.split("#");
        res.attr = a;
        if (c.indexOf(".") > -1) {
          const [e, b] = c.split(".");
          res.ele = e.toUpperCase();
          res.cond = b.toLowerCase().split("=");
        } else if (c.indexOf("=") > -1) {
          res.cond = c.toLowerCase().split("=");
        } else {
          res.ele = c.toUpperCase();
        }
      }
      mem.push(res);
      return mem;
    },
    []
  );

  return options;
};
