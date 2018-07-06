"use strict"

const DMX = require('../DMXUniverse').DMXUniverse;

let options = {};
options.driver = {};
options.driver.name = process.argv[2];
options.driver.portName = process.argv[3];

let universe = new DMX(options);
let current = universe.getAllChannels();
for(let i = 0; i < current.length; i++) {
  current[i] = 0;
}
universe.setAllChannels(current);
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
