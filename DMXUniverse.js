"use strict"

const UltraDMXMicroDriver = require('./drivers/UltraDMXMicroDriver').UltraDMXMicroDriver;

class DMXUniverse {
  constructor(options) {
    this.options = options || {};

    if(this.options.driver === undefined) {
      this.driver = new UltraDMXMicroDriver();
    }
    else {
      switch(this.options.driver.name) {
        case 'UltraDMXMicro':
        case undefined:
          this.driver = new UltraDMXMicroDriver(this.options.driver);
          break;
        default:
          throw "Unknown driver: "+this.options.driver.name;

      }
    }
    this.driver.update();
  }

  getChannel(channel) {
    return this.driver.getChannel(channel);
  }

  getAllChannels() {
    return this.driver.getAllChannels();
  }

  setChannel(channel, value, drawNow) {
    this.driver.setChannel(channel, value, drawNow);
  }

  setAllChannels(values) {
    this.driver.setAllChannels(values);
  }
}
module.exports.DMXUniverse = DMXUniverse;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
