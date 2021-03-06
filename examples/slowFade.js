"use strict"

const DMX = require('../DMXUniverse').DMXUniverse;

let options = {};
options.driver = {};
options.driver.name = process.argv[2];
options.driver.portName = process.argv[3];

let universe = new DMX(options);
let current = universe.getAllChannels();
for(let i = 0; i < current.length; i++) {
  current[i] = 255;
}
universe.setAllChannels(current);

var myTimer = setInterval(dim, 100);

function dim() {
  for(let i = 0; i < current.length; i++) {
    current[i] = --current[i];
  }
  universe.setAllChannels(current);
  if(current[0] == 0) {
    clearInterval(myTimer);
  }
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
