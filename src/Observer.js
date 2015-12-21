import EventEmitter from 'i18next/lib/EventEmitter';

export default class Observer extends EventEmitter {

  constructor(ele, options = {}) {
    super();
    this.ele = ele;
    this.options = options;
    this.observer = this.create();
    this.internalChange = true;
  }

  create() {
    let lastToggleTimeout;
    let toggleInternal = () => {
      if (lastToggleTimeout) window.clearTimeout(lastToggleTimeout);

      lastToggleTimeout = setTimeout(() => {
        if (this.internalChange) this.internalChange = false;
      }, 200);
    }

    const observer = new MutationObserver((mutations) => {
    	// For the sake of...observation...let's output the mutation to console to see how this all works
    	// mutations.forEach(function(mutation) {
    	// 	console.log(mutation.type);
    	// });
      if (this.internalChange) toggleInternal();
      if (!this.internalChange) this.emit('changed', mutations);
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
    observer.observe(this.ele, observerConfig);

    return observer;
  }

  reset() {
    this.internalChange = true;
  }
}

export default Observer;
