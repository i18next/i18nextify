export default class Instrument {
  constructor() {
  }

  start() {
    this.started = new Date().getTime();
  }

  end() {
    this.ended = new Date().getTime();
    return this.ended - this.started;
  }
}
