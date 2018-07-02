"use strict"

const Serial = require('serialport');

class UltraDMXMicroDriver {
  constructor(options) {
    if(typeof options === 'string' || options instanceof String) {
      options = { 'portName': options };
    }

    this.options = options || { 'portName': '/dev/ttyUSB0' };

    this.serial = new Serial(this.options.portName, {
      'baudRate': 250000
    });
    this.buffer = Buffer.alloc(512, 255);
  }

  update() {
    let header = Buffer.from([
      0x7E,
      0x06,
      0x01,
      0x02,
      0x00
    ]);
    let packet = Buffer.concat([
      header,
      this.buffer,
      Buffer.from([0xE7])
    ]);
    this.serial.write(packet);
  }

  getChannel(channel) {
    return this.buffer[channel];
  }

  getAllChannels() {
    return Array.prototype.slice.call(this.buffer, 0);
  }

  setChannel(channel, value, drawNow) {
    this.buffer[channel] = value;
    if(drawNow === true || drawNow === undefined) {
      this.update();
    }
  }

  setAllChannels(values) {
    let max = 512;
    if(values.length < max) {
      max = value.length;
    }
    for(let i = 0; i < max; i++) {
      this.buffer[i] = values[i];
    }
    this.update();
  }
}

module.exports.UltraDMXMicroDriver = UltraDMXMicroDriver;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
