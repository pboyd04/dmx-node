"use strict"

const Serial = require('serialport');

const HeaderSize = 5;

class UltraDMXMicroDriver {
  constructor(options) {
    if(typeof options === 'string' || options instanceof String) {
      options = { 'portName': options };
    }

    this.options = options || { 'portName': '/dev/ttyUSB0' };

    this.serial = new Serial(this.options.portName, {
      'baudRate': 250000
    });
    this.buffer = Buffer.alloc(HeaderSize+512+1, 0);
    this.buffer[0] = 0x7E; //Start message
    this.buffer[1] = 0x06; //DMX data
    this.buffer[2] = 0x01; //Size LSB (513 bytes)
    this.buffer[3] = 0x02;
    this.buffer[4] = 0x00;
    this.buffer[HeaderSize+512] = 0xE7; //End of message
  }

  update() {
    this.serial.write(this.buffer);
  }

  getChannel(channel) {
    return this.buffer[HeaderSize+(channel-1)];
  }

  getAllChannels() {
    let ret = [];
    for(let i = 1; i < 513; i++) {
      ret.push(this.getChannel(i));
    }
    return ret;
  }

  setChannel(channel, value, drawNow) {
    this.buffer[HeaderSize+(channel-1)] = value;
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
      this.buffer[HeaderSize+i] = values[i];
    }
    this.update();
  }
}

module.exports.UltraDMXMicroDriver = UltraDMXMicroDriver;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
