"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function observe(node, callback) {
  var observer = new MutationObserver(function (mutations) {
    // For the sake of...observation...let's output the mutation to console to see how this all works
    // mutations.forEach(function(mutation) {
    // 	console.log(mutation.type);
    // });
    callback(mutations);
  });

  // Notify me of everything!
  var observerConfig = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  };

  // Node, config
  // In this case we'll listen to all changes to body and child nodes
  observer.observe(node, observerConfig);

  return observer;
}

function observer(node, callback) {
  var observer = undefined;

  return {
    start: function start() {
      observer = observe(node, callback);
    },
    pause: function pause() {
      if (observer) observer.disconnect();
      observer = undefined;
    }
  };
}

exports["default"] = observer;
module.exports = exports["default"];