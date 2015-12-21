"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Instrument = (function () {
  function Instrument() {
    _classCallCheck(this, Instrument);
  }

  _createClass(Instrument, [{
    key: "start",
    value: function start() {
      this.started = new Date().getTime();
    }
  }, {
    key: "end",
    value: function end() {
      this.ended = new Date().getTime();
      return this.ended - this.started;
    }
  }]);

  return Instrument;
})();

exports["default"] = Instrument;
module.exports = exports["default"];